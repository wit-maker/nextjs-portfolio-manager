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

  // 技術スタックの作成
  const createdTechnologies = {};
  for (const tech of technologies) {
    const created = await prisma.language.upsert({
      where: { name: tech.name },
      update: {},
      create: { name: tech.name },
    });
    createdTechnologies[tech.name] = created.id;
  }

  // プロジェクトのサンプルデータ
  const projects = [
    {
      name: 'ポートフォリオサイト',
      description: '自己紹介と作品を紹介するためのウェブサイト',
      status: 'IN_PROGRESS',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-03-31'),
      technologies: ['React', 'TypeScript', 'Tailwind CSS'],
      github_url: 'https://github.com/example/portfolio',
      demo_url: 'https://portfolio.example.com'
    },
    {
      name: 'タスク管理アプリ',
      description: 'シンプルで使いやすいタスク管理ツール',
      status: 'COMPLETED',
      startDate: new Date('2023-10-01'),
      endDate: new Date('2023-12-31'),
      technologies: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL'],
      github_url: 'https://github.com/example/task-manager',
      demo_url: 'https://task-manager.example.com'
    },
    {
      name: 'チャットアプリ',
      description: 'リアルタイムコミュニケーションツール',
      status: 'DRAFT',
      startDate: new Date('2024-04-01'),
      technologies: ['Node.js', 'WebSocket', 'React', 'MongoDB'],
      github_url: 'https://github.com/example/chat-app'
    }
  ];

  // プロジェクトの作成
  for (const project of projects) {
    await prisma.project.create({
      data: {
        name: project.name,
        description: project.description,
        status: project.status,
        startDate: project.startDate,
        endDate: project.endDate,
        github_url: project.github_url,
        demo_url: project.demo_url,
        projectTechnologies: {
          create: project.technologies.map(techName => ({
            language: {
              connect: { id: createdTechnologies[techName] }
            }
          }))
        }
      }
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