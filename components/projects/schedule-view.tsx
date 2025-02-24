import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { CommonStatus } from '@prisma/client';
import { Task, Project } from '@/lib/types';
import { getStatusLabel } from '@/lib/utils/status-converter';

type CalendarTileProperties = {
  date: Date;
  view: string;
};

type ValuePiece = Date | null;
type RangeValue = [ValuePiece, ValuePiece];

const mockProject: Project = {
  id: 1,
  name: "プロジェクト1",
  description: null,
  status: CommonStatus.IN_PROGRESS,
  startDate: new Date(),
  endDate: null,
  image_url: null,
  github_url: null,
  demo_url: null,
  createdAt: new Date(),
  updatedAt: new Date(),
  technologies: [],
  projectTechnologies: []
};

const ScheduleView: React.FC = () => {
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());
  const [tasks] = React.useState<Task[]>([
    {
      id: 1,
      title: "タスク1",
      startDate: new Date(2024, 2, 1),
      endDate: new Date(2024, 2, 5),
      status: CommonStatus.IN_PROGRESS,
      description: null,
      projectId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      project: mockProject
    },
    {
      id: 2,
      title: "タスク2",
      startDate: new Date(2024, 2, 10),
      endDate: new Date(2024, 2, 15),
      status: CommonStatus.DRAFT,
      description: null,
      projectId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      project: mockProject
    }
  ]);

  const [selectedTask, setSelectedTask] = React.useState<Task | null>(null);

  const handleDateChange = React.useCallback((value: ValuePiece | RangeValue) => {
    if (value instanceof Date) {
      setSelectedDate(value);
    }
  }, []);

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
  };

  const getTaskColor = (status: CommonStatus): string => {
    switch (status) {
      case CommonStatus.IN_PROGRESS:
        return '#4CAF50';
      case CommonStatus.COMPLETED:
        return '#2196F3';
      case CommonStatus.ARCHIVED:
        return '#9E9E9E';
      default:
        return '#FFA726';
    }
  };

  const tileContent = ({ date, view }: CalendarTileProperties) => {
    if (view === 'month') {
      const tasksForDate = tasks.filter(task => 
        date >= task.startDate && date <= (task.endDate ?? date)
      );

      return tasksForDate.length > 0 && (
        <div className="flex flex-col gap-1 mt-1">
          {tasksForDate.map(task => (
            <div
              key={task.id}
              onClick={(e) => {
                e.stopPropagation();
                handleTaskClick(task);
              }}
              className="text-xs p-1 rounded cursor-pointer text-white"
              style={{ backgroundColor: getTaskColor(task.status) }}
            >
              {task.title}
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
      <Card className="bg-card">
        <CardHeader className="bg-card">
          <CardTitle className="bg-card">スケジュール</CardTitle>
        </CardHeader>
        <CardContent className="bg-card">
          <div className="flex flex-col gap-4">
            <Calendar
              onChange={handleDateChange}
              value={selectedDate}
              tileContent={tileContent}
              className="w-full"
            />
            
            {selectedTask && (
              <Card className="bg-card mt-4">
                <CardHeader className="bg-card">
                  <CardTitle className="bg-card text-lg">タスク詳細</CardTitle>
                </CardHeader>
                <CardContent className="bg-card">
                  <div className="space-y-2">
                    <p>タイトル: {selectedTask.title}</p>
                    <p>開始日: {selectedTask.startDate.toLocaleDateString()}</p>
                    <p>終了日: {selectedTask.endDate?.toLocaleDateString() ?? '未定'}</p>
                    <p>ステータス: {getStatusLabel(selectedTask.status)}</p>
                    <p>プロジェクト: {selectedTask.project.name}</p>
                    {selectedTask.project.technologies.length > 0 && (
                      <p>使用技術: {selectedTask.project.technologies.map(tech => tech.name).join(', ')}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScheduleView;