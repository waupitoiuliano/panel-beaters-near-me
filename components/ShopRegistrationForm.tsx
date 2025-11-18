'use client';

import { useState } from 'react';

export default function ShopRegistrationForm() {
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    name: '',
    address: '',
    suburb: '',
    state: '',
    phone: '',
    email: '',
    photo: '',
    rating: 0,
    minPrice: 0,
    services: '',
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
      const payload = { ...form, services, approved: false };

      const response = await fetch('/api/shops', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSuccess(true);
        setForm({
          name: '',
          address: '',
          suburb: '',
          state: '',
          phone: '',
          email: '',
          photo: '',
          rating: 0,
          minPrice: 0,
          services: '',
        });
        setTimeout(() => {
          setSuccess(false);
        }, 5000);
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to register shop');
      }
    } catch (error) {
      console.error('Error registering shop:', error);
      alert('Error registering shop');
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = 'w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-600';

  return (
    <>
      {success && (
        <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
          <p className="font-semibold">Thank you for registering!</p>
          <p className="text-sm">Your shop registration has been submitted. We'll review it and contact you soon.</p>
        </div>
      )}

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

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 disabled:bg-gray-400"
        >
          {submitting ? 'Submitting...' : 'Register Shop'}
        </button>
      </form>
    </>
  );
}

