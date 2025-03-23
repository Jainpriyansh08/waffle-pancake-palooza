
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  LogOut, 
  ChevronRight, 
  Medal, 
  Clock, 
  MapPin, 
  Info, 
  HelpCircle, 
  Share2, 
  Facebook, 
  Instagram 
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useUser } from '@/context/UserContext';
import Layout from '@/components/layout/Layout';
import Badge from '@/components/ui/Badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

const AccountItem = ({ 
  icon: Icon, 
  label, 
  onClick 
}: { 
  icon: React.ElementType; 
  label: string; 
  onClick?: () => void;
}) => (
  <button
    className="flex items-center justify-between w-full px-4 py-3 hover:bg-gray-50 transition-colors"
    onClick={onClick}
  >
    <div className="flex items-center">
      <Icon className="h-5 w-5 text-gray-500 mr-3" />
      <span className="text-gray-700">{label}</span>
    </div>
    <ChevronRight className="h-4 w-4 text-gray-400" />
  </button>
);

const Account = () => {
  const { user, logout } = useAuth();
  const { profile, getBadge } = useUser();
  const navigate = useNavigate();
  
  // Redirect if not authenticated
  React.useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  if (!user || !profile) return null;

  const badgeType = getBadge();
  
  const handleShareApp = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Drizzle n Crunch',
        text: 'Check out this amazing waffle and pancake shop app!',
        url: window.location.origin
      }).catch(error => {
        toast.error('Error sharing app');
      });
    } else {
      toast.success('App link copied to clipboard!', {
        description: 'Share it with your friends!'
      });
    }
  };

  return (
    <Layout>
      <div className="container py-6 pb-24">
        {/* Profile Header */}
        <div className="bg-white rounded-xl p-4 shadow-sm mb-6 animate-fade-in">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-dc-amber rounded-full flex items-center justify-center text-white text-xl font-bold">
              {profile.name.charAt(0)}
            </div>
            
            <div className="ml-4">
              <h2 className="text-lg font-semibold text-gray-800">{profile.name}</h2>
              <p className="text-sm text-gray-500">{user.phoneNumber}</p>
              {badgeType !== 'none' && (
                <div className="mt-2">
                  <Badge type={badgeType} showLabel={true} />
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Account Options */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden animate-fade-in">
          <div className="divide-y divide-gray-100">
            <AccountItem 
              icon={Clock} 
              label="Order History" 
              onClick={() => toast.info('Order History coming soon!')}
            />
            
            <AccountItem 
              icon={Medal} 
              label="My Rewards" 
              onClick={() => toast.info('My Rewards coming soon!')}
            />
            
            <AccountItem 
              icon={MapPin} 
              label="Our Stores" 
              onClick={() => toast.info('Store Locator coming soon!')}
            />
          </div>
        </div>
        
        <div className="mt-6 bg-white rounded-xl shadow-sm overflow-hidden animate-fade-in">
          <div className="divide-y divide-gray-100">
            <AccountItem 
              icon={Info} 
              label="Rewards Program Info" 
              onClick={() => toast.info('Rewards Program Info coming soon!')}
            />
            
            <AccountItem 
              icon={Info} 
              label="About Us" 
              onClick={() => toast.info('About Us coming soon!')}
            />
            
            <AccountItem 
              icon={HelpCircle} 
              label="Help & FAQ" 
              onClick={() => toast.info('Help & FAQ coming soon!')}
            />
            
            <AccountItem 
              icon={Share2} 
              label="Share This App" 
              onClick={handleShareApp}
            />
          </div>
        </div>
        
        {/* Logout Button */}
        <div className="mt-6 animate-fade-in">
          <Button
            variant="outline"
            className="w-full flex items-center justify-center text-red-500 hover:text-red-600 border-red-200 hover:border-red-300"
            onClick={() => {
              logout();
              navigate('/');
            }}
          >
            <LogOut className="h-4 w-4 mr-2" />
            <span>Logout</span>
          </Button>
        </div>
        
        {/* Social Links */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500 mb-3">Follow us on</p>
          <div className="flex justify-center space-x-4">
            <Link 
              to="#" 
              className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white hover:bg-blue-700 transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="h-5 w-5" />
            </Link>
            <Link 
              to="#" 
              className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-white hover:from-purple-700 hover:to-pink-600 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </Link>
          </div>
          
          <p className="text-xs text-gray-400 mt-6">
            Drizzle n Crunch &copy; {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Account;
