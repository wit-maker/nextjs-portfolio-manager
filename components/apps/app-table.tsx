'use client';

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getApps } from '@/lib/actions/app-actions';
import { App, ApiResponse } from '@/lib/types';
import { BadgeCheck, Code2, Clock, AlertTriangle } from 'lucide-react';
import { CommonStatus } from '@prisma/client';
import { toast } from 'react-hot-toast';

export function AppTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [apps, setApps] = useState<App[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const appsPerPage = 8;

  useEffect(() => {
    const fetchApps = async () => {
      setIsLoading(true);
      try {
        const response = await getApps();
        if (response.status === 'success' && response.data) {
          setApps(response.data);
          setError(null);
        } else {
          setError(response.error?.message || 'アプリの取得に失敗しました');
          toast.error(response.error?.message || 'アプリの取得に失敗しました');
        }
      } catch (error) {
        setError('アプリの取得中にエラーが発生しました');
        toast.error('アプリの取得中にエラーが発生しました');
      } finally {
        setIsLoading(false);
      }
    };
    fetchApps();
  }, []);

  const totalPages = Math.ceil(apps.length / appsPerPage);
  const startIndex = (currentPage - 1) * appsPerPage;
  const endIndex = startIndex + appsPerPage;
  const currentApps = apps.slice(startIndex, endIndex);

  const getStatusIcon = (status: CommonStatus) => {
    switch (status) {
      case CommonStatus.COMPLETED:
        return <BadgeCheck className="h-5 w-5 text-green-500" />;
      case CommonStatus.IN_PROGRESS:
        return <Code2 className="h-5 w-5 text-blue-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-48 space-y-4">
        <AlertTriangle className="h-8 w-8 text-red-500" />
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {currentApps.length === 0 ? (
          <div className="col-span-full text-center py-8 text-gray-500">
            アプリケーションがありません
          </div>
        ) : (
          currentApps.map((app) => (
            <Card key={app.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="text-lg font-semibold">{app.name}</span>
                  {getStatusIcon(app.status)}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {app.description || '説明なし'}
                </p>
                <div className="space-y-2">
                  {app.languages && app.languages.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {app.languages.map((lang) => (
                        <span
                          key={lang.id}
                          className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded"
                        >
                          {lang.name}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1" />
                    {formatDate(app.updatedAt)}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
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