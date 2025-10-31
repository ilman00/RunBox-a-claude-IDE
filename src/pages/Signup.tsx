import { useState } from 'react';
import { User, Mail, Lock, Github, Chrome, Eye, EyeOff, Cloud, Sparkles } from 'lucide-react';
import { register } from '../api';
export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Basic validation
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      // ✅ Access data returned from API
      const user = response.data.user;
      const accessToken = response.data.accessToken;

      // ✅ Store token in localStorage
      localStorage.setItem("token", accessToken);

      console.log("Registered successfully:", user);
      alert("Registration successful!");

      // optional redirect here if using React Router
      // navigate("/dashboard");
    } catch (error: any) {
      console.error("Registration failed:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Registration failed");
    }
  };
  
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />

        {/* Floating Code Elements */}
        <div className="absolute top-32 right-10 text-purple-500/20 font-mono text-sm animate-pulse">
          {'import React'}
        </div>
        <div className="absolute top-60 left-20 text-blue-500/20 font-mono text-sm animate-pulse" style={{ animationDelay: '0.5s' }}>
          {'export default'}
        </div>
        <div className="absolute bottom-32 right-20 text-purple-500/20 font-mono text-sm animate-pulse" style={{ animationDelay: '1.5s' }}>
          {'npm install'}
        </div>
      </div>

      {/* Register Container */}
      <div className="relative w-full max-w-md">
        {/* Glowing Border Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur-xl opacity-50" />

        <div className="relative bg-gray-900 rounded-2xl border border-gray-800 shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="relative">
                <Cloud className="w-12 h-12 text-purple-400" />
                <Sparkles className="w-6 h-6 text-blue-400 absolute -top-1 -right-1" />
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Create Account
            </h1>
            <p className="text-gray-400">Start coding in the cloud today</p>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-3 mb-6">
            <button className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-gray-800 hover:bg-gray-750 border border-gray-700 rounded-lg transition-all duration-300 hover:border-purple-500 group">
              <Github className="w-5 h-5" />
              <span>Sign up with GitHub</span>
            </button>
            <button className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-gray-800 hover:bg-gray-750 border border-gray-700 rounded-lg transition-all duration-300 hover:border-blue-500 group">
              <Chrome className="w-5 h-5" />
              <span>Sign up with Google</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-800" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-gray-900 text-gray-500">Or register with email</span>
            </div>
          </div>

          {/* Register Form */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  className="w-full pl-10 pr-12 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange('confirmPassword', e.target.value)}
                  className="w-full pl-10 pr-12 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-start text-sm">
              <input type="checkbox" className="mt-1 mr-2 rounded bg-gray-800 border-gray-700" />
              <span className="text-gray-400">
                I agree to the{' '}
                <a href="#" className="text-purple-400 hover:text-purple-300">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="text-purple-400 hover:text-purple-300">Privacy Policy</a>
              </span>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-semibold hover:shadow-xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105"
            >
              Create Account
            </button>
          </div>

          {/* Sign In Link */}
          <div className="mt-6 text-center text-sm">
            <span className="text-gray-400">Already have an account? </span>
            <a href="/login" className="text-purple-400 hover:text-purple-300 font-semibold">
              Sign In
            </a>
          </div>

          {/* Security Badge */}
          <div className="mt-6 pt-6 border-t border-gray-800">
            <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
              <Lock className="w-4 h-4" />
              <span>Your data is encrypted and secure</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}