import React from 'react';

const ProjectLinks: React.FC = () => {
  return (
    <div className="w-full bg-white dark:bg-gray-800 p-6 space-y-4">
      <Card className="bg-card">
        <CardHeader className="bg-card">
          <CardTitle className="text-xl font-bold text-[#2c3e50] dark:text-[#e0e0e0]">
            プロジェクト管理
          </CardTitle>
          <CardDescription className="text-[#666666] dark:text-[#a0a0a0]">
            プロジェクトの進捗管理や時間追跡を行えます
          </CardDescription>
        </CardHeader>
        <CardContent className="bg-card space-y-4">
          <a 
            href="/projects" 
            className="block"
          >
            <Button 
              className="w-full bg-[#3498db] hover:bg-[#2980b9] text-white"
            >
              プロジェクト一覧を表示
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </a>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-card p-4">
              <div className="flex items-center space-x-2 text-[#666666] dark:text-[#a0a0a0]">
                <CheckCircle className="h-5 w-5" />
                <span>タスク管理</span>
              </div>
            </Card>
            
            <Card className="bg-card p-4">
              <div className="flex items-center space-x-2 text-[#666666] dark:text-[#a0a0a0]">
                <Users className="h-5 w-5" />
                <span>チーム管理</span>
              </div>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectLinks;