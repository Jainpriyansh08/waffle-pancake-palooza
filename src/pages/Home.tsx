
import React from 'react';
import { useUser } from '@/context/UserContext';
import { MapPin, Star } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import Badge from '@/components/ui/Badge';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

const stores = [
  {
    id: 1,
    name: 'Drizzle n Crunch - City Center',
    address: '123 Main Street, City Center',
    distance: '0.8 km',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 2,
    name: 'Drizzle n Crunch - South Point',
    address: '456 Park Avenue, South Point',
    distance: '1.2 km',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 3,
    name: 'Drizzle n Crunch - East End',
    address: '789 Broadway, East End',
    distance: '2.5 km',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80'
  }
];

const featuredItems = [
  {
    id: 1,
    name: 'Chocolate Dream Waffle',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 2,
    name: 'Berry Bliss Pancakes',
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 3,
    name: 'Banana Caramel Waffle',
    image: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 4,
    name: 'Classic Buttermilk Pancakes',
    image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80'
  }
];

const Home = () => {
  const { profile, getBadge } = useUser();
  const badgeType = getBadge();
  
  return (
    <Layout>
      <div className="container pb-8 pt-6">
        {/* Header with loyalty information */}
        <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Welcome, {profile?.name?.split(' ')[0] || 'there'}!
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Your DC Coins: <span className="font-medium text-dc-amber">{profile?.dcCoins || 0}</span>
              </p>
            </div>
            
            {badgeType !== 'none' && (
              <Badge type={badgeType} />
            )}
          </div>
        </div>
        
        {/* Featured items section */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Featured Delights</h2>
          
          <div className="grid grid-cols-2 gap-4">
            {featuredItems.map((item, index) => (
              <div 
                key={item.id}
                className={cn(
                  "relative rounded-xl overflow-hidden shadow-sm h-40",
                  "animate-fade-in"
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-3 z-20">
                  <h3 className="text-white text-sm font-medium">{item.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        <Separator className="my-6" />
        
        {/* Nearby stores section */}
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Nearby Stores</h2>
          
          <div className="space-y-4">
            {stores.map((store, index) => (
              <div 
                key={store.id} 
                className={cn(
                  "bg-white rounded-xl overflow-hidden shadow-sm flex animate-fade-in",
                  "hover-scale"
                )}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="w-24 h-24 flex-shrink-0">
                  <img 
                    src={store.image} 
                    alt={store.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1 p-3">
                  <h3 className="font-medium text-gray-800">{store.name}</h3>
                  
                  <div className="flex items-center mt-1 text-xs text-gray-500">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span>{store.address}</span>
                  </div>
                  
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs font-medium bg-dc-amber/10 text-dc-amber rounded-full px-2 py-0.5">
                      {store.distance}
                    </span>
                    
                    <div className="flex items-center text-xs">
                      <Star className="h-3 w-3 text-yellow-400 mr-1 fill-yellow-400" />
                      <span>{store.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Home;
