const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // 技術スタックのシードデータ
  const technologies = [
    { name: 'JavaScript' },
    { name: 'TypeScript' },
    { name: 'Python' },
    { name: 'Java' },
    { name: 'Ruby' },
    { name: 'Go' },
    { name: 'PHP' },
    { name: 'React' },
    { name: 'Next.js' },
    { name: 'Vue.js' },
    { name: 'Angular' },
    { name: 'Node.js' },
    { name: 'Django' },
    { name: 'Ruby on Rails' },
    { name: 'Laravel' },
    { name: 'PostgreSQL' },
    { name: 'MySQL' },
    { name: 'MongoDB' },
    { name: 'Redis' },
    { name: 'Docker' },
    { name: 'Kubernetes' },
    { name: 'AWS' },
    { name: 'GCP' },
    { name: 'Azure' },
    { name: 'GraphQL' },
    { name: 'REST API' },
    { name: 'WebSocket' },
    { name: 'Prisma' },
    { name: 'Tailwind CSS' },
    { name: 'Material UI' }
  ];

  for (const tech of technologies) {
    await prisma.language.upsert({
      where: { name: tech.name },
      update: {},
      create: { name: tech.name },
    });
  }

  console.log('シードデータの投入が完了しました');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });