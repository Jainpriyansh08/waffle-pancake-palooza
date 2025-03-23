
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import MenuItem from '@/components/menu/MenuItem';
import Cart from '@/components/menu/Cart';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Sample menu data
const menuItems = [
  {
    id: 'waffle-1',
    name: 'Classic Belgian Waffle',
    description: 'Traditional Belgian waffle topped with butter and maple syrup',
    price: 180,
    image: 'https://images.unsplash.com/photo-1562376552-0d160a2f35ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    category: 'Waffles'
  },
  {
    id: 'waffle-2',
    name: 'Chocolate Lover Waffle',
    description: 'Belgian waffle topped with chocolate sauce, chocolate chips, and whipped cream',
    price: 230,
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    category: 'Waffles'
  },
  {
    id: 'waffle-3',
    name: 'Fruit Delight Waffle',
    description: 'Belgian waffle topped with fresh seasonal fruits and a drizzle of honey',
    price: 250,
    image: 'https://images.unsplash.com/photo-1562376552-997671fe504e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    category: 'Waffles'
  },
  {
    id: 'waffle-4',
    name: 'Banana Caramel Waffle',
    description: 'Belgian waffle topped with caramelized bananas and salted caramel sauce',
    price: 270,
    image: 'https://images.unsplash.com/photo-1562376552-823060c84ddb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    category: 'Waffles'
  },
  {
    id: 'pancake-1',
    name: 'Classic Buttermilk Pancakes',
    description: 'Fluffy buttermilk pancakes served with butter and maple syrup',
    price: 160,
    image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    category: 'Pancakes'
  },
  {
    id: 'pancake-2',
    name: 'Blueberry Pancakes',
    description: 'Buttermilk pancakes packed with fresh blueberries and topped with blueberry compote',
    price: 210,
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    category: 'Pancakes'
  },
  {
    id: 'pancake-3',
    name: 'Chocolate Chip Pancakes',
    description: 'Buttermilk pancakes loaded with chocolate chips and topped with chocolate sauce',
    price: 220,
    image: 'https://images.unsplash.com/photo-1541288097308-7b8e3f58c4c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    category: 'Pancakes'
  },
  {
    id: 'beverage-1',
    name: 'Fresh Orange Juice',
    description: 'Freshly squeezed orange juice',
    price: 120,
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    category: 'Beverages'
  },
  {
    id: 'beverage-2',
    name: 'Classic Coffee',
    description: 'Freshly brewed premium coffee',
    price: 150,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    category: 'Beverages'
  }
];

const Order = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'waffles' | 'pancakes' | 'beverages'>('all');
  
  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           item.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = activeCategory === 'all' || 
                            item.category.toLowerCase() === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      <div className="container py-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Our Menu</h1>
        
        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search menu..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        {/* Category Tabs */}
        <Tabs 
          defaultValue="all" 
          value={activeCategory}
          onValueChange={(value) => setActiveCategory(value as any)}
          className="mb-6"
        >
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="waffles">Waffles</TabsTrigger>
            <TabsTrigger value="pancakes">Pancakes</TabsTrigger>
            <TabsTrigger value="beverages">Drinks</TabsTrigger>
          </TabsList>
        </Tabs>
        
        {/* Menu Items */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No items found matching your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-8">
            {filteredItems.map((item, index) => (
              <MenuItem 
                key={item.id} 
                {...item} 
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Floating Cart */}
      <Cart />
    </Layout>
  );
};

export default Order;
