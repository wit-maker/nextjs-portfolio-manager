'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const CreateAppPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    languages: '',
    technologies: '',
    github_url: '',
    app_url: '',
    image_url: '',
    status: 'PRIVATE'
  });

  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/apps', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('アプリの作成に失敗しました');
      }

      window.location.href = '/apps';
    } catch (err) {
      setError(err instanceof Error ? err.message : '予期せぬエラーが発生しました');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6">
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-semibold">新規アプリ作成</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">アプリの詳細情報を入力してください</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">アプリ名 *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>

            <div>
              <Label htmlFor="description">説明</Label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>

            <div>
              <Label htmlFor="languages">開発言語</Label>
              <Input
                id="languages"
                value={formData.languages}
                onChange={(e) => setFormData({...formData, languages: e.target.value})}
              />
            </div>

            <div>
              <Label htmlFor="technologies">使用技術</Label>
              <Input
                id="technologies"
                value={formData.technologies}
                onChange={(e) => setFormData({...formData, technologies: e.target.value})}
              />
            </div>

            <div>
              <Label htmlFor="github_url">GitHub URL</Label>
              <Input
                id="github_url"
                type="url"
                value={formData.github_url}
                onChange={(e) => setFormData({...formData, github_url: e.target.value})}
              />
            </div>

            <div>
              <Label htmlFor="app_url">アプリURL</Label>
              <Input
                id="app_url"
                type="url"
                value={formData.app_url}
                onChange={(e) => setFormData({...formData, app_url: e.target.value})}
              />
            </div>

            <div>
              <Label htmlFor="image_url">画像URL</Label>
              <Input
                id="image_url"
                type="url"
                value={formData.image_url}
                onChange={(e) => setFormData({...formData, image_url: e.target.value})}
              />
            </div>

            <div>
              <Label>公開設定</Label>
              <RadioGroup
                value={formData.status}
                onValueChange={(value) => setFormData({...formData, status: value})}
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="PRIVATE" id="private" />
                  <Label htmlFor="private">非公開</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="PUBLIC" id="public" />
                  <Label htmlFor="public">公開</Label>
                </div>
              </RadioGroup>
            </div>

            {error && (
              <div className="text-red-500 mt-2">{error}</div>
            )}

            <Button type="submit" className="w-full">
              作成
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateAppPage;