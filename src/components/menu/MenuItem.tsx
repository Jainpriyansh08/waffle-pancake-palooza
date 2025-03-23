
import React from 'react';
import { Plus } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface MenuItemProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  className?: string;
}

const MenuItem: React.FC<MenuItemProps> = ({
  id,
  name,
  description,
  price,
  image,
  category,
  className
}) => {
  const { addItem } = useCart();
  
  const handleAddToCart = () => {
    addItem({ id, name, description, price, image, category });
  };

  return (
    <div 
      className={cn(
        "bg-white rounded-xl shadow-md overflow-hidden hover-scale",
        "border border-gray-100 transition-all duration-300",
        "animate-fade-in",
        className
      )}
    >
      <div className="relative h-40 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <span className="absolute top-2 right-2 bg-white/90 text-dc-amber px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
          ₹{price}
        </span>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{description}</p>
        
        <div className="flex justify-between items-center mt-4">
          <span className="text-xs font-medium py-1 px-2 bg-gray-100 rounded-full text-gray-600">
            {category}
          </span>
          
          <Button
            onClick={handleAddToCart}
            className="flex items-center space-x-1 bg-dc-amber hover:bg-dc-caramel text-white rounded-full p-2 transition-colors"
            aria-label={`Add ${name} to cart`}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
