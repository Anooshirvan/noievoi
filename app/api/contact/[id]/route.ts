import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET /api/contact/[id] - Get a single contact message
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const message = await db.contactMessage.findUnique({
      where: {
        id: params.id,
      },
    });
    
    if (!message) {
      return NextResponse.json(
        { error: 'Contact message not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(message);
  } catch (error) {
    console.error('Error fetching contact message:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contact message' },
      { status: 500 }
    );
  }
}

// PATCH /api/contact/[id] - Update a contact message status
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    
    // Check if the message exists
    const existingMessage = await db.contactMessage.findUnique({
      where: {
        id: params.id,
      },
    });
    
    if (!existingMessage) {
      return NextResponse.json(
        { error: 'Contact message not found' },
        { status: 404 }
      );
    }
    
    // Only allow updating status field
    if (!data.status || !['unread', 'read', 'replied'].includes(data.status)) {
      return NextResponse.json(
        { error: 'Invalid status value' },
        { status: 400 }
      );
    }
    
    // Update the message status
    const updatedMessage = await db.contactMessage.update({
      where: {
        id: params.id,
      },
      data: {
        status: data.status,
      },
    });
    
    return NextResponse.json(updatedMessage);
  } catch (error) {
    console.error('Error updating contact message:', error);
    return NextResponse.json(
      { error: 'Failed to update contact message' },
      { status: 500 }
    );
  }
}

// DELETE /api/contact/[id] - Delete a contact message
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if the message exists
    const existingMessage = await db.contactMessage.findUnique({
      where: {
        id: params.id,
      },
    });
    
    if (!existingMessage) {
      return NextResponse.json(
        { error: 'Contact message not found' },
        { status: 404 }
      );
    }
    
    // Delete the message
    await db.contactMessage.delete({
      where: {
        id: params.id,
      },
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting contact message:', error);
    return NextResponse.json(
      { error: 'Failed to delete contact message' },
      { status: 500 }
    );
  }
} 