const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('データベースの生のデータを確認します...');

  // RAWクエリでプロジェクトのデータを確認
  const rawProjects = await prisma.$queryRaw`
    SELECT id, name, status::text
    FROM projects
  `;
  
  console.log('\n=== プロジェクトの生データ ===');
  console.log(JSON.stringify(rawProjects, null, 2));
}

main()
  .catch((e) => {
    console.error('エラーが発生しました:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });