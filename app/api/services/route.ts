import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET /api/services - Get all services
export async function GET() {
  try {
    const services = await db.service.findMany({
      orderBy: {
        order: 'asc'
      }
    });
    
    return NextResponse.json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    );
  }
}

// POST /api/services - Create a new service
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Basic validation
    if (!data.title || !data.slug || !data.description) {
      return NextResponse.json(
        { error: 'Title, slug, and description are required' },
        { status: 400 }
      );
    }
    
    // Find the highest order value to place the new service at the end
    const lastService = await db.service.findFirst({
      orderBy: {
        order: 'desc'
      }
    });
    
    const newOrder = lastService && lastService.order ? lastService.order + 1 : 1;
    
    // Create new service
    const service = await db.service.create({
      data: {
        title: data.title,
        slug: data.slug,
        description: data.description,
        imagePath: data.imagePath || null,
        icon: data.icon || 'settings',
        benefits: data.benefits || null,
        order: newOrder,
        published: data.published !== undefined ? data.published : true
      }
    });
    
    return NextResponse.json(service, { status: 201 });
  } catch (error) {
    console.error('Error creating service:', error);
    return NextResponse.json(
      { error: 'Failed to create service' },
      { status: 500 }
    );
  }
} 