import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', mobile: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    addToast('Your message has been sent to Naik Foods support!', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold text-[#2E7D32] uppercase tracking-widest bg-[#E8F5E9] px-3 py-1 rounded-full">
          We’re Here to Help
        </span>
        <h1 className="font-heritage text-4xl font-extrabold text-gray-900">Contact Customer Support</h1>
        <p className="text-xs sm:text-sm text-gray-500">
          Have questions about your order, regional shipping, or bulk festival gifting? Reach out to us.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Contact Information */}
        <div className="lg:col-span-5 bg-white p-8 rounded-3xl border border-gray-100 space-y-6 shadow-xs">
          <h3 className="font-heritage text-2xl font-bold text-gray-900">Get in Touch</h3>

          <div className="space-y-4 text-xs text-gray-700">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#F28C28] flex-shrink-0 mt-0.5" />
              <div>
                <h5 className="font-bold text-gray-900">Headquarters & Flagship Outlet</h5>
                <p className="text-gray-500">Shop 4 & 5, Ranade Road, Dadar West, Mumbai, Maharashtra 400028</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-[#2E7D32] flex-shrink-0 mt-0.5" />
              <div>
                <h5 className="font-bold text-gray-900">Customer Helpline</h5>
                <p className="text-gray-500">+91 (022) 2430 9800 | +91 98200 12345</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-[#F28C28] flex-shrink-0 mt-0.5" />
              <div>
                <h5 className="font-bold text-gray-900">Email Inquiries</h5>
                <p className="text-gray-500">support@naikfoods.in</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-gray-100 shadow-xs">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <CheckCircle2 className="w-12 h-12 text-[#2E7D32] mx-auto" />
              <h3 className="font-bold text-gray-900 text-lg">Message Sent Successfully!</h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                Our support team will respond to your email within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <h3 className="font-heritage text-2xl font-bold text-gray-900 mb-4">Send Us a Message</h3>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Your Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter full name"
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-[#F28C28]"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-[#F28C28]"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Mobile Number</label>
                  <input
                    type="tel"
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    placeholder="Mobile number"
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-[#F28C28]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Your Message *</label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Write your inquiry or feedback..."
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-[#F28C28]"
                  required
                />
              </div>

              <button
                type="submit"
                className="px-8 py-3.5 bg-[#F28C28] hover:bg-[#E07B18] text-white font-bold text-sm rounded-2xl shadow-md flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Message</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
