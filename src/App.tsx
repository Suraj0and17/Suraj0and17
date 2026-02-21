import React, { useState, useEffect } from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, MessageCircle, Menu, X, Globe, ShoppingCart, MapPin, CheckCircle2, ChevronRight, Award } from 'lucide-react';
import './i18n';
import { PRODUCTS, CUSTOMER_CARE, COMPANIES } from './constants';
import { Product, Order, Testimonial } from './types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Components
const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  return (
    <div className="flex items-center gap-2">
      <Globe className="w-4 h-4 text-green-700" />
      <select
        value={i18n.language}
        onChange={(e) => i18n.changeLanguage(e.target.value)}
        className="bg-transparent text-sm font-medium text-green-900 border-none focus:ring-0 cursor-pointer"
      >
        <option value="en">English</option>
        <option value="hi">हिन्दी</option>
        <option value="mr">मराठी</option>
      </select>
    </div>
  );
};

const Header = () => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-green-100 shadow-sm">
      <div className="bg-green-700 text-white py-2 px-4 text-center text-sm font-medium flex justify-center items-center gap-4">
        <span className="flex items-center gap-1">
          <Phone className="w-4 h-4" /> {t('customer_care')}: {CUSTOMER_CARE}
        </span>
        <a href={`tel:${CUSTOMER_CARE}`} className="bg-white text-green-700 px-3 py-0.5 rounded-full text-xs font-bold hover:bg-green-50 transition-colors">
          {t('call_now')}
        </a>
      </div>
      <nav className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex flex-col">
          <span className="text-xl font-black text-green-800 tracking-tight leading-none">KISAN AGROMART</span>
          <span className="text-[10px] text-green-600 font-bold uppercase tracking-widest">KisanAgromart.com</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm font-semibold text-gray-700 hover:text-green-700">{t('home')}</Link>
          <Link to="/products" className="text-sm font-semibold text-gray-700 hover:text-green-700">{t('products')}</Link>
          <Link to="/price-list" className="text-sm font-semibold text-gray-700 hover:text-green-700">{t('price_list')}</Link>
          <Link to="/about" className="text-sm font-semibold text-gray-700 hover:text-green-700">{t('about')}</Link>
          <Link to="/contact" className="text-sm font-semibold text-gray-700 hover:text-green-700">{t('contact')}</Link>
        </div>

        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2">
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white border-b border-green-100 md:hidden flex flex-col p-4 gap-4"
          >
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="font-bold text-green-800">{t('home')}</Link>
            <Link to="/products" onClick={() => setIsMenuOpen(false)} className="font-bold text-green-800">{t('products')}</Link>
            <Link to="/price-list" onClick={() => setIsMenuOpen(false)} className="font-bold text-green-800">{t('price_list')}</Link>
            <Link to="/about" onClick={() => setIsMenuOpen(false)} className="font-bold text-green-800">{t('about')}</Link>
            <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="font-bold text-green-800">{t('contact')}</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-stone-900 text-stone-300 py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <h3 className="text-white text-xl font-bold mb-4">Kisan Agromart</h3>
          <p className="text-sm leading-relaxed mb-6 max-w-md">
            {t('hero_subtitle')}
          </p>
          <div className="flex gap-4">
            <a href={`tel:${CUSTOMER_CARE}`} className="bg-green-700 p-3 rounded-full hover:bg-green-600 transition-colors">
              <Phone className="w-5 h-5 text-white" />
            </a>
            <a href={`https://wa.me/${CUSTOMER_CARE}`} className="bg-green-600 p-3 rounded-full hover:bg-green-500 transition-colors">
              <MessageCircle className="w-5 h-5 text-white" />
            </a>
          </div>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4">{t('products')}</h4>
          <ul className="space-y-2 text-sm">
            <li>DAP (18-46-0)</li>
            <li>NPK (10:26:26)</li>
            <li>NPK (12:32:16)</li>
            <li>Urea (46% Nitrogen)</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4">{t('contact')}</h4>
          <p className="text-sm mb-2">{t('customer_care')}: {CUSTOMER_CARE}</p>
          <p className="text-sm">Email: help@kisanagromart.com</p>
          <p className="text-sm mt-4">www.KisanAgromart.com</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-stone-800 text-center text-xs">
        <p className="mb-4">{t('footer_disclaimer')}</p>
        <p>© {new Date().getFullYear()} Kisan Agromart. All rights reserved.</p>
      </div>
    </footer>
  );
};

const ProductCard = ({ product, onBuy }: { product: Product, onBuy: (p: Product) => void, key?: string }) => {
  const { t } = useTranslation();
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-md transition-all"
    >
      <div className="relative aspect-[3/4] bg-stone-100">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full flex items-center gap-1">
          <Award className="w-3 h-3 text-green-700" />
          <span className="text-[10px] font-bold text-green-800 uppercase tracking-wider">{product.company}</span>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <CheckCircle2 className="w-4 h-4 text-green-600" />
          <span className="text-[10px] font-bold text-green-600 uppercase tracking-widest">{t('genuine_badge')}</span>
        </div>
        <h3 className="text-xl font-bold text-stone-900 mb-1">{product.name}</h3>
        <p className="text-sm text-stone-500 mb-4">{product.composition} | {t('bag_size')}</p>
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-[10px] text-stone-400 uppercase font-bold tracking-wider">{t('mrp_fixed')}</p>
            <p className="text-2xl font-black text-green-800">₹{product.mrp}</p>
          </div>
        </div>
        <button
          onClick={() => onBuy(product)}
          className="w-full bg-green-700 text-white py-3 rounded-xl font-bold hover:bg-green-800 transition-colors flex items-center justify-center gap-2"
        >
          <ShoppingCart className="w-4 h-4" /> {t('buy_now')}
        </button>
      </div>
    </motion.div>
  );
};

const OrderModal = ({ product, onClose }: { product: Product, onClose: () => void }) => {
  const { t, i18n } = useTranslation();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    farmerName: '',
    mobile: '',
    quantity: 1,
    paymentMode: 'offline' as 'online' | 'offline',
    location: {
      state: 'Maharashtra',
      district: '',
      taluka: '',
      village: '',
      pincode: ''
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const order: Order = {
      ...formData,
      productName: product.name,
      company: product.company,
      totalAmount: product.mrp * formData.quantity
    };

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order)
      });
      const data = await res.json();
      if (data.success) {
        setStep(3);
      }
    } catch (err) {
      alert('Error placing order. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl"
      >
        <div className="bg-green-700 p-6 text-white flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">{t('order_now')}</h2>
            <p className="text-sm opacity-80">{product.name} - {product.company}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full"><X /></button>
        </div>

        <div className="p-8">
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">{t('farmer_name')}</label>
                <input
                  type="text"
                  required
                  value={formData.farmerName}
                  onChange={e => setFormData({ ...formData, farmerName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  placeholder="e.g. Sanjay Patil"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">{t('mobile')}</label>
                <input
                  type="tel"
                  required
                  value={formData.mobile}
                  onChange={e => setFormData({ ...formData, mobile: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  placeholder="9373742281"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">{t('quantity')}</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.quantity}
                    onChange={e => setFormData({ ...formData, quantity: parseInt(e.target.value) || 1 })}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">{t('total_amount')}</label>
                  <div className="h-[50px] flex items-center px-4 font-black text-green-800 text-xl">
                    ₹{product.mrp * formData.quantity}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setStep(2)}
                disabled={!formData.farmerName || !formData.mobile}
                className="w-full bg-green-700 text-white py-4 rounded-2xl font-bold hover:bg-green-800 transition-colors disabled:opacity-50"
              >
                {t('select_location')}
              </button>
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">{t('state')}</label>
                  <input
                    type="text"
                    required
                    value={formData.location.state}
                    onChange={e => setFormData({ ...formData, location: { ...formData.location, state: e.target.value } })}
                    className="w-full px-4 py-2 rounded-lg border border-stone-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">{t('district')}</label>
                  <input
                    type="text"
                    required
                    value={formData.location.district}
                    onChange={e => setFormData({ ...formData, location: { ...formData.location, district: e.target.value } })}
                    className="w-full px-4 py-2 rounded-lg border border-stone-200"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">{t('taluka')}</label>
                  <input
                    type="text"
                    required
                    value={formData.location.taluka}
                    onChange={e => setFormData({ ...formData, location: { ...formData.location, taluka: e.target.value } })}
                    className="w-full px-4 py-2 rounded-lg border border-stone-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">{t('village')}</label>
                  <input
                    type="text"
                    required
                    value={formData.location.village}
                    onChange={e => setFormData({ ...formData, location: { ...formData.location, village: e.target.value } })}
                    className="w-full px-4 py-2 rounded-lg border border-stone-200"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">{t('pincode')}</label>
                <input
                  type="text"
                  required
                  value={formData.location.pincode}
                  onChange={e => setFormData({ ...formData, location: { ...formData.location, pincode: e.target.value } })}
                  className="w-full px-4 py-2 rounded-lg border border-stone-200"
                />
              </div>

              <div className="pt-4">
                <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">{t('payment_method')}</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMode: 'offline' })}
                    className={cn(
                      "p-4 rounded-xl border-2 transition-all text-sm font-bold",
                      formData.paymentMode === 'offline' ? "border-green-600 bg-green-50 text-green-800" : "border-stone-100 text-stone-500"
                    )}
                  >
                    {t('offline_payment')}
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMode: 'online' })}
                    className={cn(
                      "p-4 rounded-xl border-2 transition-all text-sm font-bold",
                      formData.paymentMode === 'online' ? "border-green-600 bg-green-50 text-green-800" : "border-stone-100 text-stone-500"
                    )}
                  >
                    {t('online_payment')}
                  </button>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setStep(1)} className="px-6 py-4 rounded-2xl font-bold text-stone-500 hover:bg-stone-50">Back</button>
                <button type="submit" className="flex-1 bg-green-700 text-white py-4 rounded-2xl font-bold hover:bg-green-800 transition-colors">
                  {t('confirm_order')}
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold text-stone-900 mb-2">Order Placed!</h2>
              <p className="text-stone-500 mb-8">Our team will contact you shortly on {formData.mobile}.</p>
              {formData.paymentMode === 'online' && (
                <div className="bg-stone-50 p-6 rounded-2xl mb-8">
                  <p className="text-sm font-bold text-stone-600 mb-4 uppercase tracking-widest">Pay via UPI to 9373742281</p>
                  <div className="aspect-square w-48 bg-white mx-auto border-4 border-white shadow-sm flex items-center justify-center">
                    <span className="text-xs text-stone-400">QR Code Placeholder</span>
                  </div>
                </div>
              )}
              <button onClick={onClose} className="w-full bg-stone-900 text-white py-4 rounded-2xl font-bold">Close</button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

// Pages
const HomePage = ({ onBuy }: { onBuy: (p: Product) => void }) => {
  const { t, i18n } = useTranslation();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    fetch('/api/testimonials').then(r => r.json()).then(setTestimonials);
  }, []);

  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center overflow-hidden bg-stone-900">
        <div className="absolute inset-0 opacity-40">
          <img src="https://picsum.photos/seed/farm/1920/1080" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-stone-900 via-stone-900/80 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 w-full">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 bg-green-600/20 backdrop-blur border border-green-500/30 px-4 py-2 rounded-full mb-8">
              <Award className="w-4 h-4 text-green-400" />
              <span className="text-xs font-bold text-green-400 uppercase tracking-widest">{t('genuine_badge')}</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-[1.1]">
              {t('hero_title')}
            </h1>
            <p className="text-xl text-stone-300 mb-10 leading-relaxed">
              {t('hero_subtitle')}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/products" className="bg-green-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-green-500 transition-all flex items-center gap-2">
                {t('buy_now')} <ChevronRight className="w-5 h-5" />
              </Link>
              <a href={`tel:${CUSTOMER_CARE}`} className="bg-white/10 backdrop-blur border border-white/20 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all">
                {t('call_now')}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-3xl font-black text-stone-900 mb-2 uppercase tracking-tight">{t('products')}</h2>
            <p className="text-stone-500 font-medium">{t('tagline')}</p>
          </div>
          <Link to="/products" className="text-green-700 font-bold flex items-center gap-1 hover:gap-2 transition-all">
            View All Products <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PRODUCTS.map(p => <ProductCard key={p.id} product={p} onBuy={onBuy} />)}
        </div>
      </section>

      {/* Companies */}
      <section className="bg-stone-50 py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-stone-900 mb-16 uppercase tracking-tight">Our Trusted Partners</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {COMPANIES.map(c => (
              <div key={c} className="bg-white p-12 rounded-3xl border border-stone-200 flex flex-col items-center shadow-sm">
                <div className="w-24 h-24 bg-stone-100 rounded-full mb-6 flex items-center justify-center">
                  <Award className="w-10 h-10 text-green-700" />
                </div>
                <h3 className="text-2xl font-black text-stone-900 mb-2">{c}</h3>
                <p className="text-sm text-stone-500 font-bold uppercase tracking-widest">{t('genuine_badge')}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black text-stone-900 mb-4 uppercase tracking-tight">{t('testimonials')}</h2>
          <div className="w-24 h-1 bg-green-600 mx-auto rounded-full" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map(t_item => (
            <div key={t_item.id} className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm relative">
              <div className="absolute top-8 right-8 text-stone-100">
                <MessageCircle className="w-12 h-12" />
              </div>
              <p className="text-lg italic text-stone-700 mb-6 leading-relaxed">
                "{i18n.language === 'mr' ? t_item.content_mr : i18n.language === 'hi' ? t_item.content_hi : t_item.content_en}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold">
                  {t_item.name[0]}
                </div>
                <div>
                  <p className="font-bold text-stone-900">{t_item.name}</p>
                  <p className="text-xs text-stone-500 font-bold uppercase tracking-widest">{t_item.district}, {t_item.state}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const ProductsPage = ({ onBuy }: { onBuy: (p: Product) => void }) => {
  const { t } = useTranslation();
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-black text-stone-900 mb-12 uppercase tracking-tight">{t('products')}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PRODUCTS.map(p => <ProductCard key={p.id} product={p} onBuy={onBuy} />)}
      </div>
    </div>
  );
};

const PriceListPage = () => {
  const { t } = useTranslation();
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-black text-stone-900 mb-12 uppercase tracking-tight text-center">{t('price_list')}</h1>
      <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead className="bg-stone-50 border-b border-stone-200">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-stone-500 uppercase tracking-widest">Fertilizer</th>
              <th className="px-6 py-4 text-xs font-bold text-stone-500 uppercase tracking-widest">Composition</th>
              <th className="px-6 py-4 text-xs font-bold text-stone-500 uppercase tracking-widest">MRP (50 KG)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {PRODUCTS.map(p => (
              <tr key={p.id} className="hover:bg-stone-50 transition-colors">
                <td className="px-6 py-6">
                  <p className="font-bold text-stone-900">{p.name}</p>
                  <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">{p.company}</p>
                </td>
                <td className="px-6 py-6 text-stone-600 font-medium">{p.composition}</td>
                <td className="px-6 py-6 font-black text-green-800 text-lg">₹{p.mrp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-8 text-center text-sm text-stone-400 font-medium italic">
        {t('footer_disclaimer')}
      </p>
    </div>
  );
};

const ContactPage = () => {
  const { t } = useTranslation();
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-16">
      <div>
        <h1 className="text-4xl font-black text-stone-900 mb-8 uppercase tracking-tight">{t('contact')} Us</h1>
        <p className="text-lg text-stone-600 mb-12 leading-relaxed">
          Have questions about our products or need help with your order? Our team is here to support you in English, Hindi, and Marathi.
        </p>
        <div className="space-y-8">
          <div className="flex items-start gap-4">
            <div className="bg-green-100 p-4 rounded-2xl text-green-700">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-1">{t('customer_care')}</p>
              <p className="text-xl font-black text-stone-900">{CUSTOMER_CARE}</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="bg-green-100 p-4 rounded-2xl text-green-700">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-1">WhatsApp</p>
              <p className="text-xl font-black text-stone-900">{CUSTOMER_CARE}</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="bg-green-100 p-4 rounded-2xl text-green-700">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-1">Location</p>
              <p className="text-xl font-black text-stone-900">Serving Farmers Across India</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white p-10 rounded-[40px] border border-stone-200 shadow-sm">
        <h3 className="text-2xl font-black text-stone-900 mb-8">Send an Enquiry</h3>
        <form className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Name</label>
              <input type="text" className="w-full px-4 py-3 rounded-xl border border-stone-200 outline-none focus:ring-2 focus:ring-green-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Mobile</label>
              <input type="tel" className="w-full px-4 py-3 rounded-xl border border-stone-200 outline-none focus:ring-2 focus:ring-green-500" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Message</label>
            <textarea rows={4} className="w-full px-4 py-3 rounded-xl border border-stone-200 outline-none focus:ring-2 focus:ring-green-500"></textarea>
          </div>
          <button className="w-full bg-green-700 text-white py-4 rounded-2xl font-bold hover:bg-green-800 transition-colors">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export default function App() {
  const { t } = useTranslation();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-white font-sans selection:bg-green-100 selection:text-green-900">
          <Helmet>
            <title>Kisan Agromart – Buy Fertilizers Direct from Company</title>
            <meta name="description" content="KisanAgromart.com - Buy genuine fertilizers like IFFCO DAP, KRIBHCO NPK, and RCF Urea directly from company at fixed MRP. Serving farmers across India with multi-language support." />
            <meta name="keywords" content="Kisan Agromart, KisanAgromart.com, Fertilizer MRP price, IFFCO fertilizer, KRIBHCO fertilizer, RCF fertilizer, buy fertilizer online India" />
            <script type="application/ld+json">
              {JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "Kisan Agromart",
                "url": "https://www.kisanagromart.com",
                "logo": "https://www.kisanagromart.com/logo.png",
                "contactPoint": {
                  "@type": "ContactPoint",
                  "telephone": "+91-9373742281",
                  "contactType": "customer service"
                }
              })}
            </script>
          </Helmet>

          <Header />

          <main>
            <Routes>
              <Route path="/" element={<HomePage onBuy={setSelectedProduct} />} />
              <Route path="/products" element={<ProductsPage onBuy={setSelectedProduct} />} />
              <Route path="/price-list" element={<PriceListPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/about" element={<div className="max-w-3xl mx-auto px-4 py-24 text-center"><h1 className="text-4xl font-black mb-8">About Kisan Agromart</h1><p className="text-lg text-stone-600 leading-relaxed">Kisan Agromart is dedicated to providing farmers with 100% genuine fertilizers directly from top companies like IFFCO, KRIBHCO, and RCF. We ensure fixed MRP prices and reliable delivery to empower the backbone of our nation.</p></div>} />
            </Routes>
          </main>

          <Footer />

          {/* Sticky Mobile Actions */}
          <div className="md:hidden fixed bottom-6 left-4 right-4 z-40 flex gap-3">
            <a href={`tel:${CUSTOMER_CARE}`} className="flex-1 bg-green-700 text-white py-4 rounded-2xl font-bold shadow-xl flex items-center justify-center gap-2">
              <Phone className="w-5 h-5" /> {t('call_now')}
            </a>
            <a href={`https://wa.me/${CUSTOMER_CARE}`} className="flex-1 bg-green-600 text-white py-4 rounded-2xl font-bold shadow-xl flex items-center justify-center gap-2">
              <MessageCircle className="w-5 h-5" /> {t('whatsapp')}
            </a>
          </div>

          <AnimatePresence>
            {selectedProduct && (
              <OrderModal
                product={selectedProduct}
                onClose={() => setSelectedProduct(null)}
              />
            )}
          </AnimatePresence>
        </div>
      </Router>
    </HelmetProvider>
  );
}
