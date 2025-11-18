'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Shop } from '@/lib/types';

interface ShopFormProps {
  shop?: Shop;
}

export default function ShopForm({ shop }: ShopFormProps) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    name: shop?.name || '',
    address: shop?.address || '',
    suburb: shop?.suburb || '',
    state: shop?.state || '',
    phone: shop?.phone || '',
    email: shop?.email || '',
    photo: shop?.photo || '',
    rating: shop?.rating || 0,
    minPrice: shop?.minPrice || 0,
    services: shop?.services?.join(', ') || '',
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const { url } = await response.json();
        setForm({ ...form, photo: url });
      } else {
        alert('Failed to upload image');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const services = form.services.split(',').map((s) => s.trim()).filter(Boolean);
      const payload = { ...form, services };

      const url = shop ? `/api/shops/${shop.id}` : '/api/shops';
      const method = shop ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        router.push('/admin');
        router.refresh();
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to save shop');
      }
    } catch (error) {
      console.error('Error saving shop:', error);
      alert('Error saving shop');
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = 'w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-600';

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
      <div>
        <label className="block text-sm font-semibold mb-1">Shop Name *</label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-1">Address *</label>
          <input
            type="text"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            required
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Suburb *</label>
          <input
            type="text"
            value={form.suburb}
            onChange={(e) => setForm({ ...form, suburb: e.target.value })}
            required
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-1">State *</label>
          <input
            type="text"
            value={form.state}
            onChange={(e) => setForm({ ...form, state: e.target.value })}
            required
            className={inputClass}
            placeholder="VIC, NSW, QLD, etc."
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Phone *</label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            required
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1">Email *</label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          className={inputClass}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1">Shop Photo</label>
        <div className="space-y-2">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={uploading}
            className={inputClass}
          />
          {uploading && <p className="text-sm text-gray-600">Uploading...</p>}
          {form.photo && (
            <div className="mt-2">
              <img src={form.photo} alt="Preview" className="w-32 h-32 object-cover rounded-lg" />
              <p className="text-xs text-gray-500 mt-1">Current photo</p>
            </div>
          )}
          <input
            type="url"
            value={form.photo}
            onChange={(e) => setForm({ ...form, photo: e.target.value })}
            className={inputClass}
            placeholder="Or enter image URL"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-1">Rating</label>
          <input
            type="number"
            step="0.1"
            min="0"
            max="5"
            value={form.rating}
            onChange={(e) => setForm({ ...form, rating: parseFloat(e.target.value) })}
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Min Price ($)</label>
          <input
            type="number"
            min="0"
            value={form.minPrice}
            onChange={(e) => setForm({ ...form, minPrice: parseInt(e.target.value) })}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1">Services (comma-separated)</label>
        <input
          type="text"
          value={form.services}
          onChange={(e) => setForm({ ...form, services: e.target.value })}
          className={inputClass}
          placeholder="Dent Repair, Respray, Insurance"
        />
      </div>

      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          disabled={submitting}
          className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 disabled:bg-gray-400 font-semibold"
        >
          {submitting ? 'Saving...' : 'Save Shop'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin')}
          className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 font-semibold"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

