
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import MenuItem from '@/components/menu/MenuItem';
import Cart from '@/components/menu/Cart';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';

// Menu categories
const categories = [
  'All',
  'Waffles',
  'Pancakes',
  'Combos',
  'Beverages',
  'Extras'
];

// Menu data
const menuItems = [
  {
    id: 'w1',
    name: 'Classic Waffle',
    description: 'Our signature crispy waffle served with maple syrup and butter',
    price: 149,
    image: '/placeholder.svg',
    category: 'Waffles',
  },
  {
    id: 'w2',
    name: 'Chocolate Waffle',
    description: 'Delicious waffle topped with chocolate sauce and chocolate chips',
    price: 179,
    image: '/placeholder.svg',
    category: 'Waffles',
  },
  {
    id: 'w3',
    name: 'Fruit Waffle',
    description: 'Waffle served with fresh seasonal fruits and honey',
    price: 199,
    image: '/placeholder.svg',
    category: 'Waffles',
  },
  {
    id: 'p1',
    name: 'Classic Pancakes',
    description: 'Fluffy pancakes with maple syrup and whipped butter',
    price: 129,
    image: '/placeholder.svg',
    category: 'Pancakes',
  },
  {
    id: 'p2',
    name: 'Blueberry Pancakes',
    description: 'Soft pancakes loaded with fresh blueberries and syrup',
    price: 159,
    image: '/placeholder.svg',
    category: 'Pancakes',
  },
  {
    id: 'p3',
    name: 'Banana Pancakes',
    description: 'Pancakes with sliced bananas and caramel sauce',
    price: 169,
    image: '/placeholder.svg',
    category: 'Pancakes',
  },
  {
    id: 'c1',
    name: 'Waffle & Pancake Combo',
    description: 'Best of both worlds - one waffle and two pancakes',
    price: 249,
    image: '/placeholder.svg',
    category: 'Combos',
  },
  {
    id: 'c2',
    name: 'Family Breakfast',
    description: 'Two waffles, four pancakes, fruits and two beverages',
    price: 549,
    image: '/placeholder.svg',
    category: 'Combos',
  },
  {
    id: 'b1',
    name: 'Fresh Orange Juice',
    description: 'Freshly squeezed orange juice',
    price: 99,
    image: '/placeholder.svg',
    category: 'Beverages',
  },
  {
    id: 'b2',
    name: 'Coffee',
    description: 'Freshly brewed coffee',
    price: 79,
    image: '/placeholder.svg',
    category: 'Beverages',
  },
  {
    id: 'e1',
    name: 'Whipped Cream',
    description: 'Extra serving of whipped cream',
    price: 39,
    image: '/placeholder.svg',
    category: 'Extras',
  },
  {
    id: 'e2',
    name: 'Chocolate Sauce',
    description: 'Extra chocolate sauce for your waffle or pancake',
    price: 29,
    image: '/placeholder.svg',
    category: 'Extras',
  },
];

const Order: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cartOpen, setCartOpen] = useState(false);
  const { getTotalItems } = useCart();
  
  // Filter menu items based on selected category
  const filteredItems = selectedCategory === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  return (
    <Layout>
      <div className="pb-20 px-4 max-w-lg mx-auto">
        {/* Categories */}
        <div className="mb-4 overflow-x-auto hide-scrollbar">
          <div className="flex space-x-2 pb-2">
            {categories.map(category => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`whitespace-nowrap ${
                  selectedCategory === category 
                    ? "bg-amber-500 hover:bg-amber-600" 
                    : "text-amber-600 border-amber-300 hover:bg-amber-50"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Menu Items */}
        <div className="grid grid-cols-1 gap-4 mb-20">
          {filteredItems.map((item, index) => (
            <MenuItem
              key={item.id}
              id={item.id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
              category={item.category}
              className={`animate-fade-in`}
            />
          ))}
        </div>
        
        {/* Cart Button */}
        <Button
          onClick={() => setCartOpen(true)}
          className="fixed bottom-20 right-4 bg-amber-500 hover:bg-amber-600 text-white rounded-full shadow-lg p-3 z-10"
        >
          <ShoppingBag className="h-6 w-6" />
          {getTotalItems() > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {getTotalItems()}
            </span>
          )}
        </Button>
        
        {/* Cart Drawer */}
        <Cart open={cartOpen} onClose={() => setCartOpen(false)} />
      </div>
    </Layout>
  );
};

export default Order;
