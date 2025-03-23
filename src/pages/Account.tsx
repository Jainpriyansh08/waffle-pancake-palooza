
import React from 'react';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/context/AuthContext';
import { useUser } from '@/context/UserContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  User, History, Award, MapPin, Info, 
  HelpCircle, Share2, Facebook, Instagram, Twitter,
  LogOut
} from 'lucide-react';
import LoyaltyBadge from '@/components/ui/LoyaltyBadge';

const Account: React.FC = () => {
  const { logout } = useAuth();
  const { profile, getBadge } = useUser();
  
  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };
  
  const sections = [
    { id: 'history', icon: <History className="h-5 w-5" />, title: 'Order History' },
    { id: 'rewards', icon: <Award className="h-5 w-5" />, title: 'My Rewards' },
    { id: 'stores', icon: <MapPin className="h-5 w-5" />, title: 'Our Stores' },
    { id: 'program', icon: <Info className="h-5 w-5" />, title: 'Rewards Program Info' },
    { id: 'about', icon: <Info className="h-5 w-5" />, title: 'About Us' },
    { id: 'help', icon: <HelpCircle className="h-5 w-5" />, title: 'Help & FAQ' },
    { id: 'share', icon: <Share2 className="h-5 w-5" />, title: 'Share This App' },
  ];

  return (
    <Layout>
      <div className="pb-20 px-4 max-w-lg mx-auto">
        {/* Profile Header */}
        <Card className="mb-6 overflow-hidden">
          <div className="bg-gradient-to-r from-amber-500 to-orange-400 p-4">
            <div className="flex items-center">
              <div className="bg-white rounded-full p-3 mr-4">
                <User className="h-8 w-8 text-amber-500" />
              </div>
              <div className="text-white">
                <h2 className="text-xl font-bold">{profile?.name || 'User'}</h2>
                <p className="text-sm opacity-90">{profile?.email || ''}</p>
              </div>
            </div>
          </div>
          
          <div className="p-4 flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Your DC Coins</p>
              <p className="text-2xl font-bold text-amber-600">{profile?.dcCoins || 0}</p>
            </div>
            
            {getBadge() !== 'none' && (
              <LoyaltyBadge type={getBadge()} />
            )}
          </div>
        </Card>
        
        {/* Account Sections */}
        <div className="space-y-3 mb-8">
          {sections.map(section => (
            <Card 
              key={section.id}
              className="flex items-center p-4 hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <div className="text-amber-500 mr-3">
                {section.icon}
              </div>
              <span className="text-gray-800">{section.title}</span>
            </Card>
          ))}
        </div>
        
        {/* Social Media */}
        <div className="mb-8">
          <h3 className="text-sm font-medium text-gray-500 mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="bg-blue-500 text-white p-2 rounded-full">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="#" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-2 rounded-full">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" className="bg-blue-400 text-white p-2 rounded-full">
              <Twitter className="h-5 w-5" />
            </a>
          </div>
        </div>
        
        {/* Logout Button */}
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full border-red-300 text-red-500 hover:bg-red-50 hover:text-red-600"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </Layout>
  );
};

export default Account;
