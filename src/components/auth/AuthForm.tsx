
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface AuthFormProps {
  type: 'login' | 'signup';
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const { login, signup, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!phoneNumber || phoneNumber.length < 10) {
      setError('Please enter a valid phone number');
      return;
    }
    
    try {
      if (type === 'login') {
        await login(phoneNumber);
        navigate('/home');
      } else {
        await signup(phoneNumber);
        navigate('/profile');
      }
    } catch (err) {
      setError('Authentication failed. Please try again.');
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setPhoneNumber(value);
    if (error) setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-sm animated-entry">
      <div className="space-y-2">
        <label 
          htmlFor="phoneNumber" 
          className="block text-sm font-medium text-gray-700"
        >
          Mobile Number
        </label>
        <Input
          id="phoneNumber"
          type="tel"
          inputMode="numeric"
          placeholder="Enter your mobile number"
          value={phoneNumber}
          onChange={handlePhoneChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dc-amber focus:border-transparent transition-all"
          maxLength={10}
          required
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
      
      <Button
        type="submit"
        className="w-full bg-dc-amber hover:bg-dc-caramel text-white py-2 rounded-lg transition-all duration-300 btn-shine"
        disabled={isLoading}
      >
        {isLoading ? 'Processing...' : type === 'login' ? 'Login' : 'Sign Up'}
      </Button>
    </form>
  );
};

export default AuthForm;
