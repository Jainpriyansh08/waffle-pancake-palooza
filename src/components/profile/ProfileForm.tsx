
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/context/UserContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const ProfileForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    dob?: string;
  }>({});
  
  const { createProfile } = useUser();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: {
      name?: string;
      email?: string;
      dob?: string;
    } = {};
    let isValid = true;
    
    if (!name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }
    
    if (!email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }
    
    if (!dob) {
      newErrors.dob = 'Date of birth is required';
      isValid = false;
    } else {
      const birthDate = new Date(dob);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      
      if (age < 13) {
        newErrors.dob = 'You must be at least 13 years old';
        isValid = false;
      }
    }
    
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      createProfile({ name, email, dob });
      navigate('/home');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-sm animated-entry">
      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <Input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full"
          placeholder="Enter your full name"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>
      
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full"
          placeholder="Enter your email"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>
      
      <div className="space-y-2">
        <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
          Date of Birth
        </label>
        <Input
          id="dob"
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          className="w-full"
          max={new Date().toISOString().split('T')[0]}
        />
        {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}
      </div>
      
      <Button
        type="submit"
        className="w-full bg-dc-amber hover:bg-dc-caramel text-white py-2 rounded-lg transition-all duration-300 btn-shine"
      >
        Create Profile
      </Button>
    </form>
  );
};

export default ProfileForm;
