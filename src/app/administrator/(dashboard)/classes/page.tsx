'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { supabase } from "@/lib/supabaseClient";

export default function AllClassesPage() {
  const [classes, setClasses] = useState<any[]>([]);

  const fetchClasses = async () => {
    const { data, error } = await supabase.from('classes').select('*');
    if (data) {
      setClasses(data);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const handleDeleteClass = async (classId: string) => {
    const { error } = await supabase.from('classes').delete().eq('id', classId);
    if (!error) {
      fetchClasses();
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold">Class Management</h1>
        <p className="text-muted-foreground">Manage all classes in the system.</p>
      </div>
      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Teacher ID</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {classes && classes.length > 0 ? (
                classes.map(cls => (
                  <TableRow key={cls.id}>
                    <TableCell>{cls.name}</TableCell>
                    <TableCell>{cls.code}</TableCell>
                    <TableCell>{cls.teacher_id}</TableCell>
                    <TableCell>
                      <Button variant="destructive" size="sm" onClick={() => handleDeleteClass(cls.id)}>Delete</Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center h-24 text-muted-foreground">
                    No classes found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Button asChild variant="outline">
        <Link href="/administrator/dashboard">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Link>
      </Button>
    </div>
  );
}