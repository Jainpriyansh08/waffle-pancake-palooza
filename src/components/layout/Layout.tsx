
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, User } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const { getTotalItems } = useCart();
  const cartItemCount = getTotalItems();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-1 pb-20">
        {children}
      </main>
      
      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg animate-slide-up">
        <div className="grid grid-cols-3 h-16">
          <NavLink 
            to="/home" 
            className={({ isActive }) => 
              `bottom-nav-item ${isActive ? 'text-dc-amber' : 'text-gray-500'}`
            }
          >
            <Home className="h-6 w-6" />
            <span>Home</span>
          </NavLink>
          
          <NavLink 
            to="/order" 
            className={({ isActive }) => 
              `bottom-nav-item ${isActive ? 'text-dc-amber' : 'text-gray-500'} relative`
            }
          >
            <div className="relative">
              <ShoppingBag className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-dc-amber text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-scale-in">
                  {cartItemCount}
                </span>
              )}
            </div>
            <span>Order</span>
          </NavLink>
          
          <NavLink 
            to="/account" 
            className={({ isActive }) => 
              `bottom-nav-item ${isActive ? 'text-dc-amber' : 'text-gray-500'}`
            }
          >
            <User className="h-6 w-6" />
            <span>Account</span>
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default Layout;
