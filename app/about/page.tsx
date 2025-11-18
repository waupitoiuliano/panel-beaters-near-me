import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Panel Beaters Near Me | Find Local Auto Repair Shops',
  description: 'Learn about Panel Beaters Near Me - your trusted directory for finding panel beaters and auto body repair shops across Australia.',
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Panel Beaters Near Me</h1>
          <p className="text-xl md:text-2xl">Connecting Australians with trusted auto body repair specialists</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Our Mission</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Panel Beaters Near Me exists to simplify the process of finding trusted panel beaters and auto body repair
            specialists across Australia. We believe that vehicle owners deserve easy access to quality repair services
            without the hassle of searching endlessly for the right shop.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Our platform connects customers with verified, experienced panel beaters who are committed to delivering
            excellent workmanship and outstanding customer service.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Easy Search</h3>
              <p className="text-gray-600">
                Find panel beaters in your area quickly and easily. Filter by location, services, and ratings to find
                the perfect match for your vehicle.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="text-4xl mb-4">⭐</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Verified Reviews</h3>
              <p className="text-gray-600">
                Read authentic customer reviews and check ratings from real people who have used these panel beaters.
                Make informed decisions based on verified feedback.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Instant Quotes</h3>
              <p className="text-gray-600">
                Get quotes from multiple panel beaters without the back-and-forth phone calls. Compare prices and
                services online.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Why Choose Us?</h2>
          <ul className="space-y-4 text-gray-700">
            <li className="flex items-start">
              <span className="text-red-600 font-bold mr-4 text-xl">✓</span>
              <span>
                <strong>Comprehensive Directory:</strong> We feature panel beaters across all Australian states, from
                major cities to regional areas.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-red-600 font-bold mr-4 text-xl">✓</span>
              <span>
                <strong>Quality Assurance:</strong> All listed panel beaters are verified and vetted to ensure they meet
                industry standards.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-red-600 font-bold mr-4 text-xl">✓</span>
              <span>
                <strong>Customer Support:</strong> We're committed to helping both customers and panel beaters have the
                best experience.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-red-600 font-bold mr-4 text-xl">✓</span>
              <span>
                <strong>Educational Resources:</strong> Check out our blog for tips, guides, and information about panel
                beating and auto repair.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-red-600 font-bold mr-4 text-xl">✓</span>
              <span>
                <strong>Transparent Pricing:</strong> See minimum pricing upfront and get instant quotes to compare
                costs.
              </span>
            </li>
          </ul>
        </section>

        <section className="mb-16 bg-red-50 rounded-xl p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">For Panel Beaters</h2>
          <p className="text-lg text-gray-700 mb-6">
            Are you a panel beater or auto body repair shop looking to reach more customers? Join our directory today!
          </p>
          <ul className="space-y-3 mb-8 text-gray-700">
            <li className="flex items-center">
              <span className="text-red-600 font-bold mr-3">✓</span>
              Increase your visibility to customers actively searching for panel beating services
            </li>
            <li className="flex items-center">
              <span className="text-red-600 font-bold mr-3">✓</span>
              Build your reputation with verified customer reviews
            </li>
            <li className="flex items-center">
              <span className="text-red-600 font-bold mr-3">✓</span>
              Get direct quote requests from potential customers
            </li>
            <li className="flex items-center">
              <span className="text-red-600 font-bold mr-3">✓</span>
              Manage your shop information and services online
            </li>
          </ul>
          <a
            href="/register"
            className="inline-block bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 font-semibold transition-colors"
          >
            Register Your Shop
          </a>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Contact Us</h2>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <p className="text-lg text-gray-700 mb-4">
              Have questions? We'd love to hear from you. Get in touch with our team:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li>
                <strong>Email:</strong>{' '}
                <a href="mailto:panelbeatersnearme@gmail.com" className="text-red-600 hover:text-red-700">
                  panelbeatersnearme@gmail.com
                </a>
              </li>
              <li>
                <strong>Address:</strong> Australia
              </li>
            </ul>
          </div>
        </section>
      </div>
    </>
  );
}
