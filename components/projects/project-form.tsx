'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createProject, getAllTechnologies, type ProjectFormData } from '@/lib/actions/project-actions';
import { CommonStatus } from '@prisma/client';

const isValidStatus = (status: string): status is CommonStatus => {
  return ['DRAFT', 'IN_PROGRESS', 'COMPLETED', 'ARCHIVED'].includes(status);
};

export const ProjectForm = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [technologies, setTechnologies] = useState<Array<{ id: number; name: string }>>([]);
  const [selectedTechs, setSelectedTechs] = useState<number[]>([]);

  useEffect(() => {
    const loadTechnologies = async () => {
      const result = await getAllTechnologies();
      if (result.success && result.data) {
        setTechnologies(result.data);
      }
    };
    loadTechnologies();
  }, []);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('画像のアップロードに失敗しました');
      }

      const data = await response.json();
      setImageUrl(data.url);
    } catch (error) {
      console.error('画像アップロードエラー:', error);
      setError('画像のアップロードに失敗しました');
    }
  };

  const handleTechChange = (techId: number) => {
    setSelectedTechs(prev => {
      if (prev.includes(techId)) {
        return prev.filter(id => id !== techId);
      } else {
        return [...prev, techId];
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const status = formData.get('status');
    if (!status || !isValidStatus(status.toString())) {
      setError('無効なステータスです');
      setIsSubmitting(false);
      return;
    }

    // ProjectFormDataの型に厳密に合わせる
    const data: ProjectFormData = {
      name: formData.get('name') as string,
      description: (formData.get('description') as string) || undefined,
      startDate: new Date(formData.get('startDate') as string),
      endDate: formData.get('endDate') ? new Date(formData.get('endDate') as string) : undefined,
      image_url: imageUrl || undefined,
      github_url: (formData.get('github_url') as string) || undefined,
      demo_url: (formData.get('demo_url') as string) || undefined,
      status: status.toString() as CommonStatus, // isValidStatus()で既に検証済み
      technologies: selectedTechs
    };

    const result = await createProject(data);
    
    if (result.success) {
      router.push('/projects');
    } else {
      setError(result.error || 'エラーが発生しました');
    }
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      <div className="space-y-2">
        <Label htmlFor="name">プロジェクト名 *</Label>
        <Input
          id="name"
          name="name"
          required
          placeholder="プロジェクト名を入力してください"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">説明</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="プロジェクトの説明を入力してください"
          className="h-32"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">進行状態 *</Label>
        <Select name="status" required defaultValue="DRAFT">
          <SelectTrigger>
            <SelectValue placeholder="進行状態を選択" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="DRAFT">下書き</SelectItem>
            <SelectItem value="IN_PROGRESS">進行中</SelectItem>
            <SelectItem value="COMPLETED">完了</SelectItem>
            <SelectItem value="ARCHIVED">アーカイブ</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">プロジェクト画像</Label>
        <Input
          id="image"
          name="image"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        />
        {imageUrl && (
          <div className="mt-2">
            <Image
              src={imageUrl}
              alt="プレビュー"
              width={200}
              height={200}
              className="rounded"
              priority
            />
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label>技術スタック</Label>
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <Button
              key={tech.id}
              type="button"
              variant={selectedTechs.includes(tech.id) ? "default" : "outline"}
              onClick={() => handleTechChange(tech.id)}
              className="m-1"
            >
              {tech.name}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="github_url">GitHub URL</Label>
        <Input
          id="github_url"
          name="github_url"
          type="url"
          placeholder="https://github.com/username/repo"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="demo_url">デモサイト URL</Label>
        <Input
          id="demo_url"
          name="demo_url"
          type="url"
          placeholder="https://example.com"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="startDate">開始日 *</Label>
        <Input
          id="startDate"
          name="startDate"
          type="date"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="endDate">終了日（予定）</Label>
        <Input
          id="endDate"
          name="endDate"
          type="date"
        />
      </div>

      {error && (
        <div className="text-red-500 text-sm">
          {error}
        </div>
      )}

      <Button 
        type="submit" 
        className="w-full bg-[#c5a572] hover:bg-[#b39362]"
        disabled={isSubmitting}
      >
        {isSubmitting ? '作成中...' : 'プロジェクトを作成'}
      </Button>
    </form>
  );
};

export default ProjectForm;