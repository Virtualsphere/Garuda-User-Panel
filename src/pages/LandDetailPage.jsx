import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  MapPin,
  Trees,
  Droplets,
  Home,
  Phone,
  Mail,
  Shield,
  Award,
  Compass,
  Ruler,
  Factory,
  Zap,
  Wind,
  Truck,
  Mountain,
  Sun,
  ChevronLeft,
  ChevronRight,
  X,
  Navigation,
  FileText,
  User,
  CreditCard,
  AlertCircle,
  CheckCircle,
  Clock,
  Globe,
  Video,
  Image as ImageIcon,
  Menu,
  Share2,
  Heart,
  ArrowLeft,
  ArrowRight,
  Calendar,
  Download,
  Printer,
  ExternalLink
} from "lucide-react";

export const LandDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [land, setLand] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedTab, setSelectedTab] = useState("overview");
  const [showMobileGallery, setShowMobileGallery] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const proxyUrl = (url) => {
    if (!url) return "";
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return `/api/proxy?url=${encodeURIComponent(url)}`;
    }
    return url;
  };

  // Check if land data was passed via navigation state
  useEffect(() => {
    if (location.state?.land) {
      setLand(location.state.land);
      setLoading(false);
    } else {
      // If no state passed, fetch from API
      fetchLandDetails();
    }
  }, [id, location.state]);

  const fetchLandDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/proxy?url=http://72.61.169.226/user/verified/land/${id}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.message && data.data) {
        // Find the specific land by ID or use first one
        const landData = data.data.find(l => l.land_id === id) || data.data[0];
        if (landData) {
          setLand(landData);
        } else {
          throw new Error('Land not found');
        }
      }
    } catch (error) {
      console.error('Error fetching land details:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return `₹${price?.toLocaleString('en-IN') || '0'}`;
  };

  const getLandTypeLabel = (type) => {
    const typeMap = {
      'agricultrue': 'Agricultural Land',
      'agricultural': 'Agricultural Land',
      'residential': 'Residential Plot',
      'commercial': 'Commercial Property',
      'forest': 'Forest/Timber Land',
      'industrial': 'Industrial Property',
      'recreational': 'Recreational Property'
    };
    return typeMap[type?.toLowerCase()] || 'Land Property';
  };

  const formatLocation = (location) => {
    if (!location) return 'Location not specified';
    return `${location.village}, ${location.mandal}, ${location.district}, ${location.state}`;
  };

  const nextImage = () => {
    if (land?.document_media?.land_photo) {
      setCurrentImageIndex((prev) => 
        prev === land.document_media.land_photo.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (land?.document_media?.land_photo) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? land.document_media.land_photo.length - 1 : prev - 1
      );
    }
  };

  const openInMaps = () => {
    const lat = land?.gps_tracking?.latitude;
    const lng = land?.gps_tracking?.longitude;
    if (lat && lng) {
      window.open(`https://www.google.com/maps?q=${lat},${lng}`, '_blank');
    }
  };

  const shareProperty = () => {
    if (navigator.share) {
      navigator.share({
        title: land?.land_details?.title || 'Land Property',
        text: `Check out this ${getLandTypeLabel(land?.land_details?.land_type)} at ${formatPrice(land?.land_details?.total_land_price)}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading land details...</p>
        </div>
      </div>
    );
  }

  if (error || !land) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-red-500 text-5xl sm:text-6xl mb-4">⚠️</div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Error Loading Land Details</h3>
          <p className="text-gray-600 mb-4 text-sm sm:text-base">{error || 'Land not found'}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button 
              onClick={() => navigate('/land')}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 sm:px-6 py-2 rounded-lg font-semibold transition-colors text-sm sm:text-base"
            >
              Back to Listings
            </button>
            <button 
              onClick={fetchLandDetails}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 sm:px-6 py-2 rounded-lg font-semibold transition-colors text-sm sm:text-base"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  const images = land.document_media?.land_photo || [];
  const currentImage = images[currentImageIndex] || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="md:hidden sticky top-0 z-40 bg-white shadow-sm">
        <div className="px-4 py-3 flex items-center justify-between">
          <button 
            onClick={() => navigate('/land')}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <ArrowLeft className="h-5 w-5 text-gray-700" />
          </button>
          
          <div className="flex items-center space-x-2">
            <Compass className="h-6 w-6 text-emerald-500" />
            <span className="text-lg font-bold text-black">GARUDA</span>
            <span className="text-emerald-500 font-bold">LANDS</span>
          </div>
          
          <button 
            onClick={() => setShowMobileMenu(true)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <Menu className="h-5 w-5 text-gray-700" />
          </button>
        </div>
      </div>

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
              <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-semibold transition-colors">
                Contact Owner
              </button>
              <button className="w-full border border-emerald-600 text-emerald-600 hover:bg-emerald-50 py-3 rounded-lg font-semibold transition-colors">
                Schedule Site Visit
              </button>
              <button className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 py-3 rounded-lg font-semibold transition-colors">
                Share Property
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Navigation */}
      <nav className="hidden md:block bg-white shadow-sm px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => navigate('/land')}
              className="flex items-center text-gray-600 hover:text-emerald-600 text-sm lg:text-base"
            >
              <ChevronLeft className="h-4 w-4 lg:h-5 lg:w-5 mr-1" />
              Back to Listings
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <Compass className="h-6 w-6 lg:h-8 lg:w-8 text-emerald-500" />
            <span className="text-lg lg:text-xl font-bold text-black">GARUDA</span>
            <span className="text-emerald-500 font-bold">LANDS</span>
          </div>
          <div className="flex items-center space-x-3">
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 lg:px-6 py-2 rounded-lg font-semibold transition-colors text-sm lg:text-base">
              Contact Owner
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        {/* Property Header - Mobile */}
        <div className="md:hidden bg-white rounded-xl shadow-sm p-4 mb-4">
          <h1 className="text-xl font-bold text-gray-900 mb-2">
            {getLandTypeLabel(land.land_details.land_type)} - {land.land_details.land_area}
          </h1>
          <div className="flex items-center text-gray-600 mb-3">
            <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="text-sm truncate">{formatLocation(land.land_location)}</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg font-bold text-emerald-600">
                {formatPrice(land.land_details.total_land_price)}
              </div>
              <div className="text-xs text-gray-500">
                {formatPrice(land.land_details.price_per_acre)} per acre
              </div>
            </div>
            <div className="inline-flex items-center bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs">
              <Shield className="h-3 w-3 mr-1" />
              <span>Verified</span>
            </div>
          </div>
        </div>

        {/* Property Header - Desktop */}
        <div className="hidden md:block bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-6 lg:mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-4">
            <div className="mb-4 lg:mb-0">
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                {getLandTypeLabel(land.land_details.land_type)} - {land.land_details.land_area}
              </h1>
              <div className="flex items-center text-gray-600">
                <MapPin className="h-4 w-4 lg:h-5 lg:w-5 mr-2 flex-shrink-0" />
                <span className="text-sm lg:text-base">{formatLocation(land.land_location)}</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-xl lg:text-2xl font-bold text-emerald-600">
                  {formatPrice(land.land_details.total_land_price)}
                </div>
                <div className="text-sm text-gray-500">
                  {formatPrice(land.land_details.price_per_acre)} per acre
                </div>
              </div>
              <div className="inline-flex items-center bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full">
                <Shield className="h-4 w-4 mr-2" />
                <span className="font-semibold text-sm">Verified Property</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Left Column - Images & Tabs */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Image Gallery */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="relative h-48 sm:h-64 md:h-80 lg:h-96">
                <img
                  src={proxyUrl(currentImage)}
                  alt="Land"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200';
                  }}
                  onClick={() => images.length > 0 && setShowMobileGallery(true)}
                />
                
                {/* Mobile Gallery Fullscreen */}
                {showMobileGallery && (
                  <div className="fixed inset-0 z-50 bg-black flex flex-col">
                    <div className="p-4 flex justify-between items-center">
                      <button
                        onClick={() => setShowMobileGallery(false)}
                        className="text-white"
                      >
                        <X className="h-6 w-6" />
                      </button>
                      <div className="text-white text-sm">
                        {currentImageIndex + 1} / {images.length}
                      </div>
                    </div>
                    <div className="flex-1 relative">
                      <img
                        src={proxyUrl(currentImage)}
                        alt="Land"
                        className="w-full h-full object-contain"
                      />
                      {images.length > 1 && (
                        <>
                          <button
                            onClick={prevImage}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
                          >
                            <ArrowLeft className="h-6 w-6" />
                          </button>
                          <button
                            onClick={nextImage}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
                          >
                            <ArrowRight className="h-6 w-6" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                )}
                
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-1 sm:p-2 rounded-full shadow-lg"
                    >
                      <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-1 sm:p-2 rounded-full shadow-lg"
                    >
                      <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6" />
                    </button>
                  </>
                )}
                
                <div className="absolute bottom-3 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1 sm:space-x-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-white/50'}`}
                    />
                  ))}
                </div>
              </div>
              
              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="p-3 sm:p-4 grid grid-cols-4 gap-2">
                  {images.slice(0, 4).map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative h-16 sm:h-20 rounded-lg overflow-hidden ${index === currentImageIndex ? 'ring-2 ring-emerald-500' : ''}`}
                    >
                      <img
                        src={proxyUrl(img)}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Action Buttons */}
            <div className="md:hidden flex items-center space-x-2">
              <button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-semibold transition-colors text-sm">
                <Phone className="h-4 w-4 inline mr-2" />
                Contact Owner
              </button>
              <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Heart className="h-5 w-5 text-gray-600" />
              </button>
              <button 
                onClick={shareProperty}
                className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <Share2 className="h-5 w-5 text-gray-600" />
              </button>
            </div>

            {/* Tab Navigation */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="border-b overflow-x-auto">
                <div className="flex min-w-max px-4 sm:px-6">
                  {["overview", "features", "documents", "location"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setSelectedTab(tab)}
                      className={`py-3 sm:py-4 px-2 sm:px-4 font-medium text-xs sm:text-sm border-b-2 whitespace-nowrap transition-colors ${selectedTab === tab ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-4 sm:p-6">
                {selectedTab === "overview" && (
                  <div className="space-y-4 sm:space-y-6">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900">Property Overview</h3>
                    <p className="text-gray-600 text-sm sm:text-base">
                      This {land.land_details.land_area.toLowerCase()} {getLandTypeLabel(land.land_details.land_type).toLowerCase()} 
                      is located in the prime area of {land.land_location?.village}, {land.land_location?.district}. 
                      The property features excellent connectivity and is suitable for various purposes.
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <Ruler className="h-5 w-5 mr-3 text-gray-400 flex-shrink-0" />
                        <div>
                          <div className="text-xs text-gray-500">Land Area</div>
                          <div className="font-semibold text-sm sm:text-base">{land.land_details.land_area}</div>
                        </div>
                      </div>
                      <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <Droplets className="h-5 w-5 mr-3 text-blue-400 flex-shrink-0" />
                        <div>
                          <div className="text-xs text-gray-500">Water Source</div>
                          <div className="font-semibold text-sm sm:text-base">{land.land_details.water_source || 'Not specified'}</div>
                        </div>
                      </div>
                      <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <Trees className="h-5 w-5 mr-3 text-green-400 flex-shrink-0" />
                        <div>
                          <div className="text-xs text-gray-500">Garden</div>
                          <div className="font-semibold text-sm sm:text-base">{land.land_details.garden || 'No'}</div>
                        </div>
                      </div>
                      <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <Home className="h-5 w-5 mr-3 text-orange-400 flex-shrink-0" />
                        <div>
                          <div className="text-xs text-gray-500">Residential</div>
                          <div className="font-semibold text-sm sm:text-base">{land.land_details.residental || 'No'}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedTab === "features" && (
                  <div className="space-y-4 sm:space-y-6">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900">Property Features</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <div className={`p-2 rounded-lg mr-3 ${land.land_details.fencing === 'Complete' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}`}>
                          <Shield className="h-4 w-4 sm:h-5 sm:w-5" />
                        </div>
                        <div>
                          <div className="font-semibold text-sm sm:text-base">Fencing</div>
                          <div className="text-xs text-gray-500">{land.land_details.fencing || 'Not available'}</div>
                        </div>
                      </div>
                      <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <div className={`p-2 rounded-lg mr-3 ${land.land_details.farm_pond === 'Yes' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
                          <Droplets className="h-4 w-4 sm:h-5 sm:w-5" />
                        </div>
                        <div>
                          <div className="font-semibold text-sm sm:text-base">Farm Pond</div>
                          <div className="text-xs text-gray-500">{land.land_details.farm_pond || 'No'}</div>
                        </div>
                      </div>
                      <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <div className="p-2 rounded-lg mr-3 bg-gray-100 text-gray-600">
                          <Factory className="h-4 w-4 sm:h-5 sm:w-5" />
                        </div>
                        <div>
                          <div className="font-semibold text-sm sm:text-base">Shed Details</div>
                          <div className="text-xs text-gray-500">{land.land_details.shed_details || 'Not available'}</div>
                        </div>
                      </div>
                      <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <div className="p-2 rounded-lg mr-3 bg-gray-100 text-gray-600">
                          <Truck className="h-4 w-4 sm:h-5 sm:w-5" />
                        </div>
                        <div>
                          <div className="font-semibold text-sm sm:text-base">Road Access</div>
                          <div className="text-xs text-gray-500">{land.gps_tracking?.road_path || 'Not specified'}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedTab === "documents" && (
                  <div className="space-y-4 sm:space-y-6">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900">Documents & Media</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {land.land_details.passbook_photo && (
                        <a
                          href={proxyUrl(land.land_details.passbook_photo)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center p-3 sm:p-4 border rounded-lg hover:bg-gray-50"
                        >
                          <CreditCard className="h-5 w-5 sm:h-6 sm:w-6 mr-3 text-emerald-500 flex-shrink-0" />
                          <div>
                            <div className="font-semibold text-sm sm:text-base">Passbook Photo</div>
                            <div className="text-xs text-gray-500">View document</div>
                          </div>
                        </a>
                      )}
                      {land.gps_tracking?.land_border && (
                        <a
                          href={proxyUrl(land.gps_tracking.land_border)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center p-3 sm:p-4 border rounded-lg hover:bg-gray-50"
                        >
                          <ImageIcon className="h-5 w-5 sm:h-6 sm:w-6 mr-3 text-blue-500 flex-shrink-0" />
                          <div>
                            <div className="font-semibold text-sm sm:text-base">Land Border Map</div>
                            <div className="text-xs text-gray-500">View image</div>
                          </div>
                        </a>
                      )}
                      <div className="flex items-center p-3 sm:p-4 border rounded-lg">
                        <FileText className="h-5 w-5 sm:h-6 sm:w-6 mr-3 text-gray-500 flex-shrink-0" />
                        <div>
                          <div className="font-semibold text-sm sm:text-base">Land Photos</div>
                          <div className="text-xs text-gray-500">{images.length} images available</div>
                        </div>
                      </div>
                      {land.document_media?.land_video?.length > 0 && (
                        <div className="flex items-center p-3 sm:p-4 border rounded-lg">
                          <Video className="h-5 w-5 sm:h-6 sm:w-6 mr-3 text-red-500 flex-shrink-0" />
                          <div>
                            <div className="font-semibold text-sm sm:text-base">Property Video</div>
                            <div className="text-xs text-gray-500">1 video available</div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {selectedTab === "location" && (
                  <div className="space-y-4 sm:space-y-6">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900">Location Details</h3>
                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <Navigation className="h-5 w-5 mr-3 text-gray-400 flex-shrink-0" />
                        <div>
                          <div className="font-semibold text-sm sm:text-base">GPS Coordinates</div>
                          <div className="text-xs text-gray-500">
                            {land.gps_tracking?.latitude}, {land.gps_tracking?.longitude}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <Truck className="h-5 w-5 mr-3 text-gray-400 flex-shrink-0" />
                        <div>
                          <div className="font-semibold text-sm sm:text-base">Road Access</div>
                          <div className="text-xs text-gray-500">{land.gps_tracking?.road_path || 'Not specified'}</div>
                        </div>
                      </div>
                      <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <Globe className="h-5 w-5 mr-3 text-gray-400 flex-shrink-0" />
                        <div>
                          <div className="font-semibold text-sm sm:text-base">Path to Land</div>
                          <div className="text-xs text-gray-500">{land.dispute_details?.path_to_land || 'Not specified'}</div>
                        </div>
                      </div>
                      <button
                        onClick={openInMaps}
                        className="w-full sm:w-auto inline-flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-lg text-sm sm:text-base"
                      >
                        <Navigation className="h-4 w-4 mr-2" />
                        View on Google Maps
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Video Preview */}
            {land.document_media?.land_video?.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center">
                  <Video className="h-5 w-5 mr-2 text-emerald-500" />
                  Property Video
                </h3>
                <div className="aspect-video bg-black rounded-lg overflow-hidden">
                  <video
                    src={proxyUrl(land.document_media.land_video[0])}
                    controls
                    className="w-full h-full"
                    poster={proxyUrl(images[0])}
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Owner Info & Actions */}
          <div className="space-y-4 sm:space-y-6">
            {/* Owner Information */}
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center">
                <User className="h-5 w-5 mr-2 text-emerald-500" />
                Owner Information
              </h3>
              
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center">
                  <User className="h-5 w-5 mr-3 text-gray-400 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-sm sm:text-base">{land.farmer_details?.name || 'Not available'}</div>
                    <div className="text-xs text-gray-500">Owner</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-3 text-gray-400 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-sm sm:text-base">{land.farmer_details?.phone || 'Not available'}</div>
                    <div className="text-xs text-gray-500">Phone Number</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Award className="h-5 w-5 mr-3 text-gray-400 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-sm sm:text-base">{land.farmer_details?.literacy || 'Not specified'}</div>
                    <div className="text-xs text-gray-500">Education Level</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-3 text-gray-400 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-sm sm:text-base">{land.farmer_details?.age_group || 'Not specified'}</div>
                    <div className="text-xs text-gray-500">Age Group</div>
                  </div>
                </div>
              </div>
              
              <button className="w-full mt-4 sm:mt-6 bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 sm:py-3 rounded-lg font-semibold transition-colors text-sm sm:text-base">
                Contact Owner
              </button>
            </div>

            {/* Dispute Information */}
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center">
                <AlertCircle className="h-5 w-5 mr-2 text-gray-500" />
                Legal Status
              </h3>
              
              <div className="space-y-3 sm:space-y-4">
                <div className={`flex items-center p-3 rounded-lg ${land.dispute_details?.dispute_type === 'None' ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}`}>
                  <AlertCircle className="h-5 w-5 mr-3 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-sm sm:text-base">Dispute Status</div>
                    <div className="text-xs sm:text-sm">{land.dispute_details?.dispute_type || 'Not specified'}</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Shield className="h-5 w-5 mr-3 text-gray-400 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-sm sm:text-base">Land Ownership</div>
                    <div className="text-xs text-gray-500">{land.farmer_details?.land_ownership || 'Not specified'}</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-3 text-gray-400 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-sm sm:text-base">Mortgage</div>
                    <div className="text-xs text-gray-500">{land.farmer_details?.mortgage || 'Not specified'}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Quick Actions</h3>
              
              <div className="space-y-2 sm:space-y-3">
                <button className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-2.5 sm:py-3 rounded-lg font-semibold transition-colors text-sm sm:text-base">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Site Visit
                </button>
                
                <button className="w-full flex items-center justify-center border border-emerald-600 text-emerald-600 hover:bg-emerald-50 py-2.5 sm:py-3 rounded-lg font-semibold transition-colors text-sm sm:text-base">
                  <Download className="h-4 w-4 mr-2" />
                  Download Brochure
                </button>
                
                <button className="w-full flex items-center justify-center border border-gray-300 text-gray-700 hover:bg-gray-50 py-2.5 sm:py-3 rounded-lg font-semibold transition-colors text-sm sm:text-base">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Property
                </button>

                <button className="w-full flex items-center justify-center border border-gray-300 text-gray-700 hover:bg-gray-50 py-2.5 sm:py-3 rounded-lg font-semibold transition-colors text-sm sm:text-base">
                  <Printer className="h-4 w-4 mr-2" />
                  Print Details
                </button>
              </div>
            </div>

            {/* Desktop Action Buttons */}
            <div className="hidden md:flex items-center space-x-2">
              <button className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-50 py-2.5 rounded-lg font-semibold transition-colors text-sm">
                <Heart className="h-4 w-4 inline mr-2" />
                Save
              </button>
              <button 
                onClick={shareProperty}
                className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-50 py-2.5 rounded-lg font-semibold transition-colors text-sm"
              >
                <Share2 className="h-4 w-4 inline mr-2" />
                Share
              </button>
              <button className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-50 py-2.5 rounded-lg font-semibold transition-colors text-sm">
                <ExternalLink className="h-4 w-4 inline mr-2" />
                Report
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Floating Action Button for Mobile */}
        <div className="md:hidden fixed bottom-6 right-6">
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white p-3 rounded-full shadow-lg">
            <Phone className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};