import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'How are Naik Foods snacks packaged to remain crispy?',
      a: 'All our crispy snacks like Corn Chakali and Jwari Bhel are vacuum-sealed in multi-layer food-grade aluminum foil pouches immediately after cooling down from woodfire roasting. This preserves 100% crunchiness without artificial preservatives.'
    },
    {
      q: 'What is the Free Delivery threshold for orders?',
      a: 'We offer FREE All-India Shipping on all orders above ₹999. For orders below ₹999, a flat standard delivery charge of ₹70 is applied.'
    },
    {
      q: 'How long does delivery take to major Indian cities?',
      a: 'Deliveries within Mumbai and Pune take 1-2 business days. Express delivery to major metros (Delhi, Bangalore, Hyderabad, Chennai) takes 2-4 business days.'
    },
    {
      q: 'Are seafood pickles like Prawns Lonche safely refrigerated in transit?',
      a: 'Yes! Our Prawns Pickle is cured in traditional cold-pressed mustard oil, sea salt, and natural vinegar which preserves non-veg pickles naturally without spoiling during courier transit.'
    },
    {
      q: 'Can I send corporate or festive gift boxes directly to multiple addresses?',
      a: 'Yes, we offer customized corporate gifting for Diwali, Ganesh Chaturthi, and corporate events with custom greeting cards and bulk address dispatches.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F28C28] uppercase tracking-widest bg-[#FFF3E0] px-3 py-1 rounded-full">
          <HelpCircle className="w-4 h-4" />
          <span>Frequently Asked Questions</span>
        </div>
        <h1 className="font-heritage text-4xl font-extrabold text-gray-900">Help & FAQs</h1>
        <p className="text-xs sm:text-sm text-gray-500">Everything you need to know about our products, shipping & payments.</p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-2xs">
              <button
                onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                className="w-full text-left p-5 font-bold text-gray-900 text-sm sm:text-base flex justify-between items-center gap-4 hover:text-[#F28C28] transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-50 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
