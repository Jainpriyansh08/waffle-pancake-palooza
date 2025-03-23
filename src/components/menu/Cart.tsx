
import React, { useState } from 'react';
import { ShoppingBag, X, Plus, Minus, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useUser } from '@/context/UserContext';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface CartProps {
  className?: string;
}

const Cart: React.FC<CartProps> = ({ className }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { items, updateQuantity, removeItem, getTotal, clearCart } = useCart();
  const { addDcCoins, getCoinsPerOrder } = useUser();
  
  const toggleExpand = () => setIsExpanded(!isExpanded);
  
  const handlePlaceOrder = () => {
    if (items.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }
    
    const coinsEarned = getCoinsPerOrder();
    addDcCoins(coinsEarned);
    clearCart();
    
    toast.success(`Order placed successfully! You earned ${coinsEarned} DC coins.`, {
      description: "Your order is being prepared.",
    });
    
    setIsExpanded(false);
  };

  if (items.length === 0 && !isExpanded) {
    return (
      <Button
        onClick={toggleExpand}
        className={cn(
          "fixed bottom-24 right-4 w-14 h-14 rounded-full bg-dc-amber hover:bg-dc-caramel shadow-lg flex items-center justify-center",
          "transition-all duration-300 z-50",
          className
        )}
      >
        <ShoppingBag className="h-6 w-6 text-white" />
      </Button>
    );
  }

  return (
    <div
      className={cn(
        "fixed bottom-24 right-4 z-50 w-[calc(100%-2rem)] sm:w-96 max-h-[70vh] rounded-lg shadow-xl",
        "bg-white border border-gray-200 transition-all duration-300",
        isExpanded ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none",
        className
      )}
    >
      <div className="p-4 bg-dc-amber text-white rounded-t-lg flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <ShoppingBag className="h-5 w-5" />
          <h3 className="font-semibold">Your Cart</h3>
        </div>
        <Button
          onClick={toggleExpand}
          variant="ghost"
          size="sm"
          className="text-white hover:bg-white/20 p-1 h-auto rounded-full"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="overflow-y-auto max-h-[calc(70vh-10rem)] p-4">
        {items.length === 0 ? (
          <div className="text-center py-8">
            <ShoppingBag className="h-12 w-12 mx-auto text-gray-300" />
            <p className="mt-4 text-gray-500">Your cart is empty</p>
          </div>
        ) : (
          <ul className="space-y-4">
            {items.map((item) => (
              <li key={item.id} className="flex items-center space-x-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-16 w-16 rounded-lg object-cover"
                />
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-800 truncate">{item.name}</h4>
                  <p className="text-sm text-gray-500">₹{item.price} each</p>
                </div>
                
                <div className="flex items-center space-x-1">
                  <Button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    variant="outline"
                    className="h-7 w-7 p-0 rounded-full"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  
                  <span className="w-6 text-center text-sm">{item.quantity}</span>
                  
                  <Button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    variant="outline"
                    className="h-7 w-7 p-0 rounded-full"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      {items.length > 0 && (
        <>
          <Separator />
          <div className="p-4 space-y-4">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Subtotal</span>
              <span className="font-medium">₹{getTotal()}</span>
            </div>
            
            <div className="flex justify-between text-dc-amber">
              <span className="font-medium">You will earn</span>
              <span className="font-medium">{getCoinsPerOrder()} DC Coins</span>
            </div>
            
            <Button
              onClick={handlePlaceOrder}
              className="w-full bg-dc-amber hover:bg-dc-caramel flex items-center justify-center space-x-2 btn-shine"
            >
              <span>Place Order</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
