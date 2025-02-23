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

export default function ProjectHistory() {
  const historyData = [
    {
      id: 1,
      date: '2024-02-23',
      project: 'ポートフォリオサイト',
      activity: 'UI実装',
      duration: '2:30:00',
      notes: 'ヘッダーとナビゲーションの実装'
    },
    {
      id: 2,
      date: '2024-02-23',
      project: 'ポートフォリオサイト',
      activity: 'APIエンドポイント実装',
      duration: '1:45:00',
      notes: 'プロジェクト一覧APIの実装'
    }
  ];

  return (
    <div className="w-full bg-[#ffffff] dark:bg-[#1a1a1a] p-4 rounded-lg">
      <Card className="bg-card">
        <CardHeader className="bg-card">
          <CardTitle className="text-[#333333] dark:text-[#ffffff]">作業履歴</CardTitle>
        </CardHeader>
        <CardContent className="bg-card">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-[#333333] dark:text-[#ffffff]">日付</TableHead>
                  <TableHead className="text-[#333333] dark:text-[#ffffff]">プロジェクト</TableHead>
                  <TableHead className="text-[#333333] dark:text-[#ffffff]">作業内容</TableHead>
                  <TableHead className="text-[#333333] dark:text-[#ffffff]">作業時間</TableHead>
                  <TableHead className="text-[#333333] dark:text-[#ffffff]">備考</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {historyData.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell className="text-[#333333] dark:text-[#ffffff]">{entry.date}</TableCell>
                    <TableCell className="text-[#333333] dark:text-[#ffffff]">{entry.project}</TableCell>
                    <TableCell className="text-[#333333] dark:text-[#ffffff]">{entry.activity}</TableCell>
                    <TableCell className="text-[#333333] dark:text-[#ffffff]">{entry.duration}</TableCell>
                    <TableCell className="text-[#333333] dark:text-[#ffffff]">{entry.notes}</TableCell>
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