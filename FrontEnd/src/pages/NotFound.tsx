import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "Service not available. User attempted to access:",
      location.pathname
    );

    // Redirect after 3 seconds
    const timer = setTimeout(() => {
      navigate("/");
    }, 3000);

    return () => clearTimeout(timer);
  }, [location.pathname, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 text-red-600">
          Service Unavailable
        </h1>
        <p className="text-lg text-gray-700 mb-4">
          This service is not available right now. Please explore other services.
        </p>
        <p className="text-gray-500 text-sm">
          Redirecting you to the Home page...
        </p>
      </div>
    </div>
  );
};

export default NotFound;
