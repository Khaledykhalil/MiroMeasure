import { Resend } from 'resend';
import { NextResponse } from 'next/server';

// Initialize Resend only when API key is available
// During build time, this might not be set yet
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
    const { name, email, subject, category, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Send email using Resend
    const data = await resend.emails.send({
      // Once domain is verified, change to: 'MeasureMint Support <noreply@measuremint.app>'
      from: 'MeasureMint Support <onboarding@resend.dev>', // Resend's test domain (temporary)
      to: ['support@measuremint.app'], // Your support email
      replyTo: email, // User's email for easy replies
      subject: `[${category.toUpperCase()}] ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #10bb82;">New Support Request</h2>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>From:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Category:</strong> ${category}</p>
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          
          <div style="background: white; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
            <h3 style="color: #333; margin-top: 0;">Message:</h3>
            <p style="white-space: pre-wrap; color: #555;">${message}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background: #f0f9ff; border-left: 4px solid #10bb82; border-radius: 4px;">
            <p style="margin: 0; font-size: 12px; color: #666;">
              💡 <strong>Reply directly to this email</strong> to respond to ${name}
            </p>
          </div>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;" />
          
          <p style="font-size: 12px; color: #999; text-align: center;">
            Sent from MeasureMint Support Form | measuremint.app
          </p>
        </div>
      `,
    });

    return NextResponse.json(
      { 
        success: true, 
        message: 'Support request sent successfully',
        id: data.id 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error sending support email:', error);
    return NextResponse.json(
      { 
        error: 'Failed to send support request',
        details: error.message 
      },
      { status: 500 }
    );
  }
}
