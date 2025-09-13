'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PageHeader } from '@/components/common/PageHeader';
import { BookOpen } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/components/layout/AuthContext';

export default function MyClassesPage() {
  const { profile: student, loading } = useAuth();
  const [classes, setClasses] = useState<any[]>([]);

  useEffect(() => {
    const fetchClasses = async () => {
      if (student) {
        const { data, error } = await supabase
          .from('student_classes')
          .select('classes (*, profiles (name))')
          .eq('student_id', student.id);

        if (error) {
          console.error('Error fetching classes:', error);
        } else if (data) {
          const enrolledClasses = data.map(item => item.classes);
          setClasses(enrolledClasses);
        }
      }
    };

    fetchClasses();
  }, [student]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!student) {
    return <div>Could not load profile.</div>;
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <PageHeader title="My Classes" description="Here are all the classes you are enrolled in." />
      
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.length > 0 ? (
          classes.map((cls) => (
            <Card key={cls.id} className="shadow-sm border-0 bg-card transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-primary/20 text-primary">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle>{cls.name}</CardTitle>
                    <CardDescription>Code: {cls.code}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Taught by: {cls.profiles?.name || 'N/A'}</p>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-muted-foreground col-span-full text-center">You are not enrolled in any classes yet.</p>
        )}
      </div>
    </div>
  );
}