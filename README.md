# Panel Beaters Near Me

An online directory app for finding and getting quotes from panel beaters across Australia.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Database**: Supabase (PostgreSQL)
- **Backend**: Next.js API Routes

## Project Structure

```
├── app/
│   ├── admin/                    # Admin panel
│   │   ├── shops/
│   │   │   ├── [id]/page.tsx    # Edit shop page
│   │   │   └── new/page.tsx     # Add new shop page
│   │   └── page.tsx              # Admin dashboard
│   ├── api/
│   │   ├── quotes/
│   │   │   └── route.ts          # Quote API (GET, POST)
│   │   └── shops/
│   │       ├── [id]/route.ts    # Shop API (GET, PUT, DELETE)
│   │       └── route.ts          # Shops API (GET, POST)
│   ├── shop/
│   │   └── [id]/page.tsx         # Individual shop detail page
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page with search
├── components/
│   ├── DeleteShopButton.tsx      # Delete shop button
│   ├── QuoteForm.tsx             # Quote request form
│   ├── ShopCard.tsx              # Shop card component
│   ├── ShopForm.tsx              # Add/edit shop form
│   └── ShopSearch.tsx             # Search component
├── lib/
│   ├── api.ts                    # API helper functions
│   ├── data.ts                   # Sample shop data (for migration)
│   ├── supabase.ts               # Supabase client
│   └── types.ts                  # TypeScript types
├── DATABASE_SCHEMA.md            # Database schema documentation
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
└── package.json
```

## Features

### Home Page
- Big search bar to filter shops by name or suburb
- Google Maps embed showing all Australian states
- Grid of 5 shop cards with photos, ratings, and pricing

### Shop Cards
- Shop photo
- Shop name
- Suburb and state
- ⭐ 4.8 star rating
- "From $149" pricing

### Detail Page (Click Card)
- Full shop photo
- Contact details (phone, email, address)
- Services offered (Dent Repair, Respray, Insurance)
- "Get Quote" form (sticky, right sidebar)

### Quote Form
- Name, Email, Phone (required)
- Vehicle Info (required)
- Service dropdown
- Message textarea
- Saves to `/data/quotes.json`

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier works)

### Installation

1. **Clone and install dependencies:**
   ```bash
   cd panel-beaters-near-me
   npm install
   ```

2. **Set up Supabase:**
   - Create a new project at [supabase.com](https://supabase.com)
   - Go to SQL Editor and run the SQL from `DATABASE_SCHEMA.md`
   - Get your project URL and anon key from Settings → API

3. **Configure environment variables:**
   Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run development server:**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## File Size Compliance

All files are kept under 100 lines as requested:
- Components: ~90 lines
- Pages: ~60-70 lines
- API routes: ~55 lines

## Features

### Public Features
- **Home Page**: Search and browse panel beater shops
- **Shop Detail Pages**: View shop information and request quotes
- **Quote System**: Submit quote requests for services

### Admin Features
- **Admin Dashboard**: View all shops in a table
- **Add Shops**: Create new shop listings
- **Edit Shops**: Update shop information
- **Delete Shops**: Remove shops from the directory

## Database

The app uses Supabase (PostgreSQL) with two main tables:
- **shops**: Stores shop information
- **quotes**: Stores quote requests

See `DATABASE_SCHEMA.md` for complete schema documentation and setup instructions.

## API Endpoints

### Shops
- `GET /api/shops` - List all shops
- `GET /api/shops/[id]` - Get single shop
- `POST /api/shops` - Create new shop
- `PUT /api/shops/[id]` - Update shop
- `DELETE /api/shops/[id]` - Delete shop

### Quotes
- `GET /api/quotes` - List all quotes
- `POST /api/quotes` - Create new quote request

## Admin Panel

Access the admin panel at `/admin` to manage shops:
- View all shops in a table
- Add new shops
- Edit existing shops
- Delete shops

## Features Implemented

- [x] Supabase database integration
- [x] Admin panel for shop management
- [x] Authentication for admin panel
- [x] Email notifications for shop owners
- [x] Public shop registration form
- [x] Image upload functionality
- [x] Search and filter functionality

## Next Steps

- [ ] Shop owner dashboard (view quotes)
- [ ] Approve/reject shop listings in admin
- [ ] Deploy to Vercel
