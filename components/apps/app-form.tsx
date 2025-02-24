'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { CommonStatus } from '@prisma/client';
import StatusBadge from '@/components/ui/status-badge';

interface FormData {
  name: string;
  description: string;
  languages: string;
  technologies: string;
  github_url: string;
  app_url: string;
  image_url: string;
  status: CommonStatus;
}

const AppForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    languages: '',
    technologies: '',
    github_url: '',
    app_url: '',
    image_url: '',
    status: 'DRAFT'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      try {
        // Submit form data
        console.log('Form submitted:', formData);
      } catch (error) {
        setErrors({ submit: 'フォームの送信に失敗しました' });
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) {
      errors.name = 'アプリ名は必須です';
    }
    if (formData.github_url && !formData.github_url.startsWith('https://github.com/')) {
      errors.github_url = '有効なGitHubのURLを入力してください';
    }
    return errors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const statusOptions: { value: CommonStatus; label: string }[] = [
    { value: 'DRAFT', label: '計画中' },
    { value: 'IN_PROGRESS', label: '開発中' },
    { value: 'COMPLETED', label: '公開' },
    { value: 'ARCHIVED', label: 'アーカイブ' }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>アプリ情報登録</CardTitle>
        <CardDescription>アプリケーションの詳細情報を入力してください</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="name">アプリ名 *</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <Label htmlFor="description">説明</Label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md bg-background"
              rows={4}
            />
          </div>

          <div>
            <Label htmlFor="languages">開発言語</Label>
            <Input
              id="languages"
              name="languages"
              value={formData.languages}
              onChange={handleChange}
              className="mt-1"
              placeholder="JavaScript, Python, etc."
            />
          </div>

          <div>
            <Label htmlFor="technologies">使用技術</Label>
            <Input
              id="technologies"
              name="technologies"
              value={formData.technologies}
              onChange={handleChange}
              className="mt-1"
              placeholder="React, Node.js, etc."
            />
          </div>

          <div>
            <Label htmlFor="github_url">GitHub URL</Label>
            <Input
              id="github_url"
              name="github_url"
              value={formData.github_url}
              onChange={handleChange}
              className="mt-1"
              placeholder="https://github.com/username/repo"
            />
            {errors.github_url && <p className="text-red-500 text-sm mt-1">{errors.github_url}</p>}
          </div>

          <div>
            <Label htmlFor="app_url">アプリURL</Label>
            <Input
              id="app_url"
              name="app_url"
              value={formData.app_url}
              onChange={handleChange}
              className="mt-1"
              placeholder="https://your-app.com"
            />
          </div>

          <div>
            <Label htmlFor="image_url">イメージURL</Label>
            <Input
              id="image_url"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              className="mt-1"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div>
            <Label htmlFor="status">ステータス</Label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md bg-background"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="mt-2">
              <StatusBadge status={formData.status as CommonStatus} />
            </div>
          </div>

          {errors.submit && <p className="text-red-500 text-sm">{errors.submit}</p>}

          <Button type="submit" className="w-full">
            登録
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AppForm;