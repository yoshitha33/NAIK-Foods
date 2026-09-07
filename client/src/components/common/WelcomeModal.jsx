import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Sparkles, Gift, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const WelcomeModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, googleLogin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If user is already authenticated or has dismissed modal in this session, don't show
    const dismissed = sessionStorage.getItem('naik_welcome_dismissed');
    if (isAuthenticated || dismissed) return;

    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 5000); // 5 Seconds Trigger

    return () => clearTimeout(timer);
  }, [isAuthenticated]);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('naik_welcome_dismissed', 'true');
  };

  const handleGoogleAuth = async () => {
    handleClose();
    await googleLogin();
    navigate('/account');
  };

  const handleSignInRedirect = () => {
    handleClose();
    navigate('/login');
  };

  if (!isOpen || isAuthenticated) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-fade-in">
      <div className="bg-white max-w-lg w-full rounded-3xl shadow-2xl overflow-hidden border border-gray-100 relative">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 p-2 text-gray-400 hover:text-gray-700 bg-white/80 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Promotional Header Banner */}
        <div className="bg-gradient-to-r from-[#F28C28] to-[#E07B18] p-8 text-white text-center space-y-2 relative overflow-hidden">
          <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-1 backdrop-blur-xs">
            <Gift className="w-8 h-8 text-white" />
          </div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full inline-block">
            Special Welcome Gift 🎁
          </span>
          <h3 className="font-heritage text-2xl sm:text-3xl font-extrabold leading-tight">
            Get ₹100 OFF Your First Order!
          </h3>
          <p className="text-xs text-amber-100 max-w-xs mx-auto">
            Sign in now to unlock coupon code <span className="font-extrabold text-white underline">NAIK100</span> & enjoy authentic Maharashtrian delicacies!
          </p>
        </div>

        {/* Modal Actions */}
        <div className="p-6 sm:p-8 space-y-4 bg-white">
          <button
            onClick={handleGoogleAuth}
            type="button"
            className="w-full py-3.5 px-4 border border-gray-200 hover:border-gray-300 rounded-2xl font-bold text-xs text-gray-800 bg-white hover:bg-gray-50 transition-all flex items-center justify-center gap-3 shadow-xs"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google (1-Click)</span>
          </button>

          <button
            onClick={handleSignInRedirect}
            type="button"
            className="w-full py-3.5 bg-[#F28C28] hover:bg-[#E07B18] text-white font-bold text-xs rounded-2xl shadow-md shadow-[#F28C28]/20 transition-all flex items-center justify-center gap-2"
          >
            <span>Sign In / Create Account</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={handleClose}
            className="w-full text-center text-xs text-gray-400 hover:text-gray-600 font-semibold pt-1 block"
          >
            Continue Browsing as Guest
          </button>
        </div>
      </div>
    </div>
  );
};
