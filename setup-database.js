/**
 * Database Setup Script
 * Run this after creating your Vercel Postgres database
 * 
 * Usage:
 * 1. Make sure your Vercel Postgres database is created
 * 2. Run: node setup-database.js
 * 
 * This will create the waitlist table in your database.
 */

const { sql } = require('@vercel/postgres');

async function setupDatabase() {
  console.log('🗄️  Setting up MeasureMint database...\n');

  try {
    // Check if we have database connection
    if (!process.env.POSTGRES_URL) {
      console.error('❌ Error: POSTGRES_URL environment variable not found!');
      console.log('\n📋 To fix this:');
      console.log('1. Create a Vercel Postgres database in your project');
      console.log('2. Run: vercel env pull .env.local');
      console.log('3. Run this script again: node setup-database.js\n');
      process.exit(1);
    }

    console.log('✅ Database connection found');
    console.log('📊 Creating waitlist table...\n');

    // Create waitlist table
    await sql`
      CREATE TABLE IF NOT EXISTS waitlist (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        profession VARCHAR(255) NOT NULL,
        company VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        notified BOOLEAN DEFAULT FALSE
      )
    `;
    console.log('✅ Table "waitlist" created');

    // Create indexes
    await sql`
      CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email)
    `;
    console.log('✅ Index "idx_waitlist_email" created');

    await sql`
      CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON waitlist(created_at DESC)
    `;
    console.log('✅ Index "idx_waitlist_created_at" created');

    // Verify table exists
    const result = await sql`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'waitlist'
      ORDER BY ordinal_position
    `;

    console.log('\n📋 Table structure:');
    result.rows.forEach(col => {
      console.log(`   - ${col.column_name}: ${col.data_type}`);
    });

    // Check if any data exists
    const count = await sql`SELECT COUNT(*) FROM waitlist`;
    console.log(`\n📊 Current entries: ${count.rows[0].count}`);

    console.log('\n✅ Database setup complete!');
    console.log('\n🎯 Next steps:');
    console.log('1. Add ADMIN_API_KEY to Vercel environment variables');
    console.log('2. Redeploy your application');
    console.log('3. Test at: https://measuremint.app/waitlist');
    console.log('4. View admin panel at: https://measuremint.app/admin/waitlist\n');

  } catch (error) {
    console.error('\n❌ Error setting up database:', error.message);
    console.error('\nFull error:', error);
    process.exit(1);
  }
}

// Run the setup
setupDatabase();

