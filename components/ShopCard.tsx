'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Shop } from '@/lib/types';
import { useState } from 'react';

interface ShopCardProps {
  shop: Shop;
}

export default function ShopCard({ shop }: ShopCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <Link href={`/shop/${shop.id}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden cursor-pointer h-full flex flex-col">
        <div className="relative w-full h-40 bg-gray-200">
          {!imageError ? (
            <Image
              src={shop.photo}
              alt={shop.name}
              fill
              className="object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-red-600 to-red-700">
              <div className="text-center text-white">
                <div className="text-4xl mb-2">🔧</div>
                <div className="text-xs font-semibold">Panel Beater</div>
              </div>
            </div>
          )}
        </div>
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="font-bold text-lg mb-1 line-clamp-2">{shop.name}</h3>
          <p className="text-gray-600 text-sm mb-3">{shop.suburb}, {shop.state}</p>
          <div className="flex items-center mb-3">
            <span className="text-yellow-500">⭐</span>
            <span className="ml-1 font-semibold">{shop.rating}</span>
          </div>
          <p className="text-red-600 font-bold text-lg mt-auto">
            From ${shop.minPrice}
          </p>
        </div>
      </div>
    </Link>
  );
}
