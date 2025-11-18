'use client';

import { useState } from 'react';

const initialForm = { name: '', email: '', phone: '', vehicleInfo: '', serviceNeeded: 'Dent Repair', message: '' };
const inputClass = 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-600';

export default function QuoteForm({ shopId, shopName }: { shopId: string; shopName: string }) {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState(initialForm);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, shopId }),
      });
      if (res.ok) {
        setSuccess(true);
        setForm(initialForm);
        setTimeout(() => setSuccess(false), 5000);
      } else {
        const error = await res.json();
        alert(error.error || 'Failed to submit quote');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit quote. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md sticky top-8">
      <h3 className="text-2xl font-bold mb-4">Get Quote from {shopName}</h3>
      {success && <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">Quote submitted!</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { name: 'name', label: 'Name', type: 'text' },
          { name: 'email', label: 'Email', type: 'email' },
          { name: 'phone', label: 'Phone', type: 'tel' },
          { name: 'vehicleInfo', label: 'Vehicle Info', type: 'text', placeholder: '2020 Toyota Corolla' },
        ].map(({ name, label, type, placeholder }) => (
          <div key={name}>
            <label className="block text-sm font-semibold mb-1">{label} *</label>
            <input
              type={type}
              placeholder={placeholder}
              value={form[name as keyof typeof form]}
              onChange={(e) => setForm({ ...form, [name]: e.target.value })}
              required
              className={inputClass}
            />
          </div>
        ))}
        <div>
          <label className="block text-sm font-semibold mb-1">Service</label>
          <select
            value={form.serviceNeeded}
            onChange={(e) => setForm({ ...form, serviceNeeded: e.target.value })}
            className={inputClass}
          >
            {['Dent Repair', 'Respray', 'Insurance'].map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        <textarea
          rows={3}
          placeholder="Message (optional)"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className={inputClass}
        />
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 disabled:bg-gray-400"
        >
          {submitting ? 'Submitting...' : 'Get Quote'}
        </button>
      </form>
    </div>
  );
}
