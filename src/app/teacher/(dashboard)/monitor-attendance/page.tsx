
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UserCheck, UserX, Clock, Users, Filter, Download, BookOpen, GraduationCap } from "lucide-react";
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/components/layout/AuthContext';

const getStatusBadgeVariant = (status: string) => {
    switch (status) {
        case 'Present':
            return 'secondary';
        case 'Absent':
            return 'destructive';
        case 'Late':
            return 'default';
        default:
            return 'outline';
    }
}


export default function MonitorAttendancePage() {
  const { profile: teacher } = useAuth();
  const [classes, setClasses] = useState<any[]>([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [sessions, setSessions] = useState<any[]>([]);
  const [selectedSession, setSelectedSession] = useState('');
  const [attendanceRecords, setAttendanceRecords] = useState<any[]>([]);
  const isDataVisible = selectedClass && selectedSession;

  const fetchClasses = async () => {
    if (teacher) {
      const { data, error } = await supabase
        .from('classes')
        .select('id, name')
        .eq('teacher_id', teacher.id);
      if (data) {
        setClasses(data);
      }
    }
  };

  const fetchSessions = async (classId: string) => {
    const { data, error } = await supabase
      .from('sessions')
      .select('id, created_at')
      .eq('class_id', classId);
    if (data) {
      setSessions(data);
    }
  };

  const fetchAttendance = async (sessionId: string) => {
    const { data, error } = await supabase
      .from('attendance')
      .select('*, profiles (name)')
      .eq('session_id', sessionId);
    if (data) {
      setAttendanceRecords(data);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, [teacher]);

  useEffect(() => {
    if (selectedClass) {
      fetchSessions(selectedClass);
    }
  }, [selectedClass]);

  useEffect(() => {
    if (selectedSession) {
      fetchAttendance(selectedSession);
    }
  }, [selectedSession]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold">Monitor Attendance</h1>
        <p className="text-muted-foreground">Live attendance tracking for your active session.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Session Filter</CardTitle>
          <CardDescription>Please select a department and semester to view attendance.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    Class
                </label>
                <Select onValueChange={setSelectedClass} value={selectedClass}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a class..." />
                    </SelectTrigger>
                    <SelectContent>
                        {classes.map((cls) => (
                            <SelectItem key={cls.id} value={cls.id}>{cls.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                    <GraduationCap className="h-4 w-4" />
                    Session
                </label>
                 <Select onValueChange={setSelectedSession} value={selectedSession}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a session..." />
                    </SelectTrigger>
                    <SelectContent>
                        {sessions.map((session) => (
                            <SelectItem key={session.id} value={session.id}>{new Date(session.created_at).toLocaleString()}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </CardContent>
      </Card>
      
      {isDataVisible && (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Present</CardTitle>
                    <UserCheck className="h-5 w-5 text-green-500" />
                    </CardHeader>
                    <CardContent>
                    <div className="text-4xl font-bold">{attendanceRecords.filter(r => r.status === 'verified').length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Scanned</CardTitle>
                    <UserX className="h-5 w-5 text-yellow-500" />
                    </CardHeader>
                    <CardContent>
                    <div className="text-4xl font-bold">{attendanceRecords.filter(r => r.status === 'scanned').length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Total</CardTitle>
                    <Users className="h-5 w-5 text-primary" />
                    </CardHeader>
                    <CardContent>
                    <div className="text-4xl font-bold">{attendanceRecords.length}</div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                <CardTitle>Attendance Log</CardTitle>
                <p className="text-sm text-muted-foreground">Detailed attendance records for the current session.</p>
                </CardHeader>
                <CardContent>
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                    <Filter className="h-5 w-5 text-muted-foreground" />
                    <Input placeholder="Search by student name..." className="max-w-xs" />
                    <Select>
                        <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="All Statuses" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="present">Present</SelectItem>
                        <SelectItem value="absent">Absent</SelectItem>
                        <SelectItem value="late">Late</SelectItem>
                        </SelectContent>
                    </Select>
                    </div>
                    <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Export as CSV
                    </Button>
                </div>
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Student ID</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Face Match</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                        {attendanceRecords.map((record) => (
                            <TableRow key={record.id}>
                                <TableCell className="font-medium">{record.name}</TableCell>
                                <TableCell>{record.id}</TableCell>
                                <TableCell>{record.time}</TableCell>
                                <TableCell>
                                    <Badge variant={getStatusBadgeVariant(record.status)}>
                                        {record.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>{record.faceMatch}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                </CardContent>
            </Card>
        </div>
      )}
    </div>
  );
}
