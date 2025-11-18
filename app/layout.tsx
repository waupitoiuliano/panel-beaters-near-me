import type { Metadata } from 'next';
import Image from 'next/image';
import './globals.css';

export const metadata: Metadata = {
  title: 'Panel Beaters Near Me | Find Local Car Repair Shops in Australia',
  description: 'Find the best panel beaters and auto body repair shops near you across Australia. Get quotes, compare ratings, and book repairs online.',
  keywords: 'panel beaters, car repair, auto body shop, dent repair, respray, car maintenance, Australia',
  openGraph: {
    title: 'Panel Beaters Near Me | Find Local Car Repair Shops',
    description: 'Find trusted panel beaters and car repair shops across Australia.',
    url: 'https://panelbeatersnearme.com.au',
    type: 'website',
    images: [
      {
        url: '/logo.png',
        width: 500,
        height: 500,
        alt: 'Panel Beaters Near Me Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Panel Beaters Near Me',
    description: 'Find trusted panel beaters near you',
    images: ['/logo.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Panel Beaters Near Me',
              description: 'Find the best panel beaters and auto body repair shops near you across Australia',
              url: 'https://panelbeatersnearme.com.au',
              logo: 'https://panelbeatersnearme.com.au/logo.png',
              sameAs: [
                'https://www.facebook.com/panelbeatersnearmeonline',
                'https://www.instagram.com/panelbeatersnearmeonline',
              ],
            }),
          }}
        />
      </head>
      <body className="antialiased bg-gray-50">
        <header className="bg-white shadow-md sticky top-0 z-50">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <a href="/" className="flex items-center gap-4 hover:opacity-80 transition-opacity">
              <Image
                src="/logo.png"
                alt="Panel Beaters Near Me Logo"
                width={100}
                height={100}
                priority
              />
              <div className="hidden sm:block">
                <div className="text-3xl font-bold text-gray-900">Panel Beaters</div>
                <div className="text-lg text-red-600 font-semibold">Near Me</div>
              </div>
            </a>
            <div className="flex gap-3 items-center">
              <a href="/blog" className="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 font-semibold transition-colors hidden sm:inline">
                Blog
              </a>
              <a href="/register" className="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 font-semibold transition-colors">
                Register Shop
              </a>
              <a href="/admin" className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold transition-colors">
                Admin
              </a>
            </div>
          </nav>
        </header>
        <main className="min-h-screen">{children}</main>
        <footer className="bg-gray-900 text-gray-300 py-12 mt-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div>
                <h3 className="text-white font-bold mb-4">About</h3>
                <p className="text-sm">Panel Beaters Near Me connects customers with trusted auto body repair shops across Australia.</p>
              </div>
              <div>
                <h3 className="text-white font-bold mb-4">Quick Links</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
                  <li><a href="/blog" className="hover:text-white transition-colors">Blog</a></li>
                  <li><a href="/register" className="hover:text-white transition-colors">Register Your Shop</a></li>
                  <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-bold mb-4">Contact</h3>
                <p className="text-sm">Email: panelbeatersnearme@gmail.com</p>
              </div>
            </div>
            <div className="border-t border-gray-800 pt-8 text-center text-sm">
              <p>&copy; 2024 Panel Beaters Near Me. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
