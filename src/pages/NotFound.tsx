import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { MapPin, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="w-20 h-20 bg-navy rounded-2xl flex items-center justify-center mx-auto mb-6">
          <MapPin className="w-10 h-10 text-orange-brand" />
        </div>
        <h1 className="text-6xl font-bold text-navy mb-4">404</h1>
        <p className="text-xl text-gray-500 mb-8">Oops! This route doesn't exist.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 btn-primary"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to KMD Travels
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
