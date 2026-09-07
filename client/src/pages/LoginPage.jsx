import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Phone, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const LoginPage = () => {
  const [authMode, setAuthMode] = useState('password'); // 'password' or 'otp'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login, googleLogin } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handlePasswordLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      addToast('Please fill all fields', 'error');
      return;
    }
    setLoading(true);
    try {
      await login(email, password);
      navigate('/account');
    } catch (err) {
      // Handled in AuthContext
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    await googleLogin();
    navigate('/account');
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!mobile || mobile.length < 10) {
      addToast('Please enter a valid 10-digit mobile number', 'error');
      return;
    }
    setOtpSent(true);
    addToast(`OTP sent to +91 ${mobile}! Use demo OTP: 123456`, 'info');
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (otp === '123456' || otp === '999999') {
      await login('demo@naikfoods.in', 'demo123');
      navigate('/account');
    } else {
      addToast('Invalid OTP. Please use demo OTP: 123456', 'error');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl space-y-6">
        <div className="text-center space-y-1">
          <span className="text-xs font-bold text-[#F28C28] uppercase tracking-widest block">Welcome Back</span>
          <h1 className="font-heritage text-3xl font-extrabold text-gray-900">Sign In to Naik Foods</h1>
          <p className="text-xs text-gray-500">Access your saved addresses, live orders & wishlist</p>
        </div>

        {/* Google Authentication Button */}
        <button
          onClick={handleGoogleSignIn}
          type="button"
          className="w-full py-3 px-4 border border-gray-200 hover:border-gray-300 rounded-2xl font-bold text-xs text-gray-800 bg-white hover:bg-gray-50 transition-all flex items-center justify-center gap-3 shadow-2xs"
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
          <span>Continue with Google</span>
        </button>

        <div className="relative flex items-center justify-center">
          <div className="border-t border-gray-200 w-full" />
          <span className="bg-white px-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider absolute">OR</span>
        </div>

        {/* Tab Selector: Password vs Mobile OTP */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 rounded-2xl text-xs font-bold">
          <button
            onClick={() => setAuthMode('password')}
            className={`py-2 rounded-xl transition-all ${
              authMode === 'password' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-500'
            }`}
          >
            Email / Password
          </button>
          <button
            onClick={() => setAuthMode('otp')}
            className={`py-2 rounded-xl transition-all ${
              authMode === 'otp' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-500'
            }`}
          >
            Mobile OTP
          </button>
        </div>

        {authMode === 'password' ? (
          <form onSubmit={handlePasswordLogin} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-gray-700 mb-1">Email or Mobile *</label>
              <div className="relative">
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="demo@naikfoods.in"
                  className="w-full pl-9 pr-3 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#F28C28]"
                  required
                />
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="font-bold text-gray-700">Password *</label>
                <Link to="/forgot-password" className="text-[#F28C28] hover:underline">Forgot password?</Link>
              </div>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#F28C28]"
                  required
                />
                <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[#F28C28] hover:bg-[#E07B18] text-white font-bold text-sm rounded-2xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>{loading ? 'Signing In...' : 'Sign In'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <div className="space-y-4 text-xs">
            {!otpSent ? (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Mobile Number *</label>
                  <div className="relative">
                    <input
                      type="tel"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      placeholder="9820098200"
                      className="w-full pl-9 pr-3 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#F28C28]"
                      required
                    />
                    <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#F28C28] hover:bg-[#E07B18] text-white font-bold text-sm rounded-2xl shadow-md"
                >
                  Send OTP Code
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Enter 6-Digit OTP *</label>
                  <input
                    type="text"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter 123456"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#F28C28] text-center tracking-widest font-bold text-base"
                    required
                  />
                  <p className="text-[11px] text-gray-400 mt-1 text-center">Demo OTP Code: <span className="font-bold text-[#F28C28]">123456</span></p>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-bold text-sm rounded-2xl shadow-md"
                >
                  Verify & Sign In
                </button>
              </form>
            )}
          </div>
        )}

        {/* Demo Credentials Quick Box */}
        <div className="bg-[#FFF8F0] p-3.5 rounded-2xl border border-[#F28C28]/20 text-[11px] text-gray-600 space-y-1">
          <span className="font-bold text-[#F28C28] block">💡 Demo Credentials:</span>
          <p>Email: <span className="font-bold text-gray-900">demo@naikfoods.in</span></p>
          <p>Password: <span className="font-bold text-gray-900">demo123</span></p>
        </div>

        <div className="pt-4 border-t border-gray-100 text-center text-xs text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="font-bold text-[#F28C28] hover:underline">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
};
