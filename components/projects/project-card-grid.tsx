'use client';

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllProjects } from '@/lib/actions/project-actions';
import { Clock, Github, Play } from 'lucide-react';
import Link from 'next/link';
import { CommonStatus } from '@prisma/client';

interface Project {
  id: number;
  name: string;
  description: string;
  status: CommonStatus;
  startDate: Date;
  endDate?: Date;
  image_url?: string;
  github_url?: string;
  demo_url?: string;
  projectTechnologies?: Array<{
    language: {
      id: number;
      name: string;
    }
  }>;
}

const statusColors = {
  [CommonStatus.DRAFT]: 'text-gray-500',
  [CommonStatus.IN_PROGRESS]: 'text-blue-500',
  [CommonStatus.COMPLETED]: 'text-green-500',
  [CommonStatus.ARCHIVED]: 'text-yellow-500'
};

const statusLabels = {
  [CommonStatus.DRAFT]: '未着手',
  [CommonStatus.IN_PROGRESS]: '開発中',
  [CommonStatus.COMPLETED]: '完了',
  [CommonStatus.ARCHIVED]: '保管'
};

export function ProjectCardGrid({ showInProgressAndCompleted = false }: { showInProgressAndCompleted?: boolean }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [projects, setProjects] = useState<Project[]>([]);
  const projectsPerPage = 8;

  useEffect(() => {
    const fetchProjects = async () => {
      const result = await getAllProjects();
      if (result.success) {
        setProjects(result.data.map(project => ({
          ...project,
          startDate: new Date(project.startDate),
          endDate: project.endDate ? new Date(project.endDate) : undefined
        })));
      }
    };
    fetchProjects();
  }, []);

  const filteredProjects = showInProgressAndCompleted
    ? projects.filter(project => project.status === CommonStatus.IN_PROGRESS || project.status === CommonStatus.COMPLETED)
    : projects;

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const startIndex = (currentPage - 1) * projectsPerPage;
  const endIndex = startIndex + projectsPerPage;
  const currentProjects = filteredProjects.slice(startIndex, endIndex);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {currentProjects.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-shadow">
            {project.image_url && (
              <div className="relative h-48 w-full">
                <img
                  src={project.image_url}
                  alt={project.name}
                  className="absolute inset-0 w-full h-full object-cover rounded-t-lg"
                />
              </div>
            )}
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="text-lg font-semibold">{project.name}</span>
                <span className={`text-sm font-medium px-2 py-1 rounded-full bg-primary/10 ${statusColors[project.status]}`}>
                  {statusLabels[project.status]}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* <p className="text-sm text-muted-foreground line-clamp-2">
                {project.description}
              </p> */}
              
              <div className="flex flex-wrap gap-2">
                {project.projectTechnologies?.map((tech: any) => (
                  <span
                    key={tech.language.id}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                  >
                    {tech.language.name}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between text-sm text-muted-foreground mt-4">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {formatDate(project.startDate)}
                </div>
                <div className="flex items-center gap-2">
                  {project.github_url && (
                    <Link href={project.github_url} target="_blank" rel="noopener noreferrer">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Github className="h-4 w-4" />
                      </Button>
                    </Link>
                  )}
                  {project.demo_url && (
                    <Link href={project.demo_url} target="_blank" rel="noopener noreferrer">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Play className="h-4 w-4" />
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex items-center justify-center space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          前へ
        </Button>
        <div className="text-sm font-medium">
          {currentPage} / {totalPages}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          次へ
        </Button>
      </div>
    </div>
  );
}