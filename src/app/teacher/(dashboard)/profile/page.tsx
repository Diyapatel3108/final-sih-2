
"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Building, Award, Briefcase } from "lucide-react";

import { supabase } from "@/lib/supabaseClient";

import { useAuth } from "@/components/layout/AuthContext";

export default function TeacherProfilePage() {
  const { profile: teacher, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!teacher) {
    return <div>Could not load profile.</div>;
  }
  
  const fallback = teacher.name.split(' ').map((n: string) => n[0]).join('');

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-muted/40 p-4 sm:p-8">
      <Card className="w-full max-w-lg">
        <CardHeader className="items-center text-center">
          <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-primary">
            <AvatarImage src={teacher.avatar_url || `https://i.pravatar.cc/150?u=${teacher.id}`} alt={teacher.name} data-ai-hint="teacher person" />
            <AvatarFallback>{fallback}</AvatarFallback>
          </Avatar>
          <CardTitle className="text-3xl">{teacher.name}</CardTitle>
          <CardDescription>Teacher ID: {teacher.id}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="flex items-center p-4 rounded-lg bg-muted/50">
            <Building className="w-5 h-5 mr-4 text-muted-foreground" />
            <div>
                <p className="text-sm text-muted-foreground">Department</p>
                <p className="font-semibold">{teacher.department}</p>
            </div>
          </div>
          <div className="flex items-center p-4 rounded-lg bg-muted/50">
            <Award className="w-5 h-5 mr-4 text-muted-foreground" />
            <div>
                <p className="text-sm text-muted-foreground">Degree</p>
                <p className="font-semibold">{teacher.degree}</p>
            </div>
          </div>
          <div className="flex items-center p-4 rounded-lg bg-muted/50">
            <Briefcase className="w-5 h-5 mr-4 text-muted-foreground" />
            <div>
                <p className="text-sm text-muted-foreground">Years of Experience</p>
                <p className="font-semibold">{teacher.experience}</p>
            </div>
          </div>
           <Button variant="outline" asChild className="w-full mt-6">
                <Link href="/teacher/dashboard">
                    <ArrowLeft className="mr-2" />
                    Back to Dashboard
                </Link>
            </Button>
        </CardContent>
      </Card>
    </div>
  );
}
