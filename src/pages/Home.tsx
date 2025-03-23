
import React, { useEffect, useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { useUser } from '@/context/UserContext';
import { Card } from '@/components/ui/card';
import { MapPin, Award } from 'lucide-react';
import Badge from '@/components/ui/Badge';

const Home: React.FC = () => {
  const { profile, getBadge } = useUser();
  const [stores, setStores] = useState([
    {
      id: 1,
      name: 'Drizzle n Crunch - Downtown',
      address: '123 Main Street, Downtown',
      distance: '0.5 km',
      image: '/placeholder.svg',
    },
    {
      id: 2,
      name: 'Drizzle n Crunch - Westside',
      address: '456 Maple Avenue, Westside',
      distance: '1.2 km',
      image: '/placeholder.svg',
    },
    {
      id: 3,
      name: 'Drizzle n Crunch - Uptown',
      address: '789 Oak Boulevard, Uptown',
      distance: '2.3 km',
      image: '/placeholder.svg',
    },
  ]);

  const [featuredItems, setFeaturedItems] = useState([
    {
      id: 'feat1',
      name: 'Chocolate Overload Waffles',
      image: '/placeholder.svg',
      description: 'Crispy waffles topped with rich chocolate sauce and chocolate chips',
    },
    {
      id: 'feat2',
      name: 'Fruit Blast Pancakes',
      image: '/placeholder.svg',
      description: 'Fluffy pancakes loaded with fresh seasonal fruits and maple syrup',
    },
    {
      id: 'feat3',
      name: 'Caramel Dream Waffle',
      image: '/placeholder.svg',
      description: 'Golden waffles drizzled with salted caramel and topped with whipped cream',
    },
  ]);

  return (
    <Layout>
      <div className="pb-20 px-4 max-w-lg mx-auto">
        {/* User Greeting & Rewards */}
        <div className="mb-6 bg-gradient-to-r from-orange-100 to-amber-100 p-4 rounded-lg shadow-sm border border-amber-200">
          <h2 className="text-xl font-bold text-amber-800">
            Welcome back, {profile?.name || 'Friend'}!
          </h2>
          
          <div className="flex items-center justify-between mt-3">
            <div>
              <p className="text-sm text-amber-700">Your DC Coins</p>
              <p className="text-2xl font-bold text-amber-600">{profile?.dcCoins || 0}</p>
            </div>
            
            {getBadge() !== 'none' && (
              <Badge type={getBadge()} className="shadow-md" />
            )}
          </div>
        </div>
        
        {/* Nearby Stores */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-3 text-gray-800 flex items-center">
            <MapPin className="h-5 w-5 mr-1 text-amber-500" />
            Nearby Stores
          </h2>
          
          <div className="space-y-3">
            {stores.map(store => (
              <Card key={store.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="flex">
                  <div className="w-24 h-24">
                    <img 
                      src={store.image} 
                      alt={store.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-amber-700">{store.name}</h3>
                    <p className="text-xs text-gray-500">{store.address}</p>
                    <p className="text-xs font-medium text-amber-500 mt-1">{store.distance} away</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Featured Items */}
        <div>
          <h2 className="text-lg font-semibold mb-3 text-gray-800">
            Featured Treats
          </h2>
          
          <div className="grid grid-cols-1 gap-4">
            {featuredItems.map(item => (
              <div 
                key={item.id} 
                className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-3">
                  <h3 className="font-medium text-amber-700">{item.name}</h3>
                  <p className="text-xs text-gray-600 mt-1">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
