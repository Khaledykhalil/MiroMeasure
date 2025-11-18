import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { Pool } from 'pg';

// CORS headers helper
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// Handle OPTIONS requests for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders,
  });
}

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Create PostgreSQL connection pool
// Configure SSL for Supabase (handles self-signed certificates)
const getPoolConfig = () => {
  const connectionString = process.env.POSTGRES_URL;
  if (!connectionString) return null;
  
  // Remove query parameters as pg handles SSL via config object
  const cleanConnectionString = connectionString.split('?')[0];
  
  return {
    connectionString: cleanConnectionString,
    // Supabase requires SSL, but we need to accept self-signed certificates
    ssl: {
      rejectUnauthorized: false
    }
  };
};

const poolConfig = getPoolConfig();
const pool = poolConfig ? new Pool(poolConfig) : null;

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, profession, company } = body;

    // Validate required fields
    if (!name || !email || !profession || !company) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400, headers: corsHeaders }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400, headers: corsHeaders }
      );
    }

    // Check if email already exists
    if (pool) {
      try {
        const existingUser = await pool.query(
          'SELECT email FROM waitlist WHERE email = $1',
          [email]
        );
        
        if (existingUser.rows.length > 0) {
          return NextResponse.json(
            { error: 'This email is already on the waitlist' },
            { status: 409, headers: corsHeaders }
          );
        }
      } catch (dbError) {
        console.log('Database check error (table might not exist yet):', dbError.message);
      }

      // Store in database
      try {
        await pool.query(
          'INSERT INTO waitlist (name, email, profession, company, created_at) VALUES ($1, $2, $3, $4, NOW())',
          [name, email, profession, company]
        );
        console.log('✅ Stored in database:', email);
      } catch (dbError) {
        console.error('❌ Database storage failed:', dbError);
        // Continue anyway - we'll still send emails
      }
    } else {
      console.log('⚠️ Database pool not initialized - skipping database storage');
    }

    // Check if Resend is configured
    if (!resend) {
      return NextResponse.json(
        { 
          success: true,
          message: 'Joined waitlist (stored in database, email service not configured)',
          stored: true
        },
        { status: 200, headers: corsHeaders }
      );
    }

    // Send notification email to admin
    const adminEmail = process.env.ADMIN_EMAIL || 'support@measuremint.app';
    await resend.emails.send({
      from: 'MeasureMint Waitlist <onboarding@resend.dev>',
      to: [adminEmail],
      replyTo: email,
      subject: `New Waitlist Signup: ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #10bb82;">New Waitlist Signup!</h2>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Profession:</strong> ${profession}</p>
            <p><strong>Company:</strong> ${company}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background: #f0f9ff; border-left: 4px solid #10bb82; border-radius: 4px;">
            <p style="margin: 0; font-size: 12px; color: #666;">
              💡 <strong>Reply directly to this email</strong> to contact ${name}
            </p>
          </div>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;" />
          
          <p style="font-size: 12px; color: #999; text-align: center;">
            MeasureMint Waitlist | measuremint.app
          </p>
        </div>
      `,
    });

    // Send confirmation email to the user
    await resend.emails.send({
      from: 'MeasureMint <onboarding@resend.dev>',
      to: [email],
      subject: 'Welcome to the MeasureMint Waitlist!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #10bb82;">You're on the list, ${name}!</h2>
          
          <p style="font-size: 16px; line-height: 1.6; color: #333;">
            Thank you for joining the MeasureMint waitlist. We're excited to have you on board!
          </p>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">What happens next?</h3>
            <ul style="color: #666; line-height: 1.8;">
              <li>📧 You'll receive updates about our launch</li>
              <li>🎉 Be the first to know when we go live</li>
              <li>🌟 Get exclusive early access to new features</li>
            </ul>
          </div>
          
          <p style="font-size: 14px; color: #666;">
            We respect your privacy and will only send you important updates about MeasureMint.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://measuremint.app" style="display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; border-radius: 8px; font-weight: 600;">
              Visit MeasureMint
            </a>
          </div>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;" />
          
          <p style="font-size: 12px; color: #999; text-align: center;">
            © 2025 MeasureMint. All rights reserved.<br>
            <a href="https://measuremint.app/support" style="color: #10bb82; text-decoration: none;">Contact Support</a>
          </p>
        </div>
      `,
    });

    return NextResponse.json(
      { 
        success: true, 
        message: 'Successfully joined waitlist',
        stored: true,
        emailsSent: true
      },
      { status: 200, headers: corsHeaders }
    );

  } catch (error) {
    console.error('Error processing waitlist signup:', error);
    return NextResponse.json(
      { 
        error: 'Failed to process waitlist signup',
        details: error.message 
      },
      { status: 500, headers: corsHeaders }
    );
  }
}

// GET endpoint to retrieve waitlist entries (for admin use)
export async function GET(request) {
  try {
    // Simple authentication check (you can enhance this)
    const authHeader = request.headers.get('authorization');
    const expectedAuth = process.env.ADMIN_API_KEY;
    
    if (!expectedAuth || authHeader !== `Bearer ${expectedAuth}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401, headers: corsHeaders }
      );
    }

    // Get all waitlist entries
    if (!pool) {
      return NextResponse.json(
        { 
          error: 'Database not configured',
          details: 'POSTGRES_URL not set'
        },
        { status: 500, headers: corsHeaders }
      );
    }

    const result = await pool.query(
      'SELECT id, name, email, profession, company, created_at, notified FROM waitlist ORDER BY created_at DESC'
    );

    return NextResponse.json(
      { 
        success: true,
        count: result.rows.length,
        waitlist: result.rows
      },
      { status: 200, headers: corsHeaders }
    );

  } catch (error) {
    console.error('Error fetching waitlist:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch waitlist',
        details: error.message 
      },
      { status: 500, headers: corsHeaders }
    );
  }
}

