import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';

const AppDetails: React.FC<{
  app: {
    name: string;
    description: string;
    languages: string[];
    technologies: string[];
    github_url: string;
    app_url: string;
    image_url: string;
    published_at: string;
    status: string;
  }
}> = ({ app }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <Card>
        <CardHeader>
          <CardTitle>{app.name}</CardTitle>
          <CardDescription>
            {app.status} • 公開日: {new Date(app.published_at).toLocaleDateString('ja-JP')}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {app.image_url && (
            <div className="w-full h-64 relative rounded-lg overflow-hidden">
              <img 
                src={app.image_url} 
                alt={`${app.name}のスクリーンショット`}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">説明</h3>
              <p className="text-gray-600 dark:text-gray-300">{app.description}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">使用言語</h3>
              <div className="flex flex-wrap gap-2">
                {app.languages.map((lang, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-[#e2e8f0] dark:bg-[#2d3748] rounded-full text-sm"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">使用技術</h3>
              <div className="flex flex-wrap gap-2">
                {app.technologies.map((tech, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-[#e2e8f0] dark:bg-[#2d3748] rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              {app.github_url && (
                <a 
                  href={app.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#3182ce] hover:text-[#2c5282]"
                >
                  <span>GitHub</span>
                </a>
              )}
              {app.app_url && (
                <a 
                  href={app.app_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#3182ce] hover:text-[#2c5282]"
                >
                  <span>アプリを開く</span>
                </a>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppDetails;