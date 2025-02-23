import React from 'react';

const AppPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-800 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <Card className="bg-card">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl">アプリ詳細</CardTitle>
              <div className="flex gap-4">
                <Button variant="outline">
                  編集
                </Button>
                <Button variant="destructive">
                  削除
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <div className="flex items-center gap-4">
                <img 
                  src="/path/to/app-image.jpg"
                  alt="アプリのスクリーンショット"
                  className="w-32 h-32 object-cover rounded-lg"
                />
                <div>
                  <h3 className="text-xl font-semibold">アプリ名</h3>
                  <p className="text-gray-600 dark:text-gray-300">ステータス: 公開中</p>
                  <p className="text-gray-600 dark:text-gray-300">公開日: 2024/03/21</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">説明</h4>
                  <p className="text-gray-600 dark:text-gray-300">アプリの詳細な説明文がここに入ります。</p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">使用技術</h4>
                  <div className="flex flex-wrap gap-2">
                    {['React', 'TypeScript', 'Next.js'].map((tech) => (
                      <span key={tech} className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">リンク</h4>
                  <div className="space-y-2">
                    <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline block">
                      アプリURL
                    </a>
                    <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline block">
                      GitHubリポジトリ
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardHeader>
            <CardTitle>更新履歴</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex gap-4 items-start border-b border-gray-200 dark:border-gray-700 pb-4">
                  <div className="w-32 text-sm text-gray-600 dark:text-gray-300">
                    2024/03/21
                  </div>
                  <div>
                    <p className="font-medium">更新内容のタイトル</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      更新内容の詳細な説明がここに入ります。
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AppPage;