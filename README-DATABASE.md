# Database Setup Guide for Noievoi Industrial Website

This guide will help you set up and configure the PostgreSQL database and Prisma ORM for the Noievoi Industrial Website.

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [PostgreSQL](https://www.postgresql.org/download/) v14 or higher
- [PgAdmin](https://www.pgadmin.org/download/) (optional but recommended)
- [Postman](https://www.postman.com/downloads/) (optional for API testing)

## Installation Steps

### 1. Install PostgreSQL

Download and install PostgreSQL from the official website:
- [PostgreSQL Downloads](https://www.postgresql.org/download/)

During installation:
- Remember the password you set for the postgres user
- Keep the default port (5432)
- Complete the installation process

### 2. Install PgAdmin (Optional)

PgAdmin is a graphical management tool for PostgreSQL:
- [PgAdmin Downloads](https://www.pgadmin.org/download/)

### 3. Create a Database

You can create a database using PgAdmin or the PostgreSQL command line:

**Using PgAdmin:**
1. Open PgAdmin
2. Connect to your PostgreSQL server
3. Right-click on "Databases" and select "Create" → "Database"
4. Name it `noievoi` and save

**Using Command Line:**
```bash
psql -U postgres
CREATE DATABASE noievoi;
\q
```

### 4. Configure Environment Variables

Create a `.env` file in the project root with the following content:

```
# Database connection
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/noievoi?schema=public"

# Next Auth
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

Replace `your_password` with the password you set during PostgreSQL installation.

### 5. Install Prisma CLI

```bash
npm install -g prisma
```

### 6. Initialize and Generate Prisma Client

The Prisma schema is already defined in `prisma/schema.prisma`. Generate the Prisma client:

```bash
npx prisma generate
```

### 7. Apply Database Migrations

This will create all the necessary tables in your database:

```bash
npx prisma migrate dev --name init
```

### 8. Seed the Database (Optional)

If you want to populate your database with initial data:

```bash
npx prisma db seed
```

## Database Schema

The database schema is defined in `prisma/schema.prisma` and includes the following models:

- **User**: Admin users who can manage the website content
- **Session**: Authentication sessions for users
- **Page**: Website pages and their content
- **PageSection**: Sections within pages
- **ContentEdit**: History of content edits
- **Project**: Portfolio projects
- **TeamMember**: Team member profiles
- **Service**: Services offered by the company
- **SiteConfig**: Website configuration settings
- **ContactSubmission**: Contact form submissions

## Prisma Studio

Prisma provides a GUI to view and edit your database:

```bash
npx prisma studio
```

This will open a browser window at http://localhost:5555 where you can manage your data.

## API Routes

The website uses Next.js API routes to interact with the database:

- `/api/auth/*` - Authentication endpoints
- `/api/team/*` - Team member management
- `/api/projects/*` - Portfolio project management
- `/api/services/*` - Service management
- `/api/content/*` - Content editing
- `/api/contact/*` - Contact form submissions

## Troubleshooting

### Connection Issues

If you cannot connect to the database, check:
1. PostgreSQL service is running
2. The DATABASE_URL is correctly configured in .env
3. The database exists
4. The user has proper permissions

### Migration Issues

If migrations fail:
1. Check if there are any pending migrations
   ```bash
   npx prisma migrate status
   ```
2. Reset the database (caution: this deletes all data)
   ```bash
   npx prisma migrate reset
   ```

## Additional Resources

- [Prisma Documentation](https://www.prisma.io/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [PgAdmin Documentation](https://www.pgadmin.org/docs/)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction) 