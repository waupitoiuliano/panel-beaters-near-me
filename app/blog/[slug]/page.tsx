import type { Metadata } from 'next';
import Link from 'next/link';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

const blogContent: Record<string, any> = {
  'dent-repair-guide': {
    title: 'Complete Guide to Dent Repair: Everything You Need to Know',
    date: '2024-01-15',
    category: 'Dent Repair',
    readTime: '8 min',
    content: `
      <h2>Introduction</h2>
      <p>Dent damage is one of the most common issues vehicle owners face. Whether it's a minor ding from a door or a larger impact, knowing your repair options can save you time and money.</p>

      <h2>Types of Dent Damage</h2>
      <p>There are several categories of dent damage:</p>
      <ul>
        <li><strong>Sharp Creases:</strong> Clean, defined edges that may affect the paint</li>
        <li><strong>Shallow Dents:</strong> Minor indentations that don't affect the paint</li>
        <li><strong>Large Impact Dents:</strong> Significant damage requiring major repair</li>
        <li><strong>Door Dings:</strong> Common in car parks and tight spaces</li>
      </ul>

      <h2>Dent Repair Methods</h2>
      <p>Modern panel beaters use several techniques:</p>

      <h3>Paintless Dent Removal (PDR)</h3>
      <p>This technique removes dents without affecting the original paint. It's ideal for minor dents and is more cost-effective than traditional methods.</p>

      <h3>Traditional Panel Beating</h3>
      <p>For larger dents, traditional panel beating may be necessary. This involves reshaping the metal and repainting if needed.</p>

      <h2>Cost Considerations</h2>
      <p>Dent repair costs depend on:</p>
      <ul>
        <li>Size and location of the dent</li>
        <li>Whether the paint is affected</li>
        <li>Type of repair needed</li>
        <li>Local labor rates</li>
      </ul>

      <h2>Finding the Right Panel Beater</h2>
      <p>When choosing a panel beater for dent repair:</p>
      <ul>
        <li>Check their experience with PDR</li>
        <li>Ask for before and after photos</li>
        <li>Get multiple quotes</li>
        <li>Check customer reviews and ratings</li>
      </ul>

      <h2>Insurance and Dent Repair</h2>
      <p>Most comprehensive insurance policies cover dent damage. Your excess will apply, but insurance can cover the full cost of repairs if the dent is significant enough.</p>

      <h2>Conclusion</h2>
      <p>Dent repair doesn't have to be complicated. With modern techniques like PDR and experienced panel beaters available across Australia, you can have your vehicle looking like new quickly and affordably.</p>
    `,
  },
  'car-respray-guide': {
    title: 'Car Respray: What to Expect and How to Choose the Right Shop',
    date: '2024-01-12',
    category: 'Respray',
    readTime: '6 min',
    content: `
      <h2>What is Car Respray?</h2>
      <p>Car respray is the process of repainting your vehicle. It's used for cosmetic reasons, damage repair, or when the original paint is faded or damaged.</p>

      <h2>When Do You Need a Respray?</h2>
      <ul>
        <li>Paint damage from accidents</li>
        <li>Rust or corrosion damage</li>
        <li>Faded or discolored paint</li>
        <li>Cosmetic updates and color changes</li>
      </ul>

      <h2>Types of Respray Services</h2>
      <p>Panel respray (individual panels) is more affordable than full respray, but full vehicle respray provides uniform color coverage.</p>

      <h2>The Respray Process</h2>
      <p>Professional respray involves surface preparation, primer application, base coat, and clear coat for protection.</p>

      <h2>Cost and Timeline</h2>
      <p>Respray costs vary significantly based on the area being painted and the quality of paint used. A single panel might cost $300-$800, while full respray can cost $2,000-$5,000+.</p>

      <h2>Choosing a Respray Specialist</h2>
      <ul>
        <li>Check color matching capabilities</li>
        <li>Ask about paint quality and warranty</li>
        <li>Verify proper spray booth facilities</li>
        <li>Review customer testimonials</li>
      </ul>

      <h2>After Your Respray</h2>
      <p>Proper care after respray extends the paint's life. Avoid harsh chemicals and ensure regular washing to maintain your new paint.</p>
    `,
  },
  'insurance-claim-guide': {
    title: 'Insurance Claim for Car Damage: Step-by-Step Guide',
    date: '2024-01-10',
    category: 'Insurance',
    readTime: '7 min',
    content: `
      <h2>Steps to File an Insurance Claim</h2>
      <p>Filing an insurance claim for vehicle damage is a straightforward process when you follow the right steps.</p>

      <h2>Step 1: Report the Incident</h2>
      <p>Contact your insurance company as soon as possible after the incident. Most insurers have 24/7 claims reporting.</p>

      <h2>Step 2: Gather Documentation</h2>
      <ul>
        <li>Photos of the damage</li>
        <li>Police report (if applicable)</li>
        <li>Third-party details (if another vehicle involved)</li>
        <li>Witness statements</li>
      </ul>

      <h2>Step 3: Get Repair Quotes</h2>
      <p>Obtain quotes from approved panel beaters. Your insurer may have a preferred network.</p>

      <h2>Step 4: Submit Your Claim</h2>
      <p>Provide all documentation and quotes to your insurance company for assessment.</p>

      <h2>Step 5: Approval and Repair</h2>
      <p>Once approved, you can proceed with repairs. Your excess will apply to the claim.</p>

      <h2>Choosing a Recommended Repairer</h2>
      <p>Using your insurer's recommended panel beaters can streamline the process and ensure quality workmanship.</p>

      <h2>Important Tips</h2>
      <ul>
        <li>Keep all receipts and documentation</li>
        <li>Get the insurance claim reference number</li>
        <li>Understand your policy's excess and limits</li>
      </ul>
    `,
  },
  'panel-beating-techniques': {
    title: 'Panel Beating Explained: Traditional vs Modern Techniques',
    date: '2024-01-08',
    category: 'Panel Beating',
    readTime: '9 min',
    content: `
      <h2>What is Panel Beating?</h2>
      <p>Panel beating is the craft of reshaping damaged vehicle panels to restore the original shape and finish.</p>

      <h2>Traditional Panel Beating Techniques</h2>
      <p>Traditional methods involve using hammers, dollies, and skilled hand techniques to reshape metal panels.</p>

      <h2>Modern Panel Beating Methods</h2>
      <p>Modern panel beaters combine traditional skills with advanced technology including:</p>
      <ul>
        <li>Computerized measuring systems</li>
        <li>Advanced alignment equipment</li>
        <li>Specialized tools for precision work</li>
      </ul>

      <h2>Paintless Dent Removal (PDR)</h2>
      <p>PDR is a modern technique that removes dents without affecting the vehicle's original paint.</p>

      <h2>The Panel Beating Process</h2>
      <ol>
        <li>Assessment of damage</li>
        <li>Panel removal if necessary</li>
        <li>Metal reshaping and straightening</li>
        <li>Filler application (if needed)</li>
        <li>Sanding and priming</li>
        <li>Painting and finishing</li>
      </ol>

      <h2>Quality Assurance</h2>
      <p>Professional panel beaters use quality checks at each stage to ensure excellent results.</p>
    `,
  },
  'car-repair-cost-guide': {
    title: 'How Much Does Car Damage Repair Cost? 2024 Price Guide',
    date: '2024-01-05',
    category: 'Pricing',
    readTime: '6 min',
    content: `
      <h2>Average Panel Beating Costs in Australia</h2>
      <p>Vehicle repair costs vary across Australia, but here are typical ranges:</p>

      <h2>Minor Dent Repair</h2>
      <ul>
        <li>PDR for small dents: $100-$300</li>
        <li>Single door ding: $150-$400</li>
      </ul>

      <h2>Medium Damage</h2>
      <ul>
        <li>Multiple panel dents: $500-$1,500</li>
        <li>Single panel respray: $300-$800</li>
      </ul>

      <h2>Major Damage</h2>
      <ul>
        <li>Full vehicle respray: $2,000-$5,000</li>
        <li>Structural repairs: $1,000-$3,000+</li>
      </ul>

      <h2>Factors Affecting Cost</h2>
      <ul>
        <li>Extent of damage</li>
        <li>Vehicle make and model</li>
        <li>Location and labor rates</li>
        <li>Parts replacement needs</li>
        <li>Paint quality used</li>
      </ul>

      <h2>Getting Better Quotes</h2>
      <p>Always get multiple quotes from different panel beaters to compare prices and services.</p>

      <h2>Insurance Coverage</h2>
      <p>Your comprehensive insurance should cover repairs minus your excess amount.</p>
    `,
  },
  'find-best-panel-beater': {
    title: 'Finding the Best Local Panel Beater: What to Look For',
    date: '2024-01-02',
    category: 'Choosing Shops',
    readTime: '7 min',
    content: `
      <h2>Key Qualities of a Good Panel Beater</h2>
      <p>Finding a trustworthy and skilled panel beater is crucial for quality repairs.</p>

      <h2>Credentials and Experience</h2>
      <ul>
        <li>Industry certifications</li>
        <li>Years in business</li>
        <li>Specialized equipment and technology</li>
        <li>Insurance and licensing</li>
      </ul>

      <h2>Customer Reviews and Ratings</h2>
      <p>Check online reviews on our directory and other platforms. Look for:</p>
      <ul>
        <li>Consistently high ratings</li>
        <li>Detailed positive feedback</li>
        <li>How they handle complaints</li>
      </ul>

      <h2>Quality of Work</h2>
      <p>Ask to see before and after photos of previous work. Quality panel beating should be virtually invisible.</p>

      <h2>Warranty and Guarantees</h2>
      <p>Reputable panel beaters offer warranties on their work, typically ranging from 12 months to lifetime for some services.</p>

      <h2>Customer Service</h2>
      <ul>
        <li>Clear communication about costs</li>
        <li>Transparent timeline for repairs</li>
        <li>Easy to reach and responsive</li>
      </ul>

      <h2>Using Panel Beaters Near Me</h2>
      <p>Our directory makes it easy to find and compare the best panel beaters in your area. Filter by location, services, and read verified customer ratings.</p>

      <h2>Getting Quotes</h2>
      <p>Use our quote system to get instant estimates from multiple panel beaters in your area.</p>
    `,
  },
};

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogContent[slug];

  if (!post) {
    return {
      title: 'Blog Post Not Found',
    };
  }

  return {
    title: `${post.title} | Panel Beaters Near Me Blog`,
    description: post.excerpt || `Read about ${post.title.toLowerCase()} on the Panel Beaters Near Me blog.`,
    keywords: `${post.category}, panel beaters, auto repair, car damage`,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogContent[slug];

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1>Blog Post Not Found</h1>
        <Link href="/blog" className="text-blue-600 hover:text-blue-800">
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8">
        <Link href="/blog" className="text-blue-600 hover:text-blue-800 font-semibold mb-4 inline-block">
          ← Back to Blog
        </Link>
        <h1 className="text-4xl font-bold mb-4 text-gray-900">{post.title}</h1>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full font-semibold">
            {post.category}
          </span>
          <span>{post.readTime} read</span>
          <span>
            {new Date(post.date).toLocaleDateString('en-AU', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
        </div>
      </div>

      <div className="prose prose-lg max-w-none">
        <div dangerouslySetInnerHTML={{ __html: post.content }} className="text-gray-700 leading-relaxed space-y-4" />
      </div>

      <div className="mt-12 pt-8 border-t">
        <h3 className="text-2xl font-bold mb-6 text-gray-900">Find a Panel Beater Near You</h3>
        <p className="mb-4 text-gray-600">
          Ready to get your vehicle repaired? Browse our directory of trusted panel beaters and auto body repair shops
          across Australia.
        </p>
        <Link href="/" className="inline-block bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 font-semibold">
          Browse Panel Beaters
        </Link>
      </div>
    </article>
  );
}
