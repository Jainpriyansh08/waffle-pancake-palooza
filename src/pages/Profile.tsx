
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileForm from '@/components/profile/ProfileForm';
import { useAuth } from '@/context/AuthContext';

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if user is not authenticated
  React.useEffect(() => {
    if (!user) {
      navigate('/');
    } else if (user.isProfileComplete) {
      navigate('/home');
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-10 pb-6 bg-dc-amber">
        <div className="container">
          <h1 className="text-2xl font-bold text-white">Complete Your Profile</h1>
          <p className="text-white/80 mt-1">Help us get to know you better</p>
        </div>
      </div>
      
      <div className="container -mt-6 bg-white rounded-t-3xl px-4 py-8 shadow-sm">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="mx-auto w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-400"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800">
              Just a few more details
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              This helps us personalize your experience
            </p>
          </div>
          
          <ProfileForm />
        </div>
      </div>
    </div>
  );
};

export default Profile;
