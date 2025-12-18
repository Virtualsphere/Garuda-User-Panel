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
} from "lucide-react";

export const LandPage = () => {
  const [lands, setLands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
          // Transform API data to match component structure
          const transformedLands = data.data.map((land, index) => {
            // Extract acres from land_area (assuming format like "2 Acres")
            const acres = parseInt(land.land_details.land_area) || 0;
            
            // Map land_type to appropriate type for UI
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

            // Format price with commas
            const formatPrice = (price) => {
              return `₹${price.toLocaleString('en-IN')}`;
            };

            // Get first image from land_photo array or use default
            const getImage = () => {
              if (land.document_media?.land_photo?.length > 0) {
                return proxyUrl(land.document_media.land_photo[0]);
              }
              // Default fallback images based on land type
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

            // Generate title based on land details
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

            // Format location
            const formatLocation = () => {
              const loc = land.land_location;
              return `${loc.village}, ${loc.mandal}, ${loc.district}, ${loc.state}`;
            };

            return {
              id: land.land_id || `LAND-${index + 1}`,
              title: generateTitle(),
              price: formatPrice(land.land_details.total_land_price),
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

  const navigate = useNavigate();

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

  if (lands.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 text-6xl mb-4">🏞️</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No Lands Available</h3>
          <p className="text-gray-600">No verified lands found at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="relative z-10 px-6 py-6 md:px-12">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Compass className="h-8 w-8 text-emerald-500" />
            <span className="text-2xl font-bold text-black">GARUDA</span>
            <span className="text-emerald-500 font-bold">LANDS</span>
          </div>
          <div className="hidden md:flex space-x-8">
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
                className="text-black hover:text-emerald-300 transition-colors bg-transparent"
              >
                {item}
              </button>
            ))}
          </div>
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
            Land Inquiry
          </button>
        </div>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-2">
        {lands.map((land) => (
          <div
            key={land.id}
            className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative">
              <img
                src={land.image}
                alt={land.title}
                className="w-full h-64 object-cover"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=600';
                }}
              />
              {land.featured && (
                <div className="absolute top-4 left-4 bg-emerald-600 text-white px-3 py-1 rounded-full text-sm">
                  Featured
                </div>
              )}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                <span className="font-bold text-gray-900">{land.price}</span>
              </div>
              <div className="absolute bottom-4 left-4">
                <span className="bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                  {land.acres} Acre{land.acres !== 1 ? 's' : ''}
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {land.title}
              </h3>
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                <span className="truncate">{land.location}</span>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Droplets className="h-4 w-4 mr-2 text-blue-500" />
                  <span className="truncate">{land.waterSource}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Trees className="h-4 w-4 mr-2 text-green-500" />
                  <span>{land.type}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Factory className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="truncate">{land.zoning}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Shield className="h-4 w-4 mr-2 text-emerald-500" />
                  <span>Verified</span>
                </div>
              </div>

              {/* Farmer info */}
              <div className="border-t pt-4 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="h-4 w-4 mr-2 text-emerald-500" />
                  <span>Owner: {land.apiData?.farmer_details?.name || 'Not available'}</span>
                </div>
              </div>

              <div className="flex items-center justify-between border-t pt-4">
                <div className="flex items-center">
                  {[...Array(Math.floor(land.rating))].map((_, i) => (
                    <div key={i} className="text-emerald-400">
                      ★
                    </div>
                  ))}
                  <span className="ml-2 text-sm font-semibold">
                    {land.rating.toFixed(1)}
                  </span>
                </div>
                    <button 
                        onClick={() => navigate(`/land/${land.id}`, { state: { land: land.apiData } })}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                        >
                        View Details
                    </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};