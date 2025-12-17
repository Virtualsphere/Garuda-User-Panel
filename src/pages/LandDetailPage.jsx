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
  Image as ImageIcon
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Error Loading Land Details</h3>
          <p className="text-gray-600 mb-4">{error || 'Land not found'}</p>
          <div className="flex gap-4 justify-center">
            <button 
              onClick={() => navigate('/land')}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              Back to Listings
            </button>
            <button 
              onClick={fetchLandDetails}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
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
      {/* Navigation */}
      <nav className="bg-white shadow-sm px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => navigate('/land')}
              className="flex items-center text-gray-600 hover:text-emerald-600"
            >
              <ChevronLeft className="h-5 w-5 mr-1" />
              Back to Listings
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <Compass className="h-8 w-8 text-emerald-500" />
            <span className="text-xl font-bold text-black">GARUDA</span>
            <span className="text-emerald-500 font-bold">LANDS</span>
          </div>
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
            Contact Owner
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Property Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {getLandTypeLabel(land.land_details.land_type)} - {land.land_details.land_area}
              </h1>
              <div className="flex items-center text-gray-600">
                <MapPin className="h-5 w-5 mr-2 flex-shrink-0" />
                <span>{formatLocation(land.land_location)}</span>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="text-2xl font-bold text-emerald-600">
                {formatPrice(land.land_details.total_land_price)}
              </div>
              <div className="text-sm text-gray-500">
                {formatPrice(land.land_details.price_per_acre)} per acre
              </div>
            </div>
          </div>

          {/* Verification Badge */}
          <div className="inline-flex items-center bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full">
            <Shield className="h-4 w-4 mr-2" />
            <span className="font-semibold">Verified Property</span>
            <CheckCircle className="h-4 w-4 ml-2" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images & Tabs */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
              <div className="relative h-96">
                <img
                  src={currentImage}
                  alt="Land"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200';
                  }}
                />
                
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                  </>
                )}
                
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-white/50'}`}
                    />
                  ))}
                </div>
              </div>
              
              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="p-4 grid grid-cols-4 gap-2">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative h-20 rounded-lg overflow-hidden ${index === currentImageIndex ? 'ring-2 ring-emerald-500' : ''}`}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Video Preview */}
            {land.document_media?.land_video?.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Video className="h-5 w-5 mr-2 text-emerald-500" />
                  Property Video
                </h3>
                <div className="aspect-video bg-black rounded-lg overflow-hidden">
                  <video
                    src={land.document_media.land_video[0]}
                    controls
                    className="w-full h-full"
                    poster={images[0]}
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            )}

            {/* Tab Navigation */}
            <div className="bg-white rounded-xl shadow-sm mb-8">
              <div className="border-b">
                <div className="flex space-x-8 px-6">
                  {["overview", "features", "documents", "location"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setSelectedTab(tab)}
                      className={`py-4 px-2 font-medium text-sm border-b-2 transition-colors ${selectedTab === tab ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {selectedTab === "overview" && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-900">Property Overview</h3>
                    <p className="text-gray-600">
                      This {land.land_details.land_area.toLowerCase()} {getLandTypeLabel(land.land_details.land_type).toLowerCase()} 
                      is located in the prime area of {land.land_location?.village}, {land.land_location?.district}. 
                      The property features excellent connectivity and is suitable for various purposes.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center">
                        <Ruler className="h-5 w-5 mr-3 text-gray-400" />
                        <div>
                          <div className="text-sm text-gray-500">Land Area</div>
                          <div className="font-semibold">{land.land_details.land_area}</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Droplets className="h-5 w-5 mr-3 text-blue-400" />
                        <div>
                          <div className="text-sm text-gray-500">Water Source</div>
                          <div className="font-semibold">{land.land_details.water_source || 'Not specified'}</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Trees className="h-5 w-5 mr-3 text-green-400" />
                        <div>
                          <div className="text-sm text-gray-500">Garden</div>
                          <div className="font-semibold">{land.land_details.garden || 'No'}</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Home className="h-5 w-5 mr-3 text-orange-400" />
                        <div>
                          <div className="text-sm text-gray-500">Residential</div>
                          <div className="font-semibold">{land.land_details.residental || 'No'}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedTab === "features" && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-900">Property Features</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center">
                        <div className={`p-2 rounded-lg mr-3 ${land.land_details.fencing === 'Complete' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}`}>
                          <Shield className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="font-semibold">Fencing</div>
                          <div className="text-sm text-gray-500">{land.land_details.fencing || 'Not available'}</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className={`p-2 rounded-lg mr-3 ${land.land_details.farm_pond === 'Yes' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
                          <Droplets className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="font-semibold">Farm Pond</div>
                          <div className="text-sm text-gray-500">{land.land_details.farm_pond || 'No'}</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="p-2 rounded-lg mr-3 bg-gray-100 text-gray-600">
                          <Factory className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="font-semibold">Shed Details</div>
                          <div className="text-sm text-gray-500">{land.land_details.shed_details || 'Not available'}</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="p-2 rounded-lg mr-3 bg-gray-100 text-gray-600">
                          <Truck className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="font-semibold">Road Access</div>
                          <div className="text-sm text-gray-500">{land.gps_tracking?.road_path || 'Not specified'}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedTab === "documents" && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-900">Documents & Media</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {land.land_details.passbook_photo && (
                        <a
                          href={land.land_details.passbook_photo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center p-4 border rounded-lg hover:bg-gray-50"
                        >
                          <CreditCard className="h-8 w-8 mr-3 text-emerald-500" />
                          <div>
                            <div className="font-semibold">Passbook Photo</div>
                            <div className="text-sm text-gray-500">View document</div>
                          </div>
                        </a>
                      )}
                      {land.gps_tracking?.land_border && (
                        <a
                          href={land.gps_tracking.land_border}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center p-4 border rounded-lg hover:bg-gray-50"
                        >
                          <ImageIcon className="h-8 w-8 mr-3 text-blue-500" />
                          <div>
                            <div className="font-semibold">Land Border Map</div>
                            <div className="text-sm text-gray-500">View image</div>
                          </div>
                        </a>
                      )}
                      <div className="flex items-center p-4 border rounded-lg">
                        <FileText className="h-8 w-8 mr-3 text-gray-500" />
                        <div>
                          <div className="font-semibold">Land Photos</div>
                          <div className="text-sm text-gray-500">{images.length} images available</div>
                        </div>
                      </div>
                      {land.document_media?.land_video?.length > 0 && (
                        <div className="flex items-center p-4 border rounded-lg">
                          <Video className="h-8 w-8 mr-3 text-red-500" />
                          <div>
                            <div className="font-semibold">Property Video</div>
                            <div className="text-sm text-gray-500">1 video available</div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {selectedTab === "location" && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-900">Location Details</h3>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <Navigation className="h-5 w-5 mr-3 text-gray-400" />
                        <div>
                          <div className="font-semibold">GPS Coordinates</div>
                          <div className="text-sm text-gray-500">
                            {land.gps_tracking?.latitude}, {land.gps_tracking?.longitude}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Truck className="h-5 w-5 mr-3 text-gray-400" />
                        <div>
                          <div className="font-semibold">Road Access</div>
                          <div className="text-sm text-gray-500">{land.gps_tracking?.road_path || 'Not specified'}</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Globe className="h-5 w-5 mr-3 text-gray-400" />
                        <div>
                          <div className="font-semibold">Path to Land</div>
                          <div className="text-sm text-gray-500">{land.dispute_details?.path_to_land || 'Not specified'}</div>
                        </div>
                      </div>
                      <button
                        onClick={openInMaps}
                        className="inline-flex items-center bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg"
                      >
                        <Navigation className="h-4 w-4 mr-2" />
                        View on Google Maps
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Owner Info & Actions */}
          <div className="space-y-6">
            {/* Owner Information */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <User className="h-5 w-5 mr-2 text-emerald-500" />
                Owner Information
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <User className="h-5 w-5 mr-3 text-gray-400" />
                  <div>
                    <div className="font-semibold">{land.farmer_details?.name || 'Not available'}</div>
                    <div className="text-sm text-gray-500">Owner</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-3 text-gray-400" />
                  <div>
                    <div className="font-semibold">{land.farmer_details?.phone || 'Not available'}</div>
                    <div className="text-sm text-gray-500">Phone Number</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Award className="h-5 w-5 mr-3 text-gray-400" />
                  <div>
                    <div className="font-semibold">{land.farmer_details?.literacy || 'Not specified'}</div>
                    <div className="text-sm text-gray-500">Education Level</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-3 text-gray-400" />
                  <div>
                    <div className="font-semibold">{land.farmer_details?.age_group || 'Not specified'}</div>
                    <div className="text-sm text-gray-500">Age Group</div>
                  </div>
                </div>
              </div>
              
              <button className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-semibold transition-colors">
                Contact Owner
              </button>
            </div>

            {/* Dispute Information */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <AlertCircle className="h-5 w-5 mr-2 text-gray-500" />
                Legal Status
              </h3>
              
              <div className="space-y-4">
                <div className={`flex items-center p-3 rounded-lg ${land.dispute_details?.dispute_type === 'None' ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}`}>
                  <AlertCircle className="h-5 w-5 mr-3" />
                  <div>
                    <div className="font-semibold">Dispute Status</div>
                    <div className="text-sm">{land.dispute_details?.dispute_type || 'Not specified'}</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Shield className="h-5 w-5 mr-3 text-gray-400" />
                  <div>
                    <div className="font-semibold">Land Ownership</div>
                    <div className="text-sm text-gray-500">{land.farmer_details?.land_ownership || 'Not specified'}</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-3 text-gray-400" />
                  <div>
                    <div className="font-semibold">Mortgage</div>
                    <div className="text-sm text-gray-500">{land.farmer_details?.mortgage || 'Not specified'}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors">
                  <Phone className="h-4 w-4 mr-2" />
                  Schedule Site Visit
                </button>
                
                <button className="w-full flex items-center justify-center border border-emerald-600 text-emerald-600 hover:bg-emerald-50 py-3 rounded-lg font-semibold transition-colors">
                  <FileText className="h-4 w-4 mr-2" />
                  Download Brochure
                </button>
                
                <button className="w-full flex items-center justify-center border border-gray-300 text-gray-700 hover:bg-gray-50 py-3 rounded-lg font-semibold transition-colors">
                  <Mail className="h-4 w-4 mr-2" />
                  Email Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};