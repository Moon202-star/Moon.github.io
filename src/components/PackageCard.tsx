import React from 'react';
import { Check } from 'lucide-react';

interface PackageCardProps {
  name: string;
  price: number;
  features: string[];
  popular?: boolean;
}

function PackageCard({ name, price, features, popular }: PackageCardProps) {
  return (
    <div className={`rounded-lg p-6 ${popular ? 'bg-blue-600' : 'bg-gray-800'} relative`}>
      {popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-yellow-500 text-black text-sm font-bold px-4 py-1 rounded-full">
            POPULAR
          </span>
        </div>
      )}
      <h3 className="text-2xl font-bold mb-4">{name}</h3>
      <div className="mb-6">
        <span className="text-4xl font-bold">${price}</span>
        <span className="text-gray-400">/month</span>
      </div>
      <ul className="space-y-3 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <Check className="h-5 w-5 mr-2 text-green-500" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <button className={`w-full py-2 rounded-lg font-semibold transition duration-300 ${
        popular 
          ? 'bg-white text-blue-600 hover:bg-gray-100' 
          : 'bg-blue-600 hover:bg-blue-700'
      }`}>
        Select Package
      </button>
    </div>
  );
}

export default PackageCard;