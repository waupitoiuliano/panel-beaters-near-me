# Complete Setup Guide - Step by Step

## ✅ Step 1: Database Tables - DONE!
You've successfully created the `shops` and `quotes` tables.

## 📦 Step 2: Create Storage Bucket (for images)

1. In Supabase Dashboard, go to **Storage** (left sidebar)
2. Click **"New bucket"**
3. Name it: `shop-images`
4. Set visibility to **Public** (or configure RLS policies later)
5. Click **"Create bucket"**

## 🔐 Step 3: Set Up Authentication

1. In Supabase Dashboard, go to **Authentication** → **Settings**
2. Scroll to **"Email Auth"** section
3. Make sure **"Enable email confirmations"** is OFF (for testing) or ON (for production)
4. Click **"Save"**

## 👤 Step 4: Create Admin User

1. Go to **Authentication** → **Users**
2. Click **"Add user"** → **"Create new user"**
3. Enter:
   - Email: `admin@example.com` (use your own email)
   - Password: `your-secure-password` (choose a strong password)
   - Check **"Auto Confirm User"** (so you can login immediately)
4. Click **"Create user"**
5. **Remember these credentials** - you'll use them to log into `/admin`

## 🔑 Step 5: Get Your API Credentials

1. Go to **Settings** → **API**
2. Copy these two values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon/public key** (long string starting with `eyJ...`)

## ⚙️ Step 6: Configure Environment Variables

1. In your project root, create a file named `.env.local`
2. Add these variables:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Replace with your actual values from Step 5.

## 🚀 Step 7: Start the Application

1. Open PowerShell/Command Prompt in the project folder
2. Run:
   ```bash
   npm run dev
   ```
3. Wait for "Ready" message
4. Open: **http://localhost:3000**

## ✅ Step 8: Test Everything

### Test Public Pages:
- **Home** (`/`) - Should show empty state (no shops yet)
- **Register Shop** (`/register`) - Should show registration form

### Test Admin:
- **Admin Panel** (`/admin`) - Should redirect to `/login`
- **Login** (`/login`) - Use your admin credentials from Step 4
- **After login** - Should see admin dashboard

### Add Your First Shop:
1. In admin panel, click **"Add New Shop"**
2. Fill out the form
3. Upload an image or use an image URL
4. Click **"Save Shop"**
5. Go back to home page - shop should appear!

## 🎉 You're Done!

Your directory is now fully functional. You can:
- Add shops via admin panel
- Public can register shops
- Customers can request quotes
- All data is stored in Supabase

## Optional: Email Notifications

If you want email notifications when quotes arrive:

1. Sign up at [resend.com](https://resend.com)
2. Get your API key
3. Add to `.env.local`:
   ```env
   RESEND_API_KEY=your_resend_key
   NOTIFICATION_EMAIL=noreply@yourdomain.com
   ```

## Troubleshooting

**Can't login?**
- Check admin user was created and auto-confirmed
- Verify email/password are correct

**Shops not showing?**
- Check `.env.local` has correct Supabase URL and key
- Restart dev server after adding env vars
- Check browser console for errors

**Image upload not working?**
- Verify `shop-images` bucket exists and is public
- Check browser console for errors



