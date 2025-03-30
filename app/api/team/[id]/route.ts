import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

interface Params {
  params: {
    id: string;
  };
}

// GET /api/team/[id] - Get a single team member
export async function GET(request: NextRequest, { params }: Params) {
  try {
    const teamMember = await db.teamMember.findUnique({
      where: {
        id: params.id,
      },
    });
    
    if (!teamMember) {
      return NextResponse.json(
        { error: 'Team member not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(teamMember);
  } catch (error) {
    console.error('Error fetching team member:', error);
    return NextResponse.json(
      { error: 'Failed to fetch team member' },
      { status: 500 }
    );
  }
}

// PUT /api/team/[id] - Update a team member
export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const data = await request.json();
    
    // Basic validation
    if (!data.name || !data.position || !data.bio || !data.location) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Check if the team member exists
    const existingMember = await db.teamMember.findUnique({
      where: {
        id: params.id,
      },
    });
    
    if (!existingMember) {
      return NextResponse.json(
        { error: 'Team member not found' },
        { status: 404 }
      );
    }
    
    // Update the team member
    const updatedMember = await db.teamMember.update({
      where: {
        id: params.id,
      },
      data: {
        name: data.name,
        position: data.position,
        bio: data.bio,
        location: data.location,
        imageColor: data.imageColor || 'bg-primary',
        email: data.email || null,
        linkedinUrl: data.linkedinUrl || null,
        twitterUrl: data.twitterUrl || null,
      },
    });
    
    return NextResponse.json(updatedMember);
  } catch (error) {
    console.error('Error updating team member:', error);
    return NextResponse.json(
      { error: 'Failed to update team member' },
      { status: 500 }
    );
  }
}

// DELETE /api/team/[id] - Delete a team member
export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    // Check if the team member exists
    const existingMember = await db.teamMember.findUnique({
      where: {
        id: params.id,
      },
    });
    
    if (!existingMember) {
      return NextResponse.json(
        { error: 'Team member not found' },
        { status: 404 }
      );
    }
    
    // Delete the team member
    await db.teamMember.delete({
      where: {
        id: params.id,
      },
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting team member:', error);
    return NextResponse.json(
      { error: 'Failed to delete team member' },
      { status: 500 }
    );
  }
} 