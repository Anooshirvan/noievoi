import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET /api/services/[id] - Get a single service
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const service = await db.service.findUnique({
      where: {
        id: params.id,
      },
    });
    
    if (!service) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(service);
  } catch (error) {
    console.error('Error fetching service:', error);
    return NextResponse.json(
      { error: 'Failed to fetch service' },
      { status: 500 }
    );
  }
}

// PUT /api/services/[id] - Update a service
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    
    // Basic validation
    if (!data.title || !data.slug || !data.description) {
      return NextResponse.json(
        { error: 'Title, slug, and description are required' },
        { status: 400 }
      );
    }
    
    // Check if the service exists
    const existingService = await db.service.findUnique({
      where: {
        id: params.id,
      },
    });
    
    if (!existingService) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      );
    }
    
    // Update the service
    const updatedService = await db.service.update({
      where: {
        id: params.id,
      },
      data: {
        title: data.title,
        slug: data.slug,
        description: data.description,
        imagePath: data.imagePath !== undefined ? data.imagePath : existingService.imagePath,
        icon: data.icon || existingService.icon,
        benefits: data.benefits !== undefined ? data.benefits : existingService.benefits,
        order: data.order !== undefined ? data.order : existingService.order,
        published: data.published !== undefined ? data.published : existingService.published,
      },
    });
    
    return NextResponse.json(updatedService);
  } catch (error) {
    console.error('Error updating service:', error);
    return NextResponse.json(
      { error: 'Failed to update service' },
      { status: 500 }
    );
  }
}

// DELETE /api/services/[id] - Delete a service
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if the service exists
    const existingService = await db.service.findUnique({
      where: {
        id: params.id,
      },
    });
    
    if (!existingService) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      );
    }
    
    // Delete the service
    await db.service.delete({
      where: {
        id: params.id,
      },
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting service:', error);
    return NextResponse.json(
      { error: 'Failed to delete service' },
      { status: 500 }
    );
  }
} 