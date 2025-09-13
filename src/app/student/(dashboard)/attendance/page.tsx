
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PageHeader } from '@/components/common/PageHeader';
import { Check, X, Zap, Target, Book, FlaskConical, BrainCircuit, Cloud } from 'lucide-react';

const chartConfig = {
  value: {
    label: "Attended",
  },
  attended: {
    label: "Attended",
    color: "hsl(var(--primary))",
  },
  missed: {
    label: "Missed",
    color: "hsl(var(--border))",
  }
}
import { supabase } from '@/lib/supabaseClient';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Pie, PieChart, Cell } from "recharts"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from '@/components/ui/badge';


import { useAuth } from '@/components/layout/AuthContext';
export default function AttendancePage() {
  const { profile: student, loading } = useAuth();
  const [weeklyAttendance, setWeeklyAttendance] = useState<any[]>([]);
  const [summaryStats, setSummaryStats] = useState<any | null>(null);
  const [chartData, setChartData] = useState<any[]>([]);
  const [subjectAttendance, setSubjectAttendance] = useState<any[]>([]);
  const [dayWiseAttendanceData, setDayWiseAttendanceData] = useState<any | null>(null);
  const [date, setDate] = useState<Date | undefined>(new Date());


  useEffect(() => {
    if (student) {
      // Fetch summary stats
      // This is a placeholder, you'll need to implement the actual logic
      setSummaryStats([
        { title: "Total Classes", value: "150", color: "text-primary", bgColor: "bg-primary/20" },
        { title: "Classes Attended", value: "135", color: "text-green-500", bgColor: "bg-green-500/20" },
        { title: "Classes Missed", value: "15", color: "text-red-500", bgColor: "bg-red-500/20" },
      ]);

      // Fetch weekly attendance
      // This is a placeholder
      setWeeklyAttendance([
        { day: 'Mon', present: true },
        { day: 'Tue', present: true },
        { day: 'Wed', present: false },
        { day: 'Thu', present: true },
        { day: 'Fri', present: true },
      ]);

      // Fetch subject-wise attendance
      // This is a placeholder
      setSubjectAttendance([
          { subject: 'Artificial Intelligence', attended: 28, total: 30, icon: BrainCircuit, color: 'bg-blue-500' },
          { subject: 'Cloud Computing', attended: 25, total: 30, icon: Cloud, color: 'bg-orange-500' },
          { subject: 'Data Structures', attended: 30, total: 30, icon: Book, color: 'bg-green-500' },
          { subject: 'Chemistry', attended: 22, total: 30, icon: FlaskConical, color: 'bg-purple-500' },
      ]);

      // Fetch day-wise attendance
      // This is a placeholder
      setDayWiseAttendanceData({
        '2025-09-12': [
          { subject: 'Artificial Intelligence', status: 'Present' },
          { subject: 'Cloud Computing', status: 'Present' },
        ]
      });

      // Calculate chart data
      const attended = 135;
      const total = 150;
      setChartData([
        { name: 'attended', value: attended, color: 'hsl(var(--primary))' },
        { name: 'missed', value: total - attended, color: 'hsl(var(--muted))' },
      ]);
    }
  }, [student]);


  if (loading) {
    return <div>Loading...</div>;
  }

  if (!student) {
    return <div>Could not load profile.</div>;
  }

  const attendancePercentage = summaryStats ? (summaryStats[1].value / summaryStats[0].value) * 100 : 0;
  const selectedDateString = date?.toISOString().split('T')[0];
  const todaysAttendance = selectedDateString && dayWiseAttendanceData ? (dayWiseAttendanceData as any)[selectedDateString] : null;


  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <PageHeader title="Attendance" description="Track your attendance records and view detailed statistics." />
      
      <div className="space-y-8 mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {summaryStats && summaryStats.map((stat: any) => (
                <Card key={stat.title} className="shadow-sm border-0 bg-card transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                    <CardContent className="p-6 flex items-center justify-between">
                        <div className="grid gap-1.5">
                            <p className="text-sm text-muted-foreground">{stat.title}</p>
                            <p className={cn("text-3xl font-bold", stat.color)}>{stat.value}</p>
                        </div>
                         <div className={cn("p-3 rounded-full", stat.bgColor)}>
                            <Check className={cn("h-6 w-6", stat.color)} />
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
                <CardHeader>
                    <CardTitle>Weekly Report</CardTitle>
                    <CardDescription>Your attendance overview for the current week.</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-around items-center py-6">
                {weeklyAttendance.map((item) => (
                    <div key={item.day} className="flex flex-col items-center gap-2">
                        <p className="text-sm font-medium text-muted-foreground">{item.day}</p>
                        <div className={cn("w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300", item.present ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500')}>
                            {item.present ? <Check className="h-5 w-5" /> : <X className="h-5 w-5" />}
                        </div>
                    </div>
                ))}
                </CardContent>
            </Card>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
                <Card className="flex flex-col justify-center items-center text-center bg-gradient-to-br from-yellow-400/20 to-yellow-500/10">
                    <CardContent className="p-6 flex flex-col items-center justify-center gap-2">
                        <Zap className="h-8 w-8 text-yellow-500" />
                        <p className="text-2xl font-bold">5 Day Streak</p>
                        <p className="text-sm text-muted-foreground">Keep up the great work!</p>
                    </CardContent>
                </Card>
                <Card className="flex flex-col justify-center items-center text-center bg-gradient-to-br from-primary/20 to-primary/10">
                    <CardContent className="p-6 flex flex-col items-center justify-center gap-2">
                        <Target className="h-8 w-8 text-primary" />
                        <p className="text-2xl font-bold">90% Target</p>
                        <p className="text-sm text-muted-foreground">You are right on track!</p>
                    </CardContent>
                </Card>
            </div>
        </div>

        
        <Tabs defaultValue="overall">
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3">
            <TabsTrigger value="overall">Overall</TabsTrigger>
            <TabsTrigger value="subject">Subject-wise</TabsTrigger>
            <TabsTrigger value="day">Day-wise</TabsTrigger>
          </TabsList>
          <TabsContent value="overall">
           <Card className="bg-card/80 backdrop-blur-sm border-2 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Overall Attendance</CardTitle>
              </CardHeader>
              <CardContent className="p-6 flex flex-col items-center gap-8">
                <div className="relative h-48 w-48">
                  <ChartContainer
                    config={{
                      value: {
                        label: "Attended",
                      },
                      attended: {
                        label: "Attended",
                        color: "hsl(var(--primary))",
                      },
                      missed: {
                        label: "Missed",
                        color: "hsl(var(--border))",
                      }
                    }}
                    className="absolute inset-0"
                  >
                    <PieChart>
                      <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel />}
                      />
                      <Pie
                        data={chartData}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={60}
                        outerRadius={70}
                        strokeWidth={5}
                      >
                         <Cell
                          key="attended"
                          fill="hsl(var(--primary))"
                          radius={10}
                        />
                        <Cell
                          key="missed"
                          fill="hsl(var(--muted))"
                          opacity={0.5}
                           radius={10}
                        />
                      </Pie>
                    </PieChart>
                  </ChartContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <p className="text-5xl font-bold text-foreground">
                      {attendancePercentage}%
                    </p>
                  </div>
                </div>
                <div className="w-full max-w-md">
                  <div className="flex justify-around text-center">
                    <div>
                      <p className="text-2xl font-bold text-foreground">135</p>
                      <p className="text-sm text-muted-foreground">Classes Attended</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">150</p>
                      <p className="text-sm text-muted-foreground">Total Classes</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="subject">
             <Card>
                <CardHeader>
                    <CardTitle className="text-xl font-semibold">Subject-wise Attendance</CardTitle>
                    <CardDescription>Your attendance breakdown for each subject.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    {subjectAttendance.map((subject) => {
                         const percentage = (subject.attended / subject.total) * 100;
                         return (
                            <div key={subject.subject} className="group transition-all duration-300 hover:bg-muted/50 p-3 rounded-lg">
                                <div className="flex items-center gap-4 mb-2">
                                     <div className={cn("p-2 rounded-full", subject.color)}>
                                        <subject.icon className="h-5 w-5 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="font-medium text-foreground">{subject.subject}</span>
                                            <span className="text-sm text-muted-foreground">{subject.attended}/{subject.total}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Progress value={percentage} className="h-2" />
                                            <span className="text-sm font-semibold text-primary w-12 text-right">{Math.round(percentage)}%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </CardContent>
            </Card>
          </TabsContent>
           <TabsContent value="day">
             <Card>
                <CardHeader>
                    <CardTitle>Day-wise Attendance</CardTitle>
                    <CardDescription>Select a date to view your attendance record.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                    <div className="flex justify-center">
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            className="rounded-md border"
                        />
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Attendance for {date ? date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : '...'}
                        </h3>
                        {todaysAttendance ? (
                            <div className="space-y-3">
                                {todaysAttendance.map((item: any) => (
                                    <div key={item.subject} className="flex items-center justify-between p-3 rounded-md bg-muted/50">
                                        <p className="font-medium">{item.subject}</p>
                                        <Badge variant={item.status === 'Present' ? 'default' : 'destructive'} className={cn(item.status === 'Present' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500', 'border-0')}>
                                            {item.status}
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center text-muted-foreground pt-8">
                                <p>No attendance record for this day.</p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
