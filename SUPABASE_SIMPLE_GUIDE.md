# Super Simple Supabase Setup - Step by Step

**Don't worry if this seems confusing. Just follow each step exactly as written, one at a time.**

---

## PART 1: Create Your Supabase Account

### Step 1.1: Go to Supabase Website
- Open your web browser (Chrome, Safari, Edge, Firefox - any browser)
- Type in the address bar: `https://supabase.com`
- Press Enter
- You should see a website with "Supabase" at the top

### Step 1.2: Click Sign Up
- Look for a button that says **"Start Your Project"** or **"Sign Up"** (usually at the top right or in the middle)
- Click it

### Step 1.3: Create Account
- Choose how to sign up:
  - **Option A**: Click "Continue with Google" (easiest - uses your Google account)
  - **Option B**: Click "Continue with GitHub" (if you have GitHub)
  - **Option C**: Enter your email and password (if you don't have Google/GitHub)
- Follow the instructions on screen
- Verify your email if it asks you to (check your email inbox and click a link)

---

## PART 2: Create Your Database Project

### Step 2.1: Create New Project
- You should now be logged into Supabase
- Look for a button that says **"New Project"** or **"Create New Project"**
- Click it

### Step 2.2: Fill in the Form
You'll see a form. Fill it in like this:

**Field 1: "Project Name"**
- Type: `panel-beaters`
- (This is just a name for your database - it doesn't matter what you call it)

**Field 2: "Database Password"**
- Create a password (something strong like: `MyPanelBeaters2024!`)
- **IMPORTANT**: Write this password down in a safe place - you might need it later
- Re-type it to confirm

**Field 3: "Region"**
- Click the dropdown
- Look for a region closest to Australia (something like "Sydney" or "Asia Pacific")
- Click it

### Step 2.3: Click Create
- Click the **"Create new project"** button
- **WAIT** - this will take 2-3 minutes. You'll see a loading screen. Don't close the page!
- When it's done, you'll see a green checkmark and new buttons appear

---

## PART 3: Get Your Secret Keys

### Step 3.1: Wait for Project to Load
- After the loading finishes, you should see a menu on the left side of the screen
- Don't click anything yet - just wait for everything to fully load

### Step 3.2: Click "Settings"
- Look at the bottom left of the screen
- You'll see a gear icon (⚙️) with the word "Settings" next to it
- Click on it

### Step 3.3: Click "API"
- A menu will appear on the left side
- Find and click **"API"** (it should be highlighted in blue or look like a button)

### Step 3.4: Find Your Keys
You should now see two important pieces of information:

**Look for:**
1. **"Project URL"** - This looks like: `https://xxxxxxxxxxxxx.supabase.co`
   - Find this text and copy it (right-click, copy)
   - Save it somewhere - we need it in a moment

2. **"anon public"** - This is a long string of random letters and numbers
   - Find this text and copy it (right-click, copy)
   - Save it somewhere - we need it in a moment

**These are your "secret keys" - treat them like passwords!**

---

## PART 4: Update Your File

### Step 4.1: Open Your Project Folder
- Open your file browser (Windows Explorer or Finder)
- Navigate to: `C:\Users\[YourName]\Desktop\panel-beaters-near-me`
- (Replace [YourName] with your actual username)

### Step 4.2: Find the File
- Inside that folder, look for a file called: `.env.local`
- (It might look like a text file - if you don't see it, it might be hidden)

**If you don't see `.env.local`:**
- Right-click in the empty space
- Click "Show hidden files" or "View hidden files"
- Now you should see it

### Step 4.3: Open the File
- Right-click on `.env.local`
- Click **"Open with"**
- Choose **"Notepad"** or **"VS Code"** (any text editor)
- The file will open

### Step 4.4: Update the Content
You'll see something like this:

```
NEXT_PUBLIC_SUPABASE_URL=https://jufqnypiqrvprmjxgexz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Here's what to do:**

**Line 1: NEXT_PUBLIC_SUPABASE_URL**
- Delete everything after the `=` sign (the URL that's there)
- Paste the "Project URL" you copied in Step 3.4
- It should now look like: `NEXT_PUBLIC_SUPABASE_URL=https://YOUR_URL.supabase.co`

**Line 2: NEXT_PUBLIC_SUPABASE_ANON_KEY**
- Delete everything after the `=` sign (the long string that's there)
- Paste the "anon public" key you copied in Step 3.4
- It should now look like: `NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...` (a long string)

**Line 3: NEXT_PUBLIC_SITE_URL**
- **Don't change this one** - leave it as: `http://localhost:3000`

### Step 4.5: Save the File
- Press **Ctrl + S** (or go to File > Save)
- Close the file
- Done! ✅

---

## PART 5: Create Your Database Tables

### Step 5.1: Go Back to Supabase
- Go back to your Supabase website in your browser
- You should still be logged in

### Step 5.2: Click "SQL Editor"
- On the left side menu, find **"SQL Editor"**
- Click it

### Step 5.3: Create New Query
- Look for a button that says **"New Query"** (usually at the top right)
- Click it
- You should see a big empty text box

### Step 5.4: Copy the SQL Code
Below this, you'll see a long block of code in a box. **Copy all of it:**
- Click at the very beginning of the code block (before the `--` at the top)
- Hold Shift and click at the very end
- Or: Select all the text (Ctrl + A if it's the only thing on the page)
- Right-click and click "Copy" (or press Ctrl + C)

**HERE'S THE CODE TO COPY:**

```
-- Create shops table
CREATE TABLE shops (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  suburb TEXT NOT NULL,
  state TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  photo TEXT,
  rating NUMERIC(3,1) DEFAULT 0,
  "minPrice" INTEGER DEFAULT 0,
  services TEXT[] DEFAULT '{}',
  "createdAt" TIMESTAMP DEFAULT now(),
  "updatedAt" TIMESTAMP DEFAULT now(),
  approved BOOLEAN DEFAULT true
);

CREATE INDEX idx_shops_suburb ON shops(suburb);
CREATE INDEX idx_shops_state ON shops(state);
CREATE INDEX idx_shops_name ON shops(name);

CREATE TABLE quotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "shopId" UUID NOT NULL REFERENCES shops(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  "vehicleInfo" TEXT NOT NULL,
  "serviceNeeded" TEXT NOT NULL,
  message TEXT,
  "createdAt" TIMESTAMP DEFAULT now()
);

CREATE INDEX idx_quotes_shop_id ON quotes("shopId");
CREATE INDEX idx_quotes_created_at ON quotes("createdAt");

ALTER TABLE shops ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view approved shops" ON shops
  FOR SELECT USING (approved = true);

CREATE POLICY "Admins can view all shops" ON shops
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Public can create shops" ON shops
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can update shops" ON shops
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can delete shops" ON shops
  FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Public can create quotes" ON quotes
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Public can view quotes" ON quotes
  FOR SELECT USING (true);
```

### Step 5.5: Paste Into Supabase
- Click in the big empty text box in Supabase (where it says "-- SQL query goes here" or is empty)
- Right-click and click "Paste" (or press Ctrl + V)
- All the code should appear in the box

### Step 5.6: Click Run
- Look for a button that says **"RUN"** (usually dark blue button at the top right, might also say "Execute")
- Click it
- **WAIT** - the code is running. You might see a loading animation.

### Step 5.7: Check for Success
- When it's done, you should see one of these messages:
  - **"Success"** ✅
  - **"Query executed successfully"** ✅
  - Nothing appears to happen (but that's okay - the tables were created) ✅

- If you see an error message in red, take a screenshot and send it to me

---

## PART 6: Verify Everything Worked

### Step 6.1: Click "Table Editor"
- On the left menu, click **"Table Editor"** (should be near where you clicked "SQL Editor")

### Step 6.2: Look for Your Tables
- On the left side, you should now see:
  - `shops` (this is one table)
  - `quotes` (this is another table)

**If you see both tables, you've done it! ✅**

**If you don't see them:**
- Wait 30 seconds and refresh the page (press F5)
- Try again

---

## PART 7: Test That Everything Works

### Step 7.1: Open Terminal/PowerShell
- Press Windows key + R (or search for "PowerShell")
- Type: `powershell`
- Press Enter
- A black window should open

### Step 7.2: Navigate to Your Folder
- Type this command and press Enter:
```
cd C:\Users\[YourName]\Desktop\panel-beaters-near-me
```
(Replace [YourName] with your actual Windows username)

### Step 7.3: Start the App
- Type this and press Enter:
```
npm run dev
```
- You'll see some messages - wait for it to say **"Ready in X seconds"**
- When you see that, don't close this window

### Step 7.4: Open in Browser
- Open your browser
- Type in the address bar: `http://localhost:3000`
- Press Enter
- The website should load! ✅

**If it loads without errors, your database is working!**

---

## Summary

You've now:
1. Created a Supabase account ✅
2. Created a database project ✅
3. Got your secret keys ✅
4. Updated your project file ✅
5. Created database tables ✅
6. Verified everything works ✅

**You're done with the hard part!**

Next, I'll add SEO features, create a blog generator, and populate your directory with realistic shop data.

---

## Need Help?

If you get stuck on any step:
- Take a screenshot of what you see
- Tell me which step number you're on
- I'll help you through it
