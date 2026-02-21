import { Product } from "./types";

export const PRODUCTS: Product[] = [
  {
    id: "dap-iffco",
    name: "DAP",
    company: "IFFCO",
    composition: "18-46-0",
    mrp: 1750,
    image: "https://picsum.photos/seed/iffco-dap/400/600",
    color: "#006400", // Dark Green
  },
  {
    id: "npk-10-26-26-kribhco",
    name: "NPK 10:26:26",
    company: "KRIBHCO",
    composition: "10:26:26",
    mrp: 1800,
    image: "https://picsum.photos/seed/kribhco-npk/400/600",
    color: "#8B4513", // Saddle Brown
  },
  {
    id: "npk-12-32-16-rcf",
    name: "NPK 12:32:16",
    company: "RCF",
    composition: "12:32:16",
    mrp: 1700,
    image: "https://picsum.photos/seed/rcf-npk/400/600",
    color: "#228B22", // Forest Green
  },
  {
    id: "urea-iffco",
    name: "Urea",
    company: "IFFCO",
    composition: "46% Nitrogen",
    mrp: 300,
    image: "https://picsum.photos/seed/iffco-urea/400/600",
    color: "#FFFFFF", // White
  },
];

export const COMPANIES = ["IFFCO", "KRIBHCO", "RCF"];
export const CUSTOMER_CARE = "9373742281";
export const UPI_ID = "9373742281@ybl"; // Example UPI ID
