'use client';

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getApps } from '@/lib/actions/app-actions';
import type { App } from '@/lib/actions/app-actions';
import { BadgeCheck, Code2, Clock } from 'lucide-react';
import { Status } from '@prisma/client';

export function AppTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [apps, setApps] = useState<App[]>([]);
  const appsPerPage = 8;

  useEffect(() => {
    const fetchApps = async () => {
      const data = await getApps();
      setApps(data);
    };
    fetchApps();
  }, []);

  const totalPages = Math.ceil(apps.length / appsPerPage);
  const startIndex = (currentPage - 1) * appsPerPage;
  const endIndex = startIndex + appsPerPage;
  const currentApps = apps.slice(startIndex, endIndex);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {currentApps.map((app) => (
          <Card key={app.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="text-lg font-semibold">{app.name}</span>
                {app.status === Status.PUBLIC ? (
                  <BadgeCheck className="h-5 w-5 text-green-500" />
                ) : (
                  <Code2 className="h-5 w-5 text-blue-500" />
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {app.description}
              </p>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="h-4 w-4 mr-1" />
                {app.updatedAt}
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