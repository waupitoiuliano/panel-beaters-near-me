import Image from 'next/image';

export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8 flex justify-center">
          <Image
            src="/logo.png"
            alt="Panel Beaters Near Me Logo"
            width={120}
            height={120}
          />
        </div>

        <h1 className="text-4xl font-bold text-white mb-4">Coming Soon</h1>

        <p className="text-xl text-red-100 mb-8">
          Panel Beaters Near Me is currently under maintenance. We're working hard to bring you the best directory for finding trusted auto body repair shops across Australia.
        </p>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">What's Coming</h2>
          <ul className="text-left space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="text-red-600 font-bold mr-3">✓</span>
              <span>Access to 1000+ verified panel beaters across Australia</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-600 font-bold mr-3">✓</span>
              <span>Compare ratings and services instantly</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-600 font-bold mr-3">✓</span>
              <span>Get quotes online in minutes</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-600 font-bold mr-3">✓</span>
              <span>Expert guides on dent repair and car maintenance</span>
            </li>
          </ul>
        </div>

        <div className="bg-white bg-opacity-20 rounded-lg p-6 text-white">
          <p className="text-sm">
            Be among the first to know when we launch. Check back soon!
          </p>
        </div>
      </div>
    </div>
  );
}
