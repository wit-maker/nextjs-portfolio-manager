import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const ScheduleView: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "タスク1",
      startDate: new Date(2024, 2, 1),
      endDate: new Date(2024, 2, 5),
      status: "進行中"
    },
    {
      id: 2,
      title: "タスク2", 
      startDate: new Date(2024, 2, 10),
      endDate: new Date(2024, 2, 15),
      status: "未着手"
    }
  ]);

  const [selectedTask, setSelectedTask] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const tasksForDate = tasks.filter(task => 
        date >= task.startDate && date <= task.endDate
      );

      return tasksForDate.length > 0 && (
        <div className="flex flex-col gap-1 mt-1">
          {tasksForDate.map(task => (
            <div
              key={task.id}
              onClick={() => handleTaskClick(task)}
              className="text-xs p-1 rounded cursor-pointer"
              style={{ backgroundColor: task.status === "進行中" ? "#4CAF50" : "#2196F3" }}
            >
              {task.title}
            </div>
          ))}
        </div>
      );
    }
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
                    <p>終了日: {selectedTask.endDate.toLocaleDateString()}</p>
                    <p>ステータス: {selectedTask.status}</p>
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