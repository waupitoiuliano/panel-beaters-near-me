import { getShops } from '@/lib/api';
import ShopSearch from '@/components/ShopSearch';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Panel Beaters Near Me | Find Local Car Repair Shops in Australia',
  description: 'Find trusted panel beaters and auto body repair shops across Australia. Compare ratings, services, and get instant quotes online.',
};

export default async function Home() {
  const shops = await getShops();

  return (
    <>
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Panel Beaters Near You</h1>
          <p className="text-xl md:text-2xl mb-2">Compare local auto body repair shops and get quotes instantly</p>
          <p className="text-red-100">Across all Australian states - VIC, NSW, QLD, WA, SA, TAS, ACT</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <ShopSearch shops={shops} />

        <section className="mt-20 bg-white rounded-xl shadow-lg p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Why Choose Panel Beaters Near Me?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl mb-4">⭐</div>
              <h3 className="text-xl font-bold mb-2">Trusted Shops</h3>
              <p className="text-gray-600">All panel beaters are verified with ratings and customer reviews to help you choose the best.</p>
            </div>
            <div>
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-2">Instant Quotes</h3>
              <p className="text-gray-600">Get quotes from multiple shops and compare prices for dent repair, respray, and panel work.</p>
            </div>
            <div>
              <div className="text-4xl mb-4">📍</div>
              <h3 className="text-xl font-bold mb-2">Local & Convenient</h3>
              <p className="text-gray-600">Find auto body repair shops near your location across all Australian suburbs and states.</p>
            </div>
          </div>
        </section>

        <section className="mt-16 bg-gray-100 rounded-xl p-8 md:p-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Popular Services</h2>
          <p className="text-gray-700 mb-6">Browse shops by their specialties:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="text-gray-700 font-semibold">🔨 Panel beating</div>
            <div className="text-gray-700 font-semibold">🎨 Dent repair</div>
            <div className="text-gray-700 font-semibold">🚗 Car respray</div>
            <div className="text-gray-700 font-semibold">⚙️ Auto body repair</div>
            <div className="text-gray-700 font-semibold">💥 Smash repair</div>
            <div className="text-gray-700 font-semibold">🛠️ Vehicle damage repair</div>
          </div>
        </section>
      </div>
    </>
  );
}
