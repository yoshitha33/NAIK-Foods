import React from 'react';
import { ShieldCheck, Truck, RefreshCw, FileText } from 'lucide-react';

export const PrivacyPolicyPage = () => (
  <div className="max-w-4xl mx-auto px-4 py-12 space-y-6 text-sm text-gray-700 leading-relaxed">
    <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
      <ShieldCheck className="w-8 h-8 text-[#2E7D32]" />
      <h1 className="font-heritage text-3xl font-bold text-gray-900">Privacy Policy</h1>
    </div>
    <p>At Naik Foods, accessible from naikfoods.in, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Naik Foods and how we use it.</p>
    <h3 className="font-bold text-gray-900 text-base">Information We Collect</h3>
    <p>When you register for an Account or place an order, we may ask for your contact information, including items such as full name, shipping address, email address, and mobile number.</p>
  </div>
);

export const TermsPage = () => (
  <div className="max-w-4xl mx-auto px-4 py-12 space-y-6 text-sm text-gray-700 leading-relaxed">
    <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
      <FileText className="w-8 h-8 text-[#F28C28]" />
      <h1 className="font-heritage text-3xl font-bold text-gray-900">Terms of Service</h1>
    </div>
    <p>These terms and conditions outline the rules and regulations for the use of Naik Foods's Website.</p>
    <h3 className="font-bold text-gray-900 text-base">Ordering & Payments</h3>
    <p>By placing an order on Naik Foods, you warrant that you are legally capable of entering into binding contracts and that all payment information provided is true and accurate.</p>
  </div>
);

export const ShippingPolicyPage = () => (
  <div className="max-w-4xl mx-auto px-4 py-12 space-y-6 text-sm text-gray-700 leading-relaxed">
    <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
      <Truck className="w-8 h-8 text-[#F28C28]" />
      <h1 className="font-heritage text-3xl font-bold text-gray-900">Shipping & Delivery Policy</h1>
    </div>
    <p>We deliver fresh Maharashtrian food products across India via reliable air and express courier partners.</p>
    <ul className="list-disc list-inside space-y-2">
      <li><strong>Free Delivery:</strong> Applied automatically on all orders above ₹999.</li>
      <li><strong>Standard Shipping:</strong> Flat ₹70 for orders below ₹999.</li>
      <li><strong>Delivery Time:</strong> 1-2 business days for Mumbai/Pune; 2-4 business days for all other metros.</li>
    </ul>
  </div>
);

export const ReturnPolicyPage = () => (
  <div className="max-w-4xl mx-auto px-4 py-12 space-y-6 text-sm text-gray-700 leading-relaxed">
    <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
      <RefreshCw className="w-8 h-8 text-[#2E7D32]" />
      <h1 className="font-heritage text-3xl font-bold text-gray-900">Returns & Refund Policy</h1>
    </div>
    <p>Due to the perishable nature of handcrafted food items, we do not accept returns once a food package is unsealed unless damaged during transit.</p>
    <p>If you receive a damaged or incorrect package, please contact support@naikfoods.in within 48 hours with order details and photo proof for instant replacement or refund.</p>
  </div>
);
