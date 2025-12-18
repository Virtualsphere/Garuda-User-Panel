import React, { useState, useEffect } from 'react';
import { 
  Search, MapPin, Trees, Mountain, Droplets, Sun,
  Phone, Mail, ChevronLeft, ChevronRight, Shield,
  Award, TrendingUp, Compass, Ruler, Factory,
  Zap, Wind, Truck, Home, X, UserPlus, Star,
  Menu, ChevronDown
} from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [loginFormData, setLoginFormData] = useState({
    identifier: "",
    password: "",
  });
  const [signupFormData, setSignupFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "user",
    agree: false,
  });
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState([]);
  const [rolesLoading, setRolesLoading] = useState(true);
  const [signupError, setSignupError] = useState("");
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  
  const navigate = useNavigate();

  const featuredLands = [
    {
      id: 1,
      title: "50-Acre Agricultural Paradise",
      price: "$750,000",
      location: "Central Valley, California",
      acres: 50,
      waterSource: "Well & Stream",
      soilType: "Fertile Loam",
      zoning: "Agricultural",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=600",
      rating: 4.9,
      featured: true,
      type: "agricultural"
    },
    {
      id: 2,
      title: "Mountain View Development Land",
      price: "$1,200,000",
      location: "Rocky Mountains, Colorado",
      acres: 25,
      waterSource: "Municipal",
      soilType: "Rocky",
      zoning: "Residential/Commercial",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600",
      rating: 4.8,
      featured: true,
      type: "development"
    },
    {
      id: 3,
      title: "Riverfront Recreational Property",
      price: "$450,000",
      location: "Missouri River, Montana",
      acres: 15,
      waterSource: "River Frontage",
      soilType: "Sandy Loam",
      zoning: "Recreational",
      image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-4.0.3&auto=format&fit=crop&w=600",
      rating: 4.7,
      featured: true,
      type: "recreational"
    },
    {
      id: 4,
      title: "Solar Farm Ready Land",
      price: "$950,000",
      location: "Mojave Desert, Nevada",
      acres: 100,
      waterSource: "Limited",
      soilType: "Sandy",
      zoning: "Energy/Industrial",
      image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?ixlib=rb-4.0.3&auto=format&fit=crop&w=600",
      rating: 4.6,
      featured: false,
      type: "industrial"
    },
    {
      id: 5,
      title: "Timber Investment Property",
      price: "$650,000",
      location: "Pacific Northwest, Oregon",
      acres: 80,
      waterSource: "Multiple Streams",
      soilType: "Clay Loam",
      zoning: "Forestry",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600",
      rating: 4.9,
      featured: true,
      type: "timber"
    },
    {
      id: 6,
      title: "Lakeside Vacation Plot",
      price: "$325,000",
      location: "Lake Tahoe, California",
      acres: 5,
      waterSource: "Lake Access",
      soilType: "Rocky/Sandy",
      zoning: "Residential",
      image: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600",
      rating: 4.8,
      featured: false,
      type: "residential"
    },
  ];

  const landTypes = [
    { icon: <Trees />, label: "Agricultural", count: "342" },
    { icon: <Mountain />, label: "Development", count: "189" },
    { icon: <Droplets />, label: "Waterfront", count: "156" },
    { icon: <Factory />, label: "Industrial", count: "98" },
    { icon: <Sun />, label: "Solar", count: "67" },
    { icon: <Compass />, label: "Recreational", count: "234" },
  ];

  const landFeatures = [
    {
      title: "Water Rights Included",
      description: "Full legal water rights with documented sources",
      icon: <Droplets className="h-5 w-5 sm:h-6 sm:w-6" />
    },
    {
      title: "Mineral Rights Available",
      description: "Ownership of subsurface minerals negotiable",
      icon: <Mountain className="h-5 w-5 sm:h-6 sm:w-6" />
    },
    {
      title: "Survey & Title Ready",
      description: "Recent surveys and clear titles provided",
      icon: <Ruler className="h-5 w-5 sm:h-6 sm:w-6" />
    },
    {
      title: "Utility Access",
      description: "Power, water, and internet infrastructure available",
      icon: <Zap className="h-5 w-5 sm:h-6 sm:w-6" />
    },
  ];

  const testimonials = [
    {
      name: "James Wilson",
      text: "Found perfect 100-acre farmland with Garuda. Their expertise in agricultural zoning was invaluable.",
      role: "Farm Investor",
      rating: 5
    },
    {
      name: "Linda Martinez",
      text: "Purchased development land that doubled in value in 3 years. Excellent investment advice!",
      role: "Property Developer",
      rating: 5
    },
    {
      name: "Robert Chen",
      text: "Garuda helped us secure a beautiful lakeside property with all the necessary permits in place.",
      role: "Vacation Home Buyer",
      rating: 5
    }
  ];

  const stats = [
    { icon: <Award />, value: "15,000+", label: "Acres Sold" },
    { icon: <Shield />, value: "98%", label: "Client Satisfaction" },
    { icon: <TrendingUp />, value: "$2.5B+", label: "Total Transactions" },
    { icon: <Compass />, value: "40+", label: "States Covered" }
  ];

  const landUses = [
    { type: "Farming", icon: "🌾", color: "bg-green-100 text-green-800" },
    { type: "Ranching", icon: "🐄", color: "bg-brown-100 text-brown-800" },
    { type: "Solar Farm", icon: "☀️", color: "bg-yellow-100 text-yellow-800" },
    { type: "Timber", icon: "🌲", color: "bg-emerald-100 text-emerald-800" },
    { type: "Development", icon: "🏗️", color: "bg-blue-100 text-blue-800" },
    { type: "Conservation", icon: "🦉", color: "bg-teal-100 text-teal-800" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData({
      ...loginFormData,
      [name]: value,
    });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const { identifier, password } = loginFormData;

    try {
      const response = await fetch("/api/proxy?url=http://72.61.169.226/auth/login-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ identifier, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        setShowLoginModal(false);
        navigate("/dashboard");
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (err) {
      console.error("Network error:", err);
      alert("Network error");
    }
  };

  const handleSignupChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSignupFormData({
      ...signupFormData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    
    if (!signupFormData.agree) {
      alert("Please agree to the Terms & Conditions");
      return;
    }

    const { name, email, phone, password, role } = signupFormData;

    setLoading(true);
    
    try {
      const response = await fetch("http://72.61.169.226/api/create-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify({ 
          name, 
          email, 
          phone, 
          password, 
          role: role
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registration successful!");
        console.log("Registered user:", data.user);
        setSignupFormData({
          name: "",
          email: "",
          phone: "",
          password: "",
          role: "user",
          agree: false,
        });
        setShowSignupModal(false);
        setShowLoginModal(true);
      } else {
        alert(`Error: ${data.error || "Registration failed"}`);
      }
    } catch (err) {
      console.error("Network error:", err);
      alert("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const openSignupModal = async () => {
    setShowLoginModal(false);
    setShowSignupModal(true);
    setShowMobileMenu(false);
    if (roles.length === 0) {
      setRolesLoading(true);
      await fetchRoles();
    }
  };

  const openLoginModal = () => {
    setShowSignupModal(false);
    setShowLoginModal(true);
    setShowMobileMenu(false);
  };

  const nextTestimonial = () => {
    setTestimonialIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setTestimonialIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Mobile Menu */}
      <AnimatePresence>
        {showMobileMenu && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-50 bg-white/95 backdrop-blur-md md:hidden"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-6 border-b">
                <div className="flex items-center space-x-2">
                  <Compass className="h-8 w-8 text-emerald-500" />
                  <span className="text-2xl font-bold text-gray-900">GARUDA</span>
                  <span className="text-emerald-500 font-bold">LANDS</span>
                </div>
                <button
                  onClick={() => setShowMobileMenu(false)}
                  className="p-2 rounded-lg hover:bg-gray-100"
                >
                  <X className="h-6 w-6 text-gray-700" />
                </button>
              </div>
              
              <div className="flex-1 p-6 space-y-6">
                {['Home', 'Browse Lands', 'About', 'Contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      setShowMobileMenu(false);
                      if (item === 'Browse Lands') {
                        navigate('/land');
                      }
                    }}
                    className="block w-full text-left text-lg font-medium text-gray-700 hover:text-emerald-600 py-2"
                  >
                    {item}
                  </button>
                ))}
                
                <div className="pt-8 space-y-4">
                  <button 
                    onClick={openSignupModal}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Sign Up
                  </button>
                  <button 
                    onClick={openLoginModal}
                    className="w-full border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Sign In
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Login Modal */}
      <AnimatePresence>
        {showLoginModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={() => setShowLoginModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              className="relative bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl w-full max-w-md mx-4 overflow-hidden border border-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowLoginModal(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors z-10"
              >
                <X className="h-6 w-6" />
              </button>

              <div className="p-6 sm:p-8">
                <div className="text-center mb-6 sm:mb-8">
                  <div className="flex items-center justify-center space-x-2 mb-3 sm:mb-4">
                    <Compass className="h-8 w-8 sm:h-10 sm:w-10 text-emerald-500" />
                    <span className="text-2xl sm:text-3xl font-bold text-gray-900">GARUDA</span>
                    <span className="text-emerald-600 font-bold">LANDS</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Welcome Back</h2>
                  <p className="mt-2 text-sm sm:text-base text-gray-600">
                    Sign in to access your account
                  </p>
                </div>

                <form onSubmit={handleLoginSubmit} className="space-y-4 sm:space-y-5">
                  <div>
                    <label className="block text-sm sm:text-base text-gray-700 font-medium mb-1 sm:mb-2">
                      Email or Phone
                    </label>
                    <input
                      type="text"
                      name="identifier"
                      placeholder="Enter email or phone"
                      value={loginFormData.identifier}
                      onChange={handleLoginChange}
                      className="w-full text-sm sm:text-base border border-gray-300 rounded-xl px-4 py-2 sm:py-3 
                               focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm sm:text-base text-gray-700 font-medium mb-1 sm:mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      placeholder="Enter password"
                      value={loginFormData.password}
                      onChange={handleLoginChange}
                      className="w-full text-sm sm:text-base border border-gray-300 rounded-xl px-4 py-2 sm:py-3 
                               focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>

                  <div className="pt-2">
                    <motion.button
                      type="submit"
                      whileTap={{ scale: 0.97 }}
                      className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 
                               text-white font-semibold py-2 sm:py-3 rounded-xl shadow-lg 
                               hover:shadow-emerald-500/25 hover:from-emerald-600 hover:to-emerald-700 
                               transition-all duration-200 text-sm sm:text-base"
                    >
                      Sign In
                    </motion.button>
                  </div>

                  <div className="text-center pt-4 border-t border-gray-100">
                    <p className="text-gray-600 text-xs sm:text-sm">
                      Don't have an account?{' '}
                      <button
                        type="button"
                        className="text-emerald-600 hover:text-emerald-700 font-medium"
                        onClick={openSignupModal}
                      >
                        Sign up
                      </button>
                    </p>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Signup Modal */}
      <AnimatePresence>
        {showSignupModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={() => setShowSignupModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              className="relative bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl w-full max-w-md mx-4 overflow-hidden border border-white/20 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowSignupModal(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors z-10"
              >
                <X className="h-6 w-6" />
              </button>

              <div className="p-6 sm:p-8">
                <div className="text-center mb-6 sm:mb-8">
                  <div className="flex items-center justify-center space-x-2 mb-3 sm:mb-4">
                    <UserPlus className="h-8 w-8 sm:h-10 sm:w-10 text-emerald-500" />
                    <span className="text-2xl sm:text-3xl font-bold text-gray-900">GARUDA</span>
                    <span className="text-emerald-600 font-bold">LANDS</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Create Account</h2>
                  <p className="mt-2 text-sm sm:text-base text-gray-600">
                    Signing up is easy. It only takes a few steps.
                  </p>
                </div>

                <form onSubmit={handleSignupSubmit} className="space-y-4 sm:space-y-5">
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      value={signupFormData.name}
                      onChange={handleSignupChange}
                      className="w-full text-sm sm:text-base border border-gray-300 rounded-xl px-4 py-2 sm:py-3 
                               focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={signupFormData.email}
                      onChange={handleSignupChange}
                      className="w-full text-sm sm:text-base border border-gray-300 rounded-xl px-4 py-2 sm:py-3 
                               focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>

                  <div>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={signupFormData.phone}
                      onChange={handleSignupChange}
                      className="w-full text-sm sm:text-base border border-gray-300 rounded-xl px-4 py-2 sm:py-3 
                               focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>

                  <div>
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={signupFormData.password}
                      onChange={handleSignupChange}
                      className="w-full text-sm sm:text-base border border-gray-300 rounded-xl px-4 py-2 sm:py-3 
                               focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                      required
                      minLength="6"
                    />
                  </div>

                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="agree"
                      name="agree"
                      checked={signupFormData.agree}
                      onChange={handleSignupChange}
                      className="mt-1 h-4 w-4 sm:h-5 sm:w-5 text-emerald-600 focus:ring-emerald-500 rounded transition-all flex-shrink-0"
                      required
                    />
                    <label htmlFor="agree" className="text-xs sm:text-sm text-gray-600">
                      I agree to all Terms & Conditions and Privacy Policy
                    </label>
                  </div>

                  <div className="pt-2">
                    <motion.button
                      type="submit"
                      disabled={loading || rolesLoading || !signupFormData.role}
                      whileTap={{ scale: 0.97 }}
                      className={`w-full bg-gradient-to-r from-emerald-500 to-emerald-600 
                               text-white font-semibold py-2 sm:py-3 rounded-xl shadow-lg 
                               hover:shadow-emerald-500/25 hover:from-emerald-600 hover:to-emerald-700 
                               transition-all duration-200 text-sm sm:text-base ${(loading || rolesLoading || !signupFormData.role) ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {loading ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </span>
                      ) : (
                        "CREATE ACCOUNT"
                      )}
                    </motion.button>
                  </div>

                  <div className="text-center pt-4 border-t border-gray-100">
                    <p className="text-gray-600 text-xs sm:text-sm">
                      Already have an account?{' '}
                      <button
                        type="button"
                        className="text-emerald-600 hover:text-emerald-700 font-medium"
                        onClick={openLoginModal}
                      >
                        Sign in
                      </button>
                    </p>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <div 
        className="relative min-h-screen bg-cover bg-center"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920)',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Navigation */}
        <nav className="relative z-10 px-4 py-4 sm:px-6 md:px-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Compass className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-500" />
              <span className="text-xl sm:text-2xl font-bold text-white">GARUDA</span>
              <span className="text-emerald-500 font-bold">LANDS</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {['Home', 'Browse Lands', 'About', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    if (item === 'Browse Lands') {
                      navigate('/land');
                    }
                  }}
                  className="text-white hover:text-emerald-300 transition-colors bg-transparent text-sm lg:text-base"
                >
                  {item}
                </button>
              ))}
              
              <div className="flex items-center space-x-4">
                <button 
                  onClick={openSignupModal}
                  className="bg-transparent border border-white text-white hover:bg-white/10 px-4 py-2 rounded-lg font-semibold transition-colors text-sm"
                >
                  Sign Up
                </button>
                <button 
                  onClick={openLoginModal}
                  className="bg-transparent border border-white text-white hover:bg-white/10 px-4 py-2 rounded-lg font-semibold transition-colors text-sm"
                >
                  Sign In
                </button>
                <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors text-sm">
                  Land Inquiry
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center space-x-2 md:hidden">
              <button 
                onClick={openSignupModal}
                className="bg-transparent border border-white text-white hover:bg-white/10 px-3 py-1.5 rounded-lg font-semibold transition-colors text-xs"
              >
                Sign Up
              </button>
              <button 
                onClick={() => setShowMobileMenu(true)}
                className="p-2 rounded-lg hover:bg-white/10"
              >
                <Menu className="h-6 w-6 text-white" />
              </button>
            </div>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center px-4 text-center pt-12 pb-20 sm:pt-16 sm:pb-24 md:pt-24 md:pb-32">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4 md:mb-6">
            Discover Your Perfect <span className="text-emerald-400">Land</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-6 sm:mb-8 max-w-2xl px-2">
            From agricultural acres to development plots, find the land that matches your vision with Garuda Lands.
          </p>

          {/* Search Bar */}
          <div className="bg-white rounded-2xl p-1 sm:p-2 shadow-2xl w-full max-w-4xl mx-2 sm:mx-4">
            <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-3 p-3 sm:p-4">
              <div className="flex-1 w-full">
                <div className="flex items-center space-x-2">
                  <Search className="text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
                  <input
                    type="text"
                    placeholder="Search by state, county, acreage, or land type..."
                    className="w-full p-2 outline-none text-sm sm:text-base"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-3">
                <div className="flex gap-2 sm:gap-4">
                  <select className="p-2 border rounded-lg text-xs sm:text-sm flex-1">
                    <option>Land Type</option>
                    <option>Agricultural</option>
                    <option>Development</option>
                    <option>Recreational</option>
                    <option>Industrial</option>
                  </select>
                  <select className="p-2 border rounded-lg text-xs sm:text-sm flex-1">
                    <option>Acreage</option>
                    <option>1-10 acres</option>
                    <option>10-50 acres</option>
                    <option>50-100 acres</option>
                    <option>100+ acres</option>
                  </select>
                </div>
                <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 sm:px-8 py-2 rounded-lg font-semibold transition-colors text-sm sm:text-base whitespace-nowrap">
                  Find Land
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-b from-emerald-50 to-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-2 sm:p-4">
                <div className="flex justify-center mb-2 sm:mb-4">
                  <div className="p-2 sm:p-3 bg-emerald-100 rounded-full">
                    {React.cloneElement(stat.icon, { className: 'h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6' })}
                  </div>
                </div>
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-xs sm:text-sm md:text-base text-gray-600 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Lands */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Featured Land Properties
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-2">
              Carefully selected lands with verified titles, clear zoning, and development potential
            </p>
          </div>

          {/* Land Filters */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-8 overflow-x-auto pb-2 sm:pb-0">
            {['all', 'agricultural', 'development', 'recreational', 'industrial', 'timber', 'residential'].map((type) => (
              <button
                key={type}
                onClick={() => setActiveFilter(type)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full transition-colors whitespace-nowrap text-xs sm:text-sm ${
                  activeFilter === type
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>

          {/* Lands Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredLands.map((land) => (
              <div key={land.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="relative">
                  <img
                    src={land.image}
                    alt={land.title}
                    className="w-full h-48 sm:h-56 md:h-64 object-cover"
                  />
                  {land.featured && (
                    <div className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-emerald-600 text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm">
                      Featured
                    </div>
                  )}
                  <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-white/90 backdrop-blur-sm px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
                    <span className="font-bold text-gray-900 text-xs sm:text-sm">{land.price}</span>
                  </div>
                  <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3">
                    <span className="bg-black/70 text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs">
                      {land.acres} Acres
                    </span>
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                    {land.title}
                  </h3>
                  <div className="flex items-center text-gray-600 mb-3 sm:mb-4">
                    <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1 flex-shrink-0" />
                    <span className="truncate text-sm">{land.location}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <div className="flex items-center text-xs sm:text-sm text-gray-600">
                      <Droplets className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-blue-500 flex-shrink-0" />
                      <span className="truncate">{land.waterSource}</span>
                    </div>
                    <div className="flex items-center text-xs sm:text-sm text-gray-600">
                      <Mountain className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-green-500 flex-shrink-0" />
                      <span className="truncate">{land.soilType}</span>
                    </div>
                    <div className="flex items-center text-xs sm:text-sm text-gray-600">
                      <Factory className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-gray-500 flex-shrink-0" />
                      <span className="truncate">{land.zoning}</span>
                    </div>
                    <div className="flex items-center text-xs sm:text-sm text-gray-600">
                      <Ruler className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-emerald-500 flex-shrink-0" />
                      <span>Surveyed</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t pt-3 sm:pt-4">
                    <div className="flex items-center">
                      {[...Array(Math.floor(land.rating))].map((_, i) => (
                        <div key={i} className="text-emerald-400 text-sm sm:text-base">★</div>
                      ))}
                      <span className="ml-1 sm:ml-2 text-xs sm:text-sm font-semibold">{land.rating}</span>
                    </div>
                    <button 
                      onClick={() => navigate('/land')}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-semibold transition-colors text-xs sm:text-sm"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Land Types */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8 sm:mb-12">
            Browse by Land Type
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
            {landTypes.map((type, index) => (
              <div
                key={index}
                className="bg-gray-50 hover:bg-emerald-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center transition-colors cursor-pointer group border border-gray-200"
              >
                <div className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-emerald-100 rounded-full mb-2 sm:mb-3 group-hover:bg-emerald-200 transition-colors">
                  {React.cloneElement(type.icon, { className: 'h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6' })}
                </div>
                <h3 className="font-semibold text-gray-900 mb-0.5 sm:mb-1 text-xs sm:text-sm md:text-base">
                  {type.label}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600">{type.count} Properties</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Land Features */}
      <section className="py-12 sm:py-16 bg-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Complete Land Services
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              We handle every aspect of land transactions for you
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {landFeatures.map((feature, index) => (
              <div key={index} className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm border border-emerald-100">
                <div className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-emerald-100 rounded-lg mb-3 sm:mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Land Use Cases */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 mb-6 sm:mb-8">
            Popular Land Uses
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 md:gap-4">
            {landUses.map((use, index) => (
              <div
                key={index}
                className={`${use.color} rounded-lg sm:rounded-xl p-3 sm:p-4 text-center transition-transform hover:scale-105 cursor-pointer`}
              >
                <div className="text-xl sm:text-2xl mb-1 sm:mb-2">{use.icon}</div>
                <div className="font-semibold text-xs sm:text-sm md:text-base">{use.type}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Land Owners & Investors Trust Garuda
            </h2>
            <p className="text-sm sm:text-base text-gray-600">Success stories from our land transactions</p>
          </div>
          
          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden rounded-xl sm:rounded-2xl bg-white shadow-xl p-6 sm:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={testimonialIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                  className="text-center"
                >
                  <div className="flex justify-center mb-4 sm:mb-6">
                    {[...Array(testimonials[testimonialIndex].rating)].map((_, i) => (
                      <Star key={i} className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-emerald-400 fill-emerald-400 mx-0.5 sm:mx-1" />
                    ))}
                  </div>
                  <p className="text-base sm:text-lg md:text-xl italic text-gray-700 mb-6 sm:mb-8 px-2">
                    "{testimonials[testimonialIndex].text}"
                  </p>
                  <div>
                    <div className="font-bold text-xl sm:text-2xl text-gray-900">
                      {testimonials[testimonialIndex].name}
                    </div>
                    <div className="text-gray-600 text-sm sm:text-base">
                      {testimonials[testimonialIndex].role}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            
            <div className="flex justify-center items-center mt-6 sm:mt-8 space-x-4">
              <button
                onClick={prevTestimonial}
                className="p-2 sm:p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow"
              >
                <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700" />
              </button>
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setTestimonialIndex(index)}
                    className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors ${
                      testimonialIndex === index ? 'bg-emerald-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={nextTestimonial}
                className="p-2 sm:p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow"
              >
                <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-emerald-600 to-emerald-700">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
            Ready to Own Your Piece of India?
          </h2>
          <p className="text-emerald-100 text-base sm:text-lg md:text-xl mb-6 sm:mb-8">
            Join successful investors who've built their legacy with Garuda Lands
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
            <button 
              onClick={() => navigate('/land')}
              className="bg-white text-emerald-600 hover:bg-gray-100 px-6 py-3 sm:px-8 sm:py-3 rounded-lg font-semibold text-base sm:text-lg transition-colors"
            >
              Browse Available Lands
            </button>
            <button 
              onClick={openSignupModal}
              className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-6 py-3 sm:px-8 sm:py-3 rounded-lg font-semibold text-base sm:text-lg transition-colors"
            >
              Start Free Account
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                <Compass className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-500" />
                <div>
                  <span className="text-xl sm:text-2xl font-bold">GARUDA</span>
                  <span className="text-emerald-500 font-bold"> LANDS</span>
                </div>
              </div>
              <p className="text-gray-400 text-sm sm:text-base">
                Your trusted partner in land acquisition and development since 1985.
              </p>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-4">Land Categories</h3>
              <ul className="space-y-1 sm:space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-emerald-400 text-sm sm:text-base">Agricultural Land</a></li>
                <li><a href="#" className="hover:text-emerald-400 text-sm sm:text-base">Development Land</a></li>
                <li><a href="#" className="hover:text-emerald-400 text-sm sm:text-base">Recreational Land</a></li>
                <li><a href="#" className="hover:text-emerald-400 text-sm sm:text-base">Investment Land</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-4">Services</h3>
              <ul className="space-y-1 sm:space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-emerald-400 text-sm sm:text-base">Land Surveying</a></li>
                <li><a href="#" className="hover:text-emerald-400 text-sm sm:text-base">Title Research</a></li>
                <li><a href="#" className="hover:text-emerald-400 text-sm sm:text-base">Zoning Analysis</a></li>
                <li><a href="#" className="hover:text-emerald-400 text-sm sm:text-base">Land Valuation</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-4">Contact Us</h3>
              <div className="space-y-2 sm:space-y-3 text-gray-400">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-emerald-500 flex-shrink-0" />
                  <span className="text-sm sm:text-base">1-800-GARUDA-LAND</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-emerald-500 flex-shrink-0" />
                  <span className="text-sm sm:text-base">info@garudalands.com</span>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base">500 Landmark Plaza<br />Denver, CO 80202</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-gray-400 text-xs sm:text-sm">
            <p>&copy; 1985-2024 Garuda Lands. All rights reserved. | Licensed in 40 states</p>
          </div>
        </div>
      </footer>
    </div>
  );
};