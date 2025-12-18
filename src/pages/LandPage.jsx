import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  MapPin,
  Trees,
  Mountain,
  Droplets,
  Sun,
  Phone,
  Mail,
  ChevronLeft,
  ChevronRight,
  Shield,
  Award,
  TrendingUp,
  Compass,
  Ruler,
  Factory,
  Zap,
  Wind,
  Truck,
  Home,
  Menu,
  X
} from "lucide-react";

export const LandPage = () => {
  const [lands, setLands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 1000000000]);
  const [showFilters, setShowFilters] = useState(false);

  const navigate = useNavigate();

  const proxyUrl = (url) => {
    if (!url) return "";
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return `/api/proxy?url=${encodeURIComponent(url)}`;
    }
    return url;
  };

  // Fetch data from API
  useEffect(() => {
    const fetchLands = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/proxy?url=http://72.61.169.226/user/verified/land');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.message && data.data) {
          const transformedLands = data.data.map((land, index) => {
            const acres = parseInt(land.land_details.land_area) || 0;
            
            const getLandType = (type) => {
              const typeMap = {
                'agri': 'agricultural',
                'residential': 'residential',
                'commercial': 'development',
                'forest': 'timber',
                'industrial': 'industrial',
                'recreational': 'recreational'
              };
              return typeMap[type] || 'agricultural';
            };

            const formatPrice = (price) => {
              return `₹${price.toLocaleString('en-IN')}`;
            };

            const getImage = () => {
              if (land.document_media?.land_photo?.length > 0) {
                return proxyUrl(land.document_media.land_photo[0]);
              }
              const defaultImages = {
                'agricultural': 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=600',
                'residential': 'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600',
                'timber': 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600',
                'industrial': 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?ixlib=rb-4.0.3&auto=format&fit=crop&w=600',
                'development': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600',
                'recreational': 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-4.0.3&auto=format&fit=crop&w=600'
              };
              return defaultImages[getLandType(land.land_details.land_type)] || defaultImages.agricultural;
            };

            const generateTitle = () => {
              const acresText = `${acres} Acre${acres !== 1 ? 's' : ''}`;
              const typeMap = {
                'agricultural': 'Agricultural Land',
                'residential': 'Residential Plot',
                'development': 'Development Land',
                'timber': 'Timber Land',
                'industrial': 'Industrial Property',
                'recreational': 'Recreational Property'
              };
              const typeText = typeMap[getLandType(land.land_details.land_type)] || 'Land Property';
              
              return `${acresText} ${typeText}`;
            };

            const formatLocation = () => {
              const loc = land.land_location;
              return `${loc.village}, ${loc.mandal}, ${loc.district}, ${loc.state}`;
            };

            return {
              id: land.land_id || `LAND-${index + 1}`,
              title: generateTitle(),
              price: formatPrice(land.land_details.total_land_price),
              originalPrice: land.land_details.total_land_price,
              location: formatLocation(),
              acres: acres,
              waterSource: land.land_details.water_source || 'Not specified',
              soilType: 'Soil info available',
              zoning: getLandType(land.land_details.land_type).charAt(0).toUpperCase() + 
                     getLandType(land.land_details.land_type).slice(1),
              image: getImage(),
              rating: 4.5 + (Math.random() * 0.5),
              featured: index < 3,
              type: getLandType(land.land_details.land_type),
              apiData: land
            };
          });
          
          setLands(transformedLands);
        }
      } catch (error) {
        console.error('Error fetching lands:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLands();
  }, []);

  // Filter lands based on search and filters
  const filteredLands = lands.filter(land => {
    const matchesSearch = searchQuery === "" || 
      land.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      land.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      land.type.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = selectedType === "all" || land.type === selectedType;
    
    const matchesPrice = land.originalPrice >= priceRange[0] && land.originalPrice <= priceRange[1];
    
    return matchesSearch && matchesType && matchesPrice;
  });

  const landTypes = [
    { value: "all", label: "All Types" },
    { value: "agricultural", label: "Agricultural" },
    { value: "residential", label: "Residential" },
    { value: "development", label: "Development" },
    { value: "timber", label: "Timber" },
    { value: "industrial", label: "Industrial" },
    { value: "recreational", label: "Recreational" }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading lands...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Error Loading Lands</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="fixed inset-0 z-50 bg-white/95 backdrop-blur-md md:hidden">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center space-x-2">
                <Compass className="h-6 w-6 text-emerald-500" />
                <span className="text-xl font-bold text-gray-900">GARUDA</span>
                <span className="text-emerald-500 font-bold">LANDS</span>
              </div>
              <button
                onClick={() => setShowMobileMenu(false)}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <X className="h-6 w-6 text-gray-700" />
              </button>
            </div>
            
            <div className="flex-1 p-4 space-y-4">
              {["Home", "Browse Lands", "About", "Contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setShowMobileMenu(false);
                    if (item === "Browse Lands") {
                      navigate("/land");
                    }
                    if (item === "Home") {
                      navigate("/");
                    }
                  }}
                  className="block w-full text-left text-base font-medium text-gray-700 hover:text-emerald-600 py-2"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => navigate("/")}
                className="flex items-center space-x-2"
              >
                <Compass className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-500" />
                <span className="text-lg sm:text-xl font-bold text-gray-900">GARUDA</span>
                <span className="text-emerald-500 font-bold">LANDS</span>
              </button>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              {["Home", "Browse Lands", "About", "Contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    if (item === "Browse Lands") {
                      navigate("/land");
                    }
                    if (item === "Home") {
                      navigate("/");
                    }
                  }}
                  className="text-gray-700 hover:text-emerald-600 transition-colors bg-transparent text-sm lg:text-base"
                >
                  {item}
                </button>
              ))}
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 lg:px-6 py-2 rounded-lg font-semibold transition-colors text-sm lg:text-base">
                Land Inquiry
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center space-x-2 md:hidden">
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg font-semibold transition-colors text-sm">
                Inquiry
              </button>
              <button 
                onClick={() => setShowMobileMenu(true)}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <Menu className="h-6 w-6 text-gray-700" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Search and Filters Section */}
      <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="max-w-7xl mx-auto">
          {/* Search Bar */}
          <div className="mb-4 sm:mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
              <input
                type="text"
                placeholder="Search by location, land type, or acreage..."
                className="w-full pl-10 pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm sm:text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6 sm:mb-8">
            {/* Filter Toggle for Mobile */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <span>Filters</span>
              <svg className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Desktop Filters */}
            <div className="hidden md:flex items-center gap-4 flex-wrap">
              {/* Land Type Filter */}
              <div className="flex flex-wrap gap-2">
                {landTypes.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => setSelectedType(type.value)}
                    className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full transition-colors whitespace-nowrap text-xs sm:text-sm ${
                      selectedType === type.value
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>

              {/* Price Range Filter */}
              <div className="bg-white border border-gray-200 rounded-lg px-4 py-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Price:</span>
                  <input
                    type="range"
                    min="0"
                    max="1000000000"
                    step="100000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-32"
                  />
                  <span className="text-sm font-medium">
                    Up to ₹{(priceRange[1] / 10000000).toFixed(1)} Cr
                  </span>
                </div>
              </div>
            </div>

            {/* Mobile Filters Dropdown */}
            {showFilters && (
              <div className="md:hidden bg-white border border-gray-200 rounded-lg p-4 space-y-4">
                {/* Land Type Filter */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Land Type</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {landTypes.map((type) => (
                      <button
                        key={type.value}
                        onClick={() => setSelectedType(type.value)}
                        className={`px-3 py-1.5 rounded-full text-xs transition-colors ${
                          selectedType === type.value
                            ? 'bg-emerald-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range Filter */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Price: Up to ₹{(priceRange[1] / 10000000).toFixed(1)} Cr
                  </h4>
                  <input
                    type="range"
                    min="0"
                    max="1000000000"
                    step="100000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Results Info */}
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
              Available Lands
              {filteredLands.length > 0 && (
                <span className="text-gray-600 font-normal text-sm sm:text-base ml-2">
                  ({filteredLands.length} properties)
                </span>
              )}
            </h2>
          </div>

          {/* Lands Grid */}
          {filteredLands.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-5xl sm:text-6xl mb-4">🏞️</div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">No Lands Found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search criteria</p>
              <button 
                onClick={() => {
                  setSearchQuery("");
                  setSelectedType("all");
                  setPriceRange([0, 1000000000]);
                }}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors text-sm sm:text-base"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredLands.map((land) => (
                <div
                  key={land.id}
                  className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="relative">
                    <img
                      src={land.image}
                      alt={land.title}
                      className="w-full h-48 sm:h-56 md:h-64 object-cover"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=600';
                      }}
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
                        {land.acres} Acre{land.acres !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 sm:p-6">
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                      {land.title}
                    </h3>
                    <div className="flex items-center text-gray-600 mb-3 sm:mb-4">
                      <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1 flex-shrink-0" />
                      <span className="truncate text-xs sm:text-sm">{land.location}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4">
                      <div className="flex items-center text-xs sm:text-sm text-gray-600">
                        <Droplets className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-blue-500 flex-shrink-0" />
                        <span className="truncate">{land.waterSource}</span>
                      </div>
                      <div className="flex items-center text-xs sm:text-sm text-gray-600">
                        <Trees className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-green-500 flex-shrink-0" />
                        <span className="truncate">{land.type}</span>
                      </div>
                      <div className="flex items-center text-xs sm:text-sm text-gray-600">
                        <Factory className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-gray-500 flex-shrink-0" />
                        <span className="truncate">{land.zoning}</span>
                      </div>
                      <div className="flex items-center text-xs sm:text-sm text-gray-600">
                        <Shield className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-emerald-500 flex-shrink-0" />
                        <span>Verified</span>
                      </div>
                    </div>

                    {/* Farmer info */}
                    <div className="border-t pt-3 mb-3 sm:mb-4">
                      <div className="flex items-center text-xs sm:text-sm text-gray-600">
                        <Phone className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-emerald-500 flex-shrink-0" />
                        <span className="truncate">Owner: {land.apiData?.farmer_details?.name || 'Not available'}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t pt-3 sm:pt-4">
                      <div className="flex items-center">
                        {[...Array(Math.floor(land.rating))].map((_, i) => (
                          <div key={i} className="text-emerald-400 text-xs sm:text-sm">
                            ★
                          </div>
                        ))}
                        <span className="ml-1 sm:ml-2 text-xs sm:text-sm font-semibold">
                          {land.rating.toFixed(1)}
                        </span>
                      </div>
                      <button 
                        onClick={() => navigate(`/land/${land.id}`, { state: { land: land.apiData } })}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-semibold transition-colors text-xs sm:text-sm"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Mobile Floating Action Button */}
          <button className="fixed bottom-6 right-6 md:hidden bg-emerald-600 hover:bg-emerald-700 text-white p-3 rounded-full shadow-lg z-30">
            <Search className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12 mt-8 sm:mt-12">
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
                Your trusted partner in land acquisition and development.
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
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-gray-400 text-xs sm:text-sm">
            <p>&copy; 2024 Garuda Lands. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};