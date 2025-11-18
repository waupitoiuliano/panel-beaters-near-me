'use client';

import { useState } from 'react';
import { Shop } from '@/lib/types';
import ShopCard from './ShopCard';

interface ShopSearchProps {
  shops: Shop[];
}

export default function ShopSearch({ shops }: ShopSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredShops = shops.filter(
    (shop) =>
      shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shop.suburb.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shop.state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Search Bar */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-6">Find Panel Beaters Near You</h1>
        <input
          type="text"
          placeholder="Search by shop name or suburb..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-600"
        />
      </div>

      {/* Google Maps Embed */}
      <div className="mb-12 h-96 rounded-lg overflow-hidden shadow-lg">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d3988.8195173689314!2d151.2093!3d-33.8688!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sau!4v1234567890"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      {/* Shop Cards */}
      <div>
        <h2 className="text-2xl font-bold mb-6">
          {filteredShops.length === 0
            ? 'No shops found'
            : `${filteredShops.length} shops available`}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {filteredShops.map((shop) => (
            <ShopCard key={shop.id} shop={shop} />
          ))}
        </div>
      </div>
    </>
  );
}



