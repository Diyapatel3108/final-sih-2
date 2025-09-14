
"use client";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, ArrowRight, Code, Calendar, Users } from "lucide-react";
import type { Class } from "@/lib/types";
import { supabase } from "@/lib/supabaseClient";

import { useAuth } from "@/components/layout/AuthContext";
import { useEffect, useState } from "react";

interface StatCardProps {
    icon: React.ReactNode;
    title: string;
    value: string | number;
}

function StatCard({ icon, title, value }: StatCardProps) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <div className="text-muted-foreground">{icon}</div>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
            </CardContent>
        </Card>
    );
}

export default function TeacherDashboardPage() {
    const { user, loading } = useAuth();
    const [todaysClasses, setTodaysClasses] = useState<any[]>([]);
    const [totalStudents, setTotalStudents] = useState(0);
    const [totalClasses, setTotalClasses] = useState(0);

    useEffect(() => {
        if (user) {
            const fetchDashboardData = async () => {
                const { data: classes, error: classesError } = await supabase
                    .from('classes')
                    .select('*, student_classes(count)')
                    .eq('teacher_id', user.id);

                if (classes) {
                    setTotalClasses(classes.length);
                    // This is a placeholder for today's classes
                    setTodaysClasses(classes.slice(0, 3));
                    
                    const studentCounts = classes.map((c: any) => c.student_classes[0]?.count || 0);
                    setTotalStudents(studentCounts.reduce((a: number, b: number) => a + b, 0));
                }
            };
            fetchDashboardData();
        }
    }, [user]);


    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <div>Please log in to view your dashboard.</div>;
    }

    return (
        <div className="grid flex-1 items-start gap-4 md:gap-8">
            <div>
                <h1 className="text-3xl font-bold font-headline">Dashboard</h1>
                <p className="text-muted-foreground">Welcome back, {user.profile.name}.</p>
            </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard icon={<Users />} title="Total Students" value={totalStudents} />
            <StatCard icon={<BookOpen />} title="Total Classes" value={totalClasses} />
            <StatCard icon={<Clock />} title="Classes Today" value={todaysClasses.length} />
            <StatCard icon={<Users />} title="Absent Today" value="0" />
          </div>
    
          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button asChild className="w-full justify-start gap-2">
                  <Link href="/teacher/qr-generate"><Code /> Generate Class QR</Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start gap-2">
                  <Link href="/teacher/dashboard"><Calendar /> View Full Schedule</Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start gap-2">
                  <Link href="/teacher/dashboard"><ArrowRight /> View Performance</Link>
                </Button>
              </CardContent>
            </Card>
    
            <Card className="lg:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Today's Classes</CardTitle>
                  <CardDescription>You have {todaysClasses.length} classes scheduled for today.</CardDescription>
                </div>
                  <Button asChild variant="ghost" size="sm">
                    <Link href="/teacher/dashboard">View All <ArrowRight className="ml-1 h-4 w-4" /></Link>
                  </Button>
              </CardHeader>
              <CardContent>
                {todaysClasses.length > 0 ? (
                  <ul className="space-y-4">
                    {todaysClasses.map((cls: any) => (
                      <li key={cls.id} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                        <div>
                          <p className="font-semibold">{cls.name}</p>
                          <p className="text-sm text-muted-foreground">{cls.student_classes[0]?.count || 0} Students</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-primary">{cls.schedule}</p>
                          <p className="text-sm text-muted-foreground">{cls.code}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-center py-8 text-muted-foreground">No classes scheduled for today.</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      );
}
