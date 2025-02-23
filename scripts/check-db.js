const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('データベースの状態を確認します...');

  // プロジェクトのデータを確認
  console.log('\n=== プロジェクト一覧 ===');
  const projects = await prisma.project.findMany();
  console.log(JSON.stringify(projects, null, 2));

  // 技術スタックのデータを確認
  console.log('\n=== 技術スタック一覧 ===');
  const languages = await prisma.language.findMany();
  console.log(JSON.stringify(languages, null, 2));

  // プロジェクトと技術スタックの関連を確認
  console.log('\n=== プロジェクトと技術スタックの関連 ===');
  const projectTechnologies = await prisma.projectTechnology.findMany();
  console.log(JSON.stringify(projectTechnologies, null, 2));
}

main()
  .catch((e) => {
    console.error('エラーが発生しました:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });