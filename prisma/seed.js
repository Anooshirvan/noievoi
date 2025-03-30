const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@noievoi.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@noievoi.com',
      password: adminPassword,
      role: 'ADMIN',
    },
  });
  console.log(`Created admin user: ${admin.email}`);

  // Create team members
  const teamMembers = [
    {
      name: 'Robert Mitchell',
      position: 'CEO & Founder',
      location: 'New York',
      bio: 'With over 20 years of experience in industrial engineering and global operations, Robert leads our team with a focus on innovation and sustainable development practices.',
      imageColor: 'bg-primary',
    },
    {
      name: 'Sarah Johnson',
      position: 'Chief Technical Officer',
      location: 'London',
      bio: 'Sarah has pioneered numerous technical innovations in industrial automation and brings her expertise in emerging technologies to lead our R&D initiatives.',
      imageColor: 'bg-accent',
    },
    {
      name: 'Michael Wong',
      position: 'Director of Operations',
      location: 'Singapore',
      bio: 'Michael oversees our operations across Asia, specializing in supply chain optimization and manufacturing process improvement.',
      imageColor: 'bg-secondary',
    },
    {
      name: 'Aisha Patel',
      position: 'Head of Sustainable Solutions',
      location: 'Dubai',
      bio: 'Aisha leads our sustainability initiatives, focusing on renewable energy integration and environmentally conscious industrial practices.',
      imageColor: 'bg-primary',
    },
    {
      name: 'Carlos Rodriguez',
      position: 'Regional Director',
      location: 'São Paulo',
      bio: 'Carlos manages our Latin American operations, with expertise in infrastructure development and industrial compliance in emerging markets.',
      imageColor: 'bg-accent',
    },
    {
      name: 'Liu Wei',
      position: 'Manufacturing Solutions Lead',
      location: 'Shanghai',
      bio: 'Wei specializes in advanced manufacturing technologies, leading our Industry 4.0 implementation teams across global facilities.',
      imageColor: 'bg-secondary',
    },
  ];

  for (const member of teamMembers) {
    await prisma.teamMember.upsert({
      where: { 
        id: `seed-${member.name.toLowerCase().replace(/\s+/g, '-')}` 
      },
      update: {},
      create: {
        id: `seed-${member.name.toLowerCase().replace(/\s+/g, '-')}`,
        ...member,
      },
    });
  }
  console.log(`Added ${teamMembers.length} team members`);

  // Create sample projects
  const projects = [
    {
      title: 'Advanced Manufacturing Facility',
      description: 'Design and implementation of a state-of-the-art manufacturing facility featuring fully automated production lines and IoT integration throughout all processes.',
      category: 'Manufacturing',
      client: 'Global Technologies Inc.',
      completionDate: new Date('2023-06-15'),
      technologies: ['Industrial Automation', 'IoT', 'AI Process Control'],
      featured: true,
    },
    {
      title: 'Renewable Energy Grid Integration',
      description: 'Development of a smart grid system integrating multiple renewable energy sources with traditional power infrastructure, optimizing energy distribution across industrial zones.',
      category: 'Energy',
      client: 'EcoPower Systems',
      completionDate: new Date('2023-09-22'),
      technologies: ['Smart Grid', 'Solar Integration', 'Energy Storage'],
      featured: true,
    },
    {
      title: 'Port Logistics Optimization',
      description: 'Comprehensive overhaul of port logistics operations, implementing automated container management and real-time tracking systems to reduce transit times by 35%.',
      category: 'Infrastructure',
      client: 'Atlantic Shipping Authority',
      completionDate: new Date('2023-11-30'),
      technologies: ['Supply Chain Optimization', 'Automated Logistics', 'Real-time Tracking'],
      featured: false,
    },
    {
      title: 'Oil Refinery Safety Systems',
      description: 'Design and implementation of advanced safety monitoring systems using IoT sensors and predictive analytics to prevent equipment failures and enhance worker safety.',
      category: 'Safety & Compliance',
      client: 'PetroGlobal Industries',
      completionDate: new Date('2024-01-18'),
      technologies: ['Industrial IoT', 'Predictive Maintenance', 'Safety Systems'],
      featured: false,
    },
  ];

  for (const project of projects) {
    await prisma.project.upsert({
      where: { 
        id: `seed-${project.title.toLowerCase().replace(/\s+/g, '-')}` 
      },
      update: {},
      create: {
        id: `seed-${project.title.toLowerCase().replace(/\s+/g, '-')}`,
        ...project,
      },
    });
  }
  console.log(`Added ${projects.length} projects`);

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 