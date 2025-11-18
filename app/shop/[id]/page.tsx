import Image from 'next/image';
import QuoteForm from '@/components/QuoteForm';
import { notFound } from 'next/navigation';
import { getShop } from '@/lib/api';
import type { Metadata } from 'next';

interface ShopPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ShopPageProps): Promise<Metadata> {
  const { id } = await params;
  const shop = await getShop(id);

  if (!shop) {
    return {
      title: 'Shop Not Found',
    };
  }

  return {
    title: `${shop.name} | Panel Beaters Near Me - ${shop.suburb}, ${shop.state}`,
    description: `${shop.name} in ${shop.suburb}, ${shop.state}. Services: ${shop.services.join(', ')}. Rating: ${shop.rating}/5. From $${shop.minPrice}. Get a quote online.`,
    keywords: `${shop.name}, panel beaters ${shop.suburb}, auto body repair ${shop.state}, dent repair near ${shop.suburb}`,
    openGraph: {
      title: `${shop.name} | Auto Body Repair in ${shop.suburb}`,
      description: `Get a quote from ${shop.name}. Services include ${shop.services.join(', ')}.`,
      url: `https://panelbeatersnearme.com.au/shop/${shop.id}`,
      type: 'website',
      images: [
        {
          url: shop.photo || '/logo.png',
          width: 400,
          height: 300,
          alt: shop.name,
        },
      ],
    },
  };
}

export default async function ShopPage({ params }: ShopPageProps) {
  const { id } = await params;
  const shop = await getShop(id);

  if (!shop) {
    notFound();
  }

  // JSON-LD Schema for LocalBusiness
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `https://panelbeatersnearme.com.au/shop/${shop.id}`,
    name: shop.name,
    image: shop.photo,
    description: `${shop.name} - Auto body repair and panel beating services in ${shop.suburb}, ${shop.state}. Services: ${shop.services.join(', ')}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: shop.address,
      addressLocality: shop.suburb,
      addressRegion: shop.state,
      addressCountry: 'AU',
    },
    telephone: shop.phone,
    email: shop.email,
    priceRange: `$${shop.minPrice}+`,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: shop.rating,
      bestRating: '5',
      worstRating: '1',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaData),
        }}
      />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Shop Details */}
        <div className="lg:col-span-2">
          <div className="relative w-full h-96 rounded-lg overflow-hidden mb-6 bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center">
            {shop.photo && shop.photo !== 'https://via.placeholder.com/400x300' ? (
              <Image
                src={shop.photo}
                alt={shop.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="text-center text-white">
                <div className="text-6xl mb-4">🔧</div>
                <div className="text-2xl font-semibold">{shop.name}</div>
              </div>
            )}
          </div>

          <h1 className="text-4xl font-bold mb-4">{shop.name}</h1>

          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-2xl font-bold mb-4">Contact Details</h2>
            <div className="space-y-3">
              <p className="text-lg">
                <span className="font-semibold">Address:</span> {shop.address}, {shop.suburb} {shop.state}
              </p>
              <p className="text-lg">
                <span className="font-semibold">Phone:</span>{' '}
                <a href={`tel:${shop.phone}`} className="text-red-600 hover:underline">
                  {shop.phone}
                </a>
              </p>
              <p className="text-lg">
                <span className="font-semibold">Email:</span>{' '}
                <a href={`mailto:${shop.email}`} className="text-red-600 hover:underline">
                  {shop.email}
                </a>
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Services</h2>
            <ul className="space-y-2">
              {shop.services.map((service, idx) => (
                <li key={idx} className="text-lg flex items-center">
                  <span className="text-red-600 mr-3">✓</span>
                  {service}
                </li>
              ))}
            </ul>
            <div className="mt-6 p-4 bg-red-50 rounded-lg border-2 border-red-200">
              <p className="text-xl font-bold text-red-600">From ${shop.minPrice}</p>
            </div>
          </div>
        </div>

        {/* Right Column: Quote Form */}
        <div>
          <QuoteForm shopId={shop.id} shopName={shop.name} />
        </div>
      </div>
      </div>
    </>
  );
}
