import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET /api/team - Get all team members
export async function GET() {
  try {
    const teamMembers = await db.teamMember.findMany({
      orderBy: {
        name: 'asc'
      }
    });
    
    return NextResponse.json(teamMembers);
  } catch (error) {
    console.error('Error fetching team members:', error);
    return NextResponse.json(
      { error: 'Failed to fetch team members' },
      { status: 500 }
    );
  }
}

// POST /api/team - Create a new team member
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Basic validation
    if (!data.name || !data.position || !data.bio || !data.location) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    const teamMember = await db.teamMember.create({
      data: {
        name: data.name,
        position: data.position,
        bio: data.bio,
        location: data.location,
        imageColor: data.imageColor || 'bg-primary',
        email: data.email || null,
        linkedinUrl: data.linkedinUrl || null,
        twitterUrl: data.twitterUrl || null,
      }
    });
    
    return NextResponse.json(teamMember, { status: 201 });
  } catch (error) {
    console.error('Error creating team member:', error);
    return NextResponse.json(
      { error: 'Failed to create team member' },
      { status: 500 }
    );
  }
} 