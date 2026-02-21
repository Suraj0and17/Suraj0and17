export interface Product {
  id: string;
  name: string;
  company: string;
  composition: string;
  mrp: number;
  image: string;
  color: string;
}

export interface Order {
  farmerName: string;
  mobile: string;
  productName: string;
  company: string;
  quantity: number;
  totalAmount: number;
  paymentMode: 'online' | 'offline';
  location: {
    state: string;
    district: string;
    taluka: string;
    village: string;
    pincode: string;
  };
}

export interface Testimonial {
  id: number;
  name: string;
  district: string;
  state: string;
  content_en: string;
  content_hi: string;
  content_mr: string;
}
