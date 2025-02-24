"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { CommonStatus } from '@prisma/client';
import { Task } from '@/lib/types';
import { getStatusLabel } from '@/lib/utils/status-converter';

type TaskTableData = {
  id: number;
  title: string;
  status: CommonStatus;
  priority: string;
  startDate: Date;
  endDate: Date | null;
  description: string | null;
};

const isValidStatus = (status: string): status is CommonStatus => {
  return Object.values(CommonStatus).includes(status as CommonStatus);
};

export default function TaskTable() {
  const [tasks, setTasks] = useState<TaskTableData[]>([
    {
      id: 1,
      title: 'アプリのUI実装',
      status: CommonStatus.DRAFT,
      priority: '高',
      startDate: new Date('2024-04-01'),
      endDate: new Date('2024-04-15'),
      description: 'デザインガイドラインに従って実装する'
    },
    {
      id: 2,
      title: 'APIエンドポイントの実装',
      status: CommonStatus.IN_PROGRESS,
      priority: '中',
      startDate: new Date('2024-04-15'),
      endDate: new Date('2024-04-30'),
      description: 'RESTful APIの設計に基づいて実装'
    }
  ]);

  const priorityOptions = [
    { value: '高', label: '高' },
    { value: '中', label: '中' },
    { value: '低', label: '低' }
  ];

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return date.toISOString().split('T')[0];
  };

  return (
    <div className="w-full bg-[#ffffff] dark:bg-[#1a1a1a] p-4 rounded-lg">
      <Card className="bg-card">
        <CardHeader className="bg-card">
          <CardTitle className="text-[#333333] dark:text-[#ffffff]">タスク一覧</CardTitle>
        </CardHeader>
        <CardContent className="bg-card">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-[#333333] dark:text-[#ffffff]">タイトル</TableHead>
                  <TableHead className="text-[#333333] dark:text-[#ffffff]">状態</TableHead>
                  <TableHead className="text-[#333333] dark:text-[#ffffff]">優先度</TableHead>
                  <TableHead className="text-[#333333] dark:text-[#ffffff]">開始日</TableHead>
                  <TableHead className="text-[#333333] dark:text-[#ffffff]">終了日</TableHead>
                  <TableHead className="text-[#333333] dark:text-[#ffffff]">説明</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell className="text-[#333333] dark:text-[#ffffff]">{task.title}</TableCell>
                    <TableCell>
                      <select 
                        value={task.status}
                        onChange={(e) => {
                          const newStatus = e.target.value;
                          if (!isValidStatus(newStatus)) {
                            console.error('無効なステータス:', newStatus);
                            return;
                          }
                          const updatedTasks = tasks.map(t =>
                            t.id === task.id ? { ...t, status: newStatus } : t
                          );
                          setTasks(updatedTasks);
                        }}
                        className="w-full bg-[#ffffff] dark:bg-[#333333] text-[#333333] dark:text-[#ffffff] rounded border border-[#cccccc] dark:border-[#666666]"
                      >
                        {Object.values(CommonStatus).map(status => (
                          <option key={status} value={status}>
                            {getStatusLabel(status)}
                          </option>
                        ))}
                      </select>
                    </TableCell>
                    <TableCell>
                      <select 
                        value={task.priority}
                        onChange={(e) => {
                          const updatedTasks = tasks.map(t => 
                            t.id === task.id ? { ...t, priority: e.target.value } : t
                          );
                          setTasks(updatedTasks);
                        }}
                        className="w-full bg-[#ffffff] dark:bg-[#333333] text-[#333333] dark:text-[#ffffff] rounded border border-[#cccccc] dark:border-[#666666]"
                      >
                        {priorityOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </TableCell>
                    <TableCell>
                      <input 
                        type="date" 
                        value={formatDate(task.startDate)}
                        onChange={(e) => {
                          const updatedTasks = tasks.map(t => 
                            t.id === task.id ? { ...t, startDate: new Date(e.target.value) } : t
                          );
                          setTasks(updatedTasks);
                        }}
                        className="w-full bg-[#ffffff] dark:bg-[#333333] text-[#333333] dark:text-[#ffffff] rounded border border-[#cccccc] dark:border-[#666666]"
                      />
                    </TableCell>
                    <TableCell>
                      <input 
                        type="date" 
                        value={formatDate(task.endDate)}
                        onChange={(e) => {
                          const updatedTasks = tasks.map(t => 
                            t.id === task.id ? { ...t, endDate: new Date(e.target.value) } : t
                          );
                          setTasks(updatedTasks);
                        }}
                        className="w-full bg-[#ffffff] dark:bg-[#333333] text-[#333333] dark:text-[#ffffff] rounded border border-[#cccccc] dark:border-[#666666]"
                      />
                    </TableCell>
                    <TableCell>
                      <input 
                        type="text" 
                        value={task.description || ''}
                        onChange={(e) => {
                          const updatedTasks = tasks.map(t => 
                            t.id === task.id ? { ...t, description: e.target.value } : t
                          );
                          setTasks(updatedTasks);
                        }}
                        className="w-full bg-[#ffffff] dark:bg-[#333333] text-[#333333] dark:text-[#ffffff] rounded border border-[#cccccc] dark:border-[#666666]"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}