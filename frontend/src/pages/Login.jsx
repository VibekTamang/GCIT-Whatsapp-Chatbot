import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import logo from '../assets/logo.png';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  const [email, setEmail] = useState('admin.gcit@rub.edu.bt');
  const [password, setPassword] = useState('............');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // If user is already authenticated, push them straight to the dashboard
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    const success = login(email, password);
    if (success) {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB] p-4">
      <div className="w-full max-w-[440px] bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8 sm:p-10">

        <div className="flex flex-col items-center text-center mb-8">
          <img src={logo} alt="GCIT Logo" className="h-[60px] mb-5 object-contain" />
          <h1 className="text-xl font-bold text-gray-700 tracking-tight">GCIT WhatsApp AI Chatbot</h1>
          <p className="text-[13px] text-gray-400 mt-1 font-medium">Monitoring & Analysis System</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">

          <div className="space-y-2">
            <label className="text-[13px] font-bold text-gray-600 block text-left">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-[#F0F2F5] text-gray-800 border-0 focus:ring-2 focus:ring-[#7CB342]/30 transition-all font-medium text-[14px]"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-[13px] font-bold text-gray-600 block text-left">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg bg-[#F0F2F5] text-gray-800 border-0 focus:ring-2 focus:ring-[#7CB342]/30 transition-all font-bold ${!showPassword ? 'tracking-[0.2em] text-lg' : 'text-[14px]'}`}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                tabIndex="-1"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="flex justify-end pt-1">
            <Link to="#" className="text-[#3EA2F5] hover:text-[#2582D0] focus:outline-none transition-colors text-[13px] font-medium">
              Forgot password?
            </Link>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-[#7CB342] hover:bg-[#6CA038] text-white font-bold py-3.5 px-4 rounded-lg transition-transform transform active:scale-[0.99] duration-200 outline-none focus:ring-2 focus:ring-[#7CB342]/50 shadow-sm text-[15px]"
            >
              Sign in
            </button>
          </div>

          <div className="mt-8 text-center opacity-80">
            <p className="text-[12px] text-gray-400 font-medium tracking-wide">For office administrators only</p>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Login;
