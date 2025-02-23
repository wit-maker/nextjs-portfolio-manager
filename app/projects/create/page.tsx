import { ProjectForm } from '@/components/projects/project-form';
import { Card } from '@/components/ui/card';

export default function CreateProjectPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">新規プロジェクト作成</h1>
      <Card className="p-6">
        <ProjectForm />
      </Card>
    </div>
  );
}