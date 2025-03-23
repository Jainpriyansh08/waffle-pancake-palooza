
import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  type: 'bronze' | 'silver' | 'gold' | 'none';
  showLabel?: boolean;
  className?: string;
}

const LoyaltyBadge: React.FC<BadgeProps> = ({ type, showLabel = true, className }) => {
  if (type === 'none') return null;
  
  const badgeClasses = {
    bronze: 'bg-gradient-to-r from-amber-700 to-amber-600',
    silver: 'bg-gradient-to-r from-gray-400 to-gray-300',
    gold: 'bg-gradient-to-r from-yellow-400 to-yellow-300',
  };
  
  const labels = {
    bronze: 'Bronze Member',
    silver: 'Silver Member',
    gold: 'Gold Member',
  };

  return (
    <div className={cn(
      'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium text-white shadow-sm',
      badgeClasses[type],
      'animate-scale-in',
      className
    )}>
      <span className="mr-1">
        {type === 'bronze' && '🥉'}
        {type === 'silver' && '🥈'}
        {type === 'gold' && '🥇'}
      </span>
      {showLabel && labels[type]}
    </div>
  );
};

export default LoyaltyBadge;
