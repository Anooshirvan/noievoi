import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET /api/projects - Get all projects
export async function GET() {
  try {
    const projects = await db.project.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

// POST /api/projects - Create a new project
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Basic validation
    if (!data.title || !data.description || !data.category) {
      return NextResponse.json(
        { error: 'Title, description and category are required' },
        { status: 400 }
      );
    }
    
    // Create new project
    const project = await db.project.create({
      data: {
        title: data.title,
        description: data.description,
        category: data.category,
        client: data.client || null,
        location: data.location || null,
        year: data.year || null,
        imageUrl: data.imageUrl || null,
        featured: data.featured || false
      }
    });
    
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
} 