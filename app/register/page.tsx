'use client';

import ShopRegistrationForm from '@/components/ShopRegistrationForm';

export default function RegisterPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-4">Register Your Shop</h1>
      <p className="text-gray-600 mb-8">
        Fill out the form below to register your panel beater shop. Your listing will be reviewed and approved before going live.
      </p>
      <ShopRegistrationForm />
    </div>
  );
}
