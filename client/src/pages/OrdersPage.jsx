import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Truck, ArrowRight } from 'lucide-react';
import API from '../services/api';

export const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const loadMyOrders = async () => {
      try {
        const response = await API.get('/orders/myorders');
        if (isMounted) setOrders(response.data);
      } catch (err) {
        // Fallback demo order for preview
        if (isMounted) {
          setOrders([
            {
              _id: 'ORD987654',
              createdAt: new Date().toISOString(),
              totalAmount: 570,
              orderStatus: 'Shipped',
              paymentStatus: 'paid',
              items: [
                { name: 'Corn Chakali', weight: '250g', quantity: 1, price: 190 },
                { name: 'Prawns Pickle (Kolambi Lonche)', weight: '300g', quantity: 1, price: 380 }
              ]
            }
          ]);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    loadMyOrders();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="border-b border-gray-200 pb-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center">
          <Package className="w-5 h-5" />
        </div>
        <div>
          <h1 className="font-heritage text-3xl font-extrabold text-gray-900">My Orders</h1>
          <p className="text-xs text-gray-500">Track and view your recent order history</p>
        </div>
      </div>

      {loading ? (
        <p className="text-xs font-bold text-gray-400">Loading your orders...</p>
      ) : orders.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 space-y-4 max-w-lg mx-auto">
          <Package className="w-12 h-12 text-gray-400 mx-auto" />
          <h3 className="font-bold text-gray-900 text-lg">No orders placed yet</h3>
          <Link to="/store" className="px-6 py-2.5 bg-[#F28C28] text-white text-xs font-bold rounded-xl inline-block">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-100 pb-3 gap-2">
                <div>
                  <span className="text-xs font-bold text-gray-400">Order ID: {order._id}</span>
                  <p className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-3 py-1 bg-[#E8F5E9] text-[#2E7D32] rounded-full">
                    {order.orderStatus}
                  </span>
                  <span className="text-xs font-extrabold text-gray-900">₹{order.totalAmount}</span>
                </div>
              </div>

              <div className="space-y-2">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-xs text-gray-700 font-medium">
                    <span>{item.name} ({item.weight}) x {item.quantity}</span>
                    <span className="font-bold">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-gray-100 flex justify-end">
                <Link
                  to="/track-order"
                  className="text-xs font-bold text-[#F28C28] hover:underline flex items-center gap-1"
                >
                  <Truck className="w-3.5 h-3.5" />
                  <span>Track Live Package</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
