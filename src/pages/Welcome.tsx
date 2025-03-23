
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthForm from '@/components/auth/AuthForm';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Welcome = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="relative w-full h-[40vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/60 to-amber-800/60 z-10" />
        <img
          src="https://images.unsplash.com/photo-1504113888839-1c8eb50233d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
          alt="Delicious waffles"
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        <div className="relative z-20 h-full flex flex-col items-center justify-center text-white px-6 text-center">
          <h1 className="text-4xl font-display font-bold mt-8 animate-fade-in">
            Drizzle n Crunch
          </h1>
          <p className="mt-2 max-w-md text-white/90 animate-fade-in" style={{ animationDelay: '100ms' }}>
            Handcrafted waffles & pancakes made with love
          </p>
        </div>
      </div>
      
      {/* Auth Section */}
      <div className="flex-1 flex flex-col items-center px-6 py-8 bg-white rounded-t-3xl -mt-6 relative z-30">
        <div className="w-full max-w-md animate-slide-up">
          <Tabs 
            defaultValue={activeTab} 
            onValueChange={(value) => setActiveTab(value as 'login' | 'signup')}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login" className="mt-0">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">Welcome Back!</h2>
                <p className="text-gray-500 mt-2">Login to continue your waffle journey</p>
              </div>
              <AuthForm type="login" />
            </TabsContent>
            
            <TabsContent value="signup" className="mt-0">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">Join Us!</h2>
                <p className="text-gray-500 mt-2">Sign up to start earning DC coins</p>
              </div>
              <AuthForm type="signup" />
            </TabsContent>
          </Tabs>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              By continuing, you agree to our{' '}
              <Link to="#" className="text-dc-amber hover:underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="#" className="text-dc-amber hover:underline">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
