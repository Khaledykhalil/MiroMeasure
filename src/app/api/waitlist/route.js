import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request) {
  try {
    // Check if Resend is configured
    if (!resend) {
      return NextResponse.json(
        { error: 'Email service not configured. Please contact support@measuremint.app directly.' },
        { status: 503 }
      );
    }

    const body = await request.json();
    const { name, email, profession, company } = body;

    // Validate required fields
    if (!name || !email || !profession || !company) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Send notification email to you
    await resend.emails.send({
      from: 'MeasureMint Waitlist <onboarding@resend.dev>',
      to: ['khaledykhalil09@gmail.com'],
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
        message: 'Successfully joined waitlist'
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error processing waitlist signup:', error);
    return NextResponse.json(
      { 
        error: 'Failed to process waitlist signup',
        details: error.message 
      },
      { status: 500 }
    );
  }
}

