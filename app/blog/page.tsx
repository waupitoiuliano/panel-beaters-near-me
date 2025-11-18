import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Panel Beating & Auto Body Repair Guide | Panel Beaters Near Me',
  description: 'Learn about panel beating, dent repair, car respray, and auto body maintenance. Read expert guides and tips for vehicle damage repair across Australia.',
};

const blogPosts = [
  {
    id: 1,
    title: 'Complete Guide to Dent Repair: Everything You Need to Know',
    slug: 'dent-repair-guide',
    excerpt: 'Learn about modern dent repair techniques, PDR (Paintless Dent Removal), and when to choose traditional panel beating.',
    category: 'Dent Repair',
    date: '2024-01-15',
    readTime: '8 min',
  },
  {
    id: 2,
    title: 'Car Respray: What to Expect and How to Choose the Right Shop',
    slug: 'car-respray-guide',
    excerpt: 'Complete guide to car respray services, color matching, and how to find a quality respray specialist near you.',
    category: 'Respray',
    date: '2024-01-12',
    readTime: '6 min',
  },
  {
    id: 3,
    title: 'Insurance Claim for Car Damage: Step-by-Step Guide',
    slug: 'insurance-claim-guide',
    excerpt: 'How to navigate the insurance claim process for vehicle damage and work with panel beaters on insurance repairs.',
    category: 'Insurance',
    date: '2024-01-10',
    readTime: '7 min',
  },
  {
    id: 4,
    title: 'Panel Beating Explained: Traditional vs Modern Techniques',
    slug: 'panel-beating-techniques',
    excerpt: 'Understand the difference between traditional panel beating and modern automotive repair methods.',
    category: 'Panel Beating',
    date: '2024-01-08',
    readTime: '9 min',
  },
  {
    id: 5,
    title: 'How Much Does Car Damage Repair Cost? 2024 Price Guide',
    slug: 'car-repair-cost-guide',
    excerpt: 'Breakdown of typical panel beating and auto body repair costs across Australia. Learn what affects pricing.',
    category: 'Pricing',
    date: '2024-01-05',
    readTime: '6 min',
  },
  {
    id: 6,
    title: 'Finding the Best Local Panel Beater: What to Look For',
    slug: 'find-best-panel-beater',
    excerpt: 'Tips for choosing a trusted panel beater, checking credentials, and ensuring quality work.',
    category: 'Choosing Shops',
    date: '2024-01-02',
    readTime: '7 min',
  },
];

export default function BlogPage() {
  return (
    <>
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Panel Beating & Auto Repair Guide</h1>
          <p className="text-xl md:text-2xl">Expert tips, guides, and resources for vehicle damage repair</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`}>
              <article className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden cursor-pointer h-full flex flex-col">
                <div className="bg-gradient-to-r from-red-500 to-red-600 h-32 flex items-center justify-center">
                  <div className="text-4xl">📰</div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-semibold px-3 py-1 bg-red-100 text-red-700 rounded-full">
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-500">{post.readTime}</span>
                  </div>
                  <h2 className="text-xl font-bold mb-3 line-clamp-3 text-gray-900">{post.title}</h2>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">{post.excerpt}</p>
                  <div className="text-xs text-gray-400 pt-4 border-t">
                    {new Date(post.date).toLocaleDateString('en-AU', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        <section className="mt-20 bg-gray-100 rounded-xl p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Blog Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {['Dent Repair', 'Car Respray', 'Panel Beating', 'Insurance Claims', 'Pricing Guides', 'Choosing Shops'].map((topic) => (
              <div key={topic} className="text-gray-700 font-semibold px-4 py-3 bg-white rounded-lg">
                {topic}
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
