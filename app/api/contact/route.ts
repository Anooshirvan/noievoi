import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET /api/contact - Get all contact messages
export async function GET() {
  try {
    const messages = await db.contactMessage.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    return NextResponse.json(messages);
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contact messages' },
      { status: 500 }
    );
  }
}

// POST /api/contact - Submit a new contact message
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Basic validation
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        { error: 'Name, email and message are required' },
        { status: 400 }
      );
    }
    
    // Create new contact message
    const contactMessage = await db.contactMessage.create({
      data: {
        name: data.name,
        email: data.email,
        company: data.company || null,
        phone: data.phone || null,
        subject: data.subject || 'General Inquiry',
        message: data.message,
        status: 'unread'
      }
    });
    
    return NextResponse.json(contactMessage, { status: 201 });
  } catch (error) {
    console.error('Error creating contact message:', error);
    return NextResponse.json(
      { error: 'Failed to submit contact message' },
      { status: 500 }
    );
  }
} 