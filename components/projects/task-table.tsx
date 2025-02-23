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

export default function TaskTable() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'アプリのUI実装',
      status: 'TODO',
      priority: '高',
      dueDate: '2024-04-01',
      comment: 'デザインガイドラインに従って実装する'
    },
    {
      id: 2,
      title: 'APIエンドポイントの実装',
      status: 'IN_PROGRESS',
      priority: '中',
      dueDate: '2024-04-15',
      comment: 'RESTful APIの設計に基づいて実装'
    }
  ]);

  const statusOptions = [
    { value: 'TODO', label: '未着手' },
    { value: 'IN_PROGRESS', label: '進行中' },
    { value: 'DONE', label: '完了' },
    { value: 'PENDING', label: '保留' }
  ];

  const priorityOptions = [
    { value: '高', label: '高' },
    { value: '中', label: '中' },
    { value: '低', label: '低' }
  ];

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
                  <TableHead className="text-[#333333] dark:text-[#ffffff]">期日</TableHead>
                  <TableHead className="text-[#333333] dark:text-[#ffffff]">コメント</TableHead>
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
                          const updatedTasks = tasks.map(t => 
                            t.id === task.id ? { ...t, status: e.target.value } : t
                          );
                          setTasks(updatedTasks);
                        }}
                        className="w-full bg-[#ffffff] dark:bg-[#333333] text-[#333333] dark:text-[#ffffff] rounded border border-[#cccccc] dark:border-[#666666]"
                      >
                        {statusOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
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
                        value={task.dueDate}
                        onChange={(e) => {
                          const updatedTasks = tasks.map(t => 
                            t.id === task.id ? { ...t, dueDate: e.target.value } : t
                          );
                          setTasks(updatedTasks);
                        }}
                        className="w-full bg-[#ffffff] dark:bg-[#333333] text-[#333333] dark:text-[#ffffff] rounded border border-[#cccccc] dark:border-[#666666]"
                      />
                    </TableCell>
                    <TableCell>
                      <input 
                        type="text" 
                        value={task.comment}
                        onChange={(e) => {
                          const updatedTasks = tasks.map(t => 
                            t.id === task.id ? { ...t, comment: e.target.value } : t
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