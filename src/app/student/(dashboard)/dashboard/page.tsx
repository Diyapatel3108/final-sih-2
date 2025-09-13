"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Calendar, ClipboardList } from "lucide-react";
import { supabase } from '@/lib/supabaseClient';
import type { Class } from '@/lib/types';
import { useAuth } from "@/components/layout/AuthContext";

interface Lecture {
  time: string;
  subject: string;
  professor: string;
  room: string;
  status: string;
}

const actionItems = [
    {
        title: "QR Scanner",
        description: "Scan QR codes for attendance verification and campus services.",
        href: "/student/qr-scanner",
        icon: <div />,
        buttonText: "Open Scanner",
    },
    {
        title: "Attendance",
        description: "Track your attendance records and view detailed statistics.",
        href: "/student/attendance",
        icon: <Calendar className="h-6 w-6" />,
        buttonText: "View Attendance",
    },
    {
        title: "Activities",
        description: "Check upcoming assignments, projects, and campus events.",
        href: "/student/activity",
        icon: <ClipboardList className="h-6 w-6" />,
        buttonText: "View Activities",
    },
]

export default function StudentDashboard() {
  const { profile: student, loading } = useAuth();
  const [classes, setClasses] = useState<any[]>([]);

  useEffect(() => {
    if (student) {
      const fetchClasses = async () => {
        const { data, error } = await supabase
          .from('student_classes')
          .select('classes(*, users(*))')
          .eq('student_id', student.id);
        if (data) {
          setClasses(data);
        }
      };
      fetchClasses();
    }
  }, [student]);

  const lectures: Lecture[] = classes?.map((c: any) => ({
    time: c.classes.schedule || "N/A",
    subject: c.classes.name,
    professor: c.classes.users.name,
    room: c.classes.room || "N/A",
    status: c.classes.status || "N/A",
  })) || [];

  if (!student) {
    return <div>Could not load student data.</div>;
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 p-4 sm:p-6 lg:p-8">
      <Card className="bg-gradient-to-r from-primary to-purple-500 text-primary-foreground border-0 shadow-lg">
        <CardContent className="p-6 flex items-center gap-6">
          <Avatar className="h-20 w-20 border-4 border-white/30">
            <AvatarImage src={student.avatar_url || `https://i.pravatar.cc/150?u=${student.id}`} alt={student.name} data-ai-hint="student person" />
            <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold">Welcome back, {student.name}!</h1>
            <p className="text-primary-foreground/90">{student.department}, Semester 4</p>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary" className="bg-white/20 text-primary-foreground border-0">{student.rfid_id}</Badge>
              <Badge variant="secondary" className="bg-white/20 text-primary-foreground border-0">{student.scholar_level || 'N/A'}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {actionItems.map(item => (
            <Card key={item.title} className="flex flex-col text-center items-center p-6 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="flex flex-col items-center gap-4 p-0">
                    <div className="p-4 rounded-lg bg-accent text-accent-foreground">
                        {item.icon}
                    </div>
                    <h3 className="text-xl font-bold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground min-h-[40px]">{item.description}</p>
                     <Button asChild className="w-full mt-4 bg-gradient-to-r from-primary to-purple-500 text-primary-foreground font-bold text-base py-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                        <Link href={item.href}>{item.buttonText}</Link>
                    </Button>
                </CardContent>
            </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
             <h3 className="text-2xl font-bold flex items-center gap-2"><BookOpen className="text-primary" /> Today's Lectures</h3>
        </CardHeader>
        <CardContent className="p-6 pt-0">
            <div className="space-y-4">
            {lectures.map((lecture) => (
                <div key={lecture.subject} className={`p-4 rounded-lg flex items-center justify-between ${lecture.status === 'Next' ? 'bg-primary/10' : 'bg-secondary/50'}`}>
                <div className="flex items-center gap-4">
                    <div className="text-center w-24">
                    <p className="font-bold text-sm">{lecture.time}</p>
                    </div>
                    <div className="border-l border-border pl-4">
                    <p className="font-semibold">{lecture.subject}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">{lecture.professor}</span>
                        <span className="flex items-center gap-1">{lecture.room}</span>
                    </div>
                    </div>
                </div>
                <Badge variant={
                    lecture.status === 'Completed' ? 'secondary' : 
                    lecture.status === 'Next' ? 'default' : 'outline'
                } className={
                    lecture.status === 'Completed' ? 'bg-green-100 text-green-800' : ''
                }>
                    {lecture.status}
                </Badge>
                </div>
            ))}
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
