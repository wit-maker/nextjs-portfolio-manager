const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  try {
    // 既存の全てのプロジェクトを削除
    console.log('プロジェクトを削除中...');
    await prisma.$executeRaw`TRUNCATE TABLE projects CASCADE`;

    // プロジェクトの再作成
    console.log('新しいプロジェクトを作成中...');
    const projects = [
      {
        name: 'ポートフォリオサイト',
        description: '自己紹介と作品を紹介するためのウェブサイト',
        status: 'IN_PROGRESS',
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-03-31'),
        github_url: 'https://github.com/example/portfolio',
        demo_url: 'https://portfolio.example.com'
      },
      {
        name: 'タスク管理アプリ',
        description: 'シンプルで使いやすいタスク管理ツール',
        status: 'COMPLETED',
        startDate: new Date('2023-10-01'),
        endDate: new Date('2023-12-31'),
        github_url: 'https://github.com/example/task-manager',
        demo_url: 'https://task-manager.example.com'
      },
      {
        name: 'チャットアプリ',
        description: 'リアルタイムコミュニケーションツール',
        status: 'DRAFT',
        startDate: new Date('2024-04-01'),
        github_url: 'https://github.com/example/chat-app'
      }
    ];

    for (const project of projects) {
      await prisma.project.create({
        data: project
      });
    }

    console.log('データの修正が完了しました');

    // 結果の確認
    const result = await prisma.$queryRaw`
      SELECT id, name, status::text
      FROM projects
    `;
    console.log('\n=== 修正後のプロジェクト一覧 ===');
    console.log(JSON.stringify(result, null, 2));

  } catch (error) {
    console.error('エラーが発生しました:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });