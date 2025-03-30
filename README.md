# Noievoi Website

A modern web application built with Next.js, TypeScript, Tailwind CSS, and PostgreSQL.

## Features

- **Responsive Design**: Fully responsive design that works on all device sizes
- **Modern UI**: Built with Tailwind CSS for a clean, modern look
- **Full-Stack Application**: Frontend and backend integration
- **Database Integration**: PostgreSQL database with Prisma ORM
- **API Routes**: RESTful API endpoints for team members, projects, services, and contact messages
- **Admin Dashboard**: Secure admin interface for content management

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Planned implementation with NextAuth.js
- **Deployment**: Ready for deployment on Vercel

## Getting Started

### Prerequisites

- Node.js
- PostgreSQL database
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Anooshirvan/noievoi.git
   cd noievoi
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/noievoi"
   DIRECT_URL="postgresql://username:password@localhost:5432/noievoi"
   ```

4. Set up the database:
   ```bash
   npx prisma db push
   npm run db:seed
   ```

5. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Database Management

- **Prisma Studio**: Run `npx prisma studio` to access the database through Prisma's GUI
- **Database Schema**: Located in `prisma/schema.prisma`
- **Seed Data**: Initial data setup in `prisma/seed.js`

## Project Structure

- `/app`: Next.js application with client and server components
- `/app/components`: Reusable React components
- `/app/api`: API routes for backend functionality
- `/prisma`: Database schema and migrations
- `/public`: Static assets

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Prisma team for the great ORM
