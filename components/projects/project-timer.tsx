"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ProjectTimer() {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [selectedProject, setSelectedProject] = useState('ポートフォリオサイト');

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isRunning) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
  };

  return (
    <div className="w-full bg-[#ffffff] dark:bg-[#1a1a1a] p-4 rounded-lg">
      <Card className="bg-card">
        <CardHeader className="bg-card">
          <CardTitle className="text-[#333333] dark:text-[#ffffff]">
            作業時間記録 - {selectedProject}
          </CardTitle>
        </CardHeader>
        <CardContent className="bg-card">
          <div className="flex flex-col items-center space-y-4">
            <div className="text-4xl font-bold text-[#2c3e50] dark:text-[#e0e0e0]">
              {formatTime(time)}
            </div>
            <div className="flex space-x-4">
              <Button
                onClick={handleStartStop}
                variant={isRunning ? "destructive" : "default"}
              >
                {isRunning ? '停止' : '開始'}
              </Button>
              <Button
                onClick={handleReset}
                variant="secondary"
              >
                リセット
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}