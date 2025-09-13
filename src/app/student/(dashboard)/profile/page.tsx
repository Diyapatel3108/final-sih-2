
"use client";

import { useAuth } from "@/components/layout/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Building } from "lucide-react";

export default function StudentProfilePage() {
  const { profile: student, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!student) {
    return <div>Could not load profile.</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!student) {
    return <div>Could not load profile.</div>;
  }

  const fallback = student.name.split(' ').map((n: string) => n[0]).join('');

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-muted/40 p-4 sm:p-8">
      <Card className="w-full max-w-lg">
        <CardHeader className="items-center text-center">
          <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-primary">
            <AvatarImage src={student.avatar_url || `https://i.pravatar.cc/150?u=${student.id}`} alt={student.name} data-ai-hint="student person" />
            <AvatarFallback>{fallback}</AvatarFallback>
          </Avatar>
          <CardTitle className="text-3xl">{student.name}</CardTitle>
          <CardDescription>Student ID: {student.id}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="flex items-center p-4 rounded-lg bg-muted/50">
            <Building className="w-5 h-5 mr-4 text-muted-foreground" />
            <div >
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-semibold">{student.name}</p>
            </div>
          </div>
          <div className="flex items-center p-4 rounded-lg bg-muted/50">
            <Building className="w-5 h-5 mr-4 text-muted-foreground" />
            <div>
                <p className="text-sm text-muted-foreground">Department</p>
                <p className="font-semibold">{student.department}</p>
            </div>
          </div>
          <div className="flex items-center p-4 rounded-lg bg-muted/50">
            <Building className="w-5 h-5 mr-4 text-muted-foreground" />
            <div>
                <p className="text-sm text-muted-foreground">Contact No.</p>
                <p className="font-semibold">{student.contact_no || 'N/A'}</p>
            </div>
          </div>
           <Button variant="outline" asChild className="w-full mt-6">
                <Link href="/student/dashboard">
                    <ArrowLeft className="mr-2" />
                    Back to Dashboard
                </Link>
            </Button>
        </CardContent>
      </Card>
    </div>
  );
}
