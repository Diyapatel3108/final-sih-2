"use client";
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BookOpen, Clock, ArrowRight, Code, Calendar, MoreHorizontal, User, Users, Settings, BotMessageSquare, Download, Plus, Pencil, Trash } from "lucide-react";
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import Image from "next/image";
import type { Class } from "@/lib/types";
import { supabase } from '@/lib/supabaseClient';

const getParticipationBadge = (level: string) => {
    switch (level) {
        case 'High': return 'default';
        case 'Medium': return 'secondary';
        case 'Low': return 'destructive';
        default: return 'outline';
    }
}

import { useAuth } from "@/components/layout/AuthContext";
import { useEffect, useState } from "react";

export default function ManagementPage() {
    const { user, loading } = useAuth();
    const [classes, setClasses] = useState<any[]>([]);
    const [students, setStudents] = useState<any[]>([]);
    const [isAddClassDialogOpen, setIsAddClassDialogOpen] = useState(false);
    const [newClassName, setNewClassName] = useState('');
    const [newClassCode, setNewClassCode] = useState('');
    const [isAddStudentDialogOpen, setIsAddStudentDialogOpen] = useState(false);
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedStudent, setSelectedStudent] = useState('');
    const [isEditClassDialogOpen, setIsEditClassDialogOpen] = useState(false);
    const [selectedClassToEdit, setSelectedClassToEdit] = useState<any>(null);


    const fetchClasses = async () => {
        if (user) {
            const { data, error } = await supabase
                .from('classes')
                .select(`
                    id,
                    name,
                    code,
                    student_classes ( count )
                `)
                .eq('teacher_id', user.id);

            if (error) {
                console.error('Error fetching classes:', error);
            } else {
                setClasses(data || []);
            }
        }
    };

    const handleCreateClass = async () => {
        if (!user) return;

        const response = await fetch('/api/class/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: newClassName,
                code: newClassCode,
            }),
        });

        if (response.ok) {
            setNewClassName('');
            setNewClassCode('');
            setIsAddClassDialogOpen(false);
            fetchClasses();
        } else {
            const errorData = await response.json();
            console.error('Failed to create class:', errorData);
        }
    };

    const fetchStudents = async () => {
        if (user) {
            const { data, error } = await supabase
                .from('users')
                .select('*')
                .eq('role', 'student');

            if (error) {
                console.error('Error fetching students:', error);
            } else {
                setStudents(data);
            }
        }
    };

    const handleAddStudent = async () => {
        if (!selectedClass || !selectedStudent) {
            // Or show a toast/error message
            return;
        }

        const response = await fetch('/api/class/add-student', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                class_id: selectedClass,
                student_id: selectedStudent,
            }),
        });

        if (response.ok) {
            setIsAddStudentDialogOpen(false);
            // Maybe refresh student list for the class
            fetchClasses(); // Re-fetch to update student counts
        } else {
            console.error('Failed to add student to class');
        }
    };

    const handleEditClass = (cls: any) => {
        setSelectedClassToEdit(cls);
        setIsEditClassDialogOpen(true);
    };

    const handleDeleteClass = async (classId: string) => {
        const { error } = await supabase.from('classes').delete().eq('id', classId);
        if (!error) {
            fetchClasses();
        }
    };

    const handleSaveChanges = async () => {
        if (!selectedClassToEdit) return;

        const { error } = await supabase
            .from('classes')
            .update({ name: selectedClassToEdit.name, code: selectedClassToEdit.code })
            .eq('id', selectedClassToEdit.id);

        if (!error) {
            setIsEditClassDialogOpen(false);
            fetchClasses();
        }
    };

    useEffect(() => {
        fetchClasses();
        fetchStudents();
    }, [user]);

    const fetchStudentsForClass = async (classId: string) => {
        const { data, error } = await supabase
            .from('student_classes')
            .select('users!inner(*)')
            .eq('class_id', classId);

        if (data) {
            const students = data.map((item: any) => item.users).filter(Boolean);
            setStudents(students);
        }
    };


    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <div>Please log in to view this page.</div>;
    }
    const studentData = students;

  return (
    <div className="flex flex-col gap-8">
      <DashboardHeader title="Class Management" description="Manage your classes, students, and settings." />
      <main className="flex-1 overflow-y-auto space-y-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
                <CardHeader className="flex-row items-center justify-between">
                    <div>
                        <CardTitle>Class Management</CardTitle>
                        <CardDescription>View and edit your classes.</CardDescription>
                    </div>
                    <Button size="sm" onClick={() => setIsAddClassDialogOpen(true)}><Plus className="mr-2 h-4 w-4"/> Add Class</Button>
                </CardHeader>
                <CardContent>
                    {(classes || []).length > 0 ? (
                      <ul className="space-y-3">
                          {(classes || []).map((cls: any) => (
                              <li key={cls.id} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                                  <div>
                                      <p className="font-semibold">{cls.name} ({cls.code})</p>
                                      <p className="text-sm text-muted-foreground">{cls.student_classes[0]?.count || 0} students</p>
                                  </div>
                                  <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                          <Button variant="ghost" size="icon" className="h-8 w-8">
                                              <MoreHorizontal className="h-4 w-4" />
                                          </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align="end">
                                          <DropdownMenuItem onClick={() => handleEditClass(cls)}><Pencil className="mr-2 h-4 w-4"/> Edit</DropdownMenuItem>
                                          <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteClass(cls.id)}><Trash className="mr-2 h-4 w-4"/> Delete</DropdownMenuItem>
                                      </DropdownMenuContent>
                                  </DropdownMenu>
                              </li>
                          ))}
                      </ul>
                    ) : (
                      <p className="text-muted-foreground">You have not created any classes yet.</p>
                    )}
                </CardContent>
            </Card>
            <Dialog open={isAddClassDialogOpen} onOpenChange={setIsAddClassDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Class</DialogTitle>
                        <DialogDescription>
                            Enter the details for your new class below.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="className">Class Name</Label>
                            <Input id="className" placeholder="e.g., Introduction to Programming" value={newClassName} onChange={(e) => setNewClassName(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="classCode">Class Code</Label>
                            <Input id="classCode" placeholder="e.g., CS101" value={newClassCode} onChange={(e) => setNewClassCode(e.target.value)} />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAddClassDialogOpen(false)}>Cancel</Button>
                        <Button onClick={handleCreateClass}>Create Class</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Card>
                <CardHeader className="flex-row items-center justify-between">
                    <div>
                        <CardTitle>Student Roster</CardTitle>
                        <CardDescription>List of all students in your classes.</CardDescription>
                    </div>
                    <Button size="sm" onClick={() => setIsAddStudentDialogOpen(true)}><Plus className="mr-2 h-4 w-4"/> Add Student</Button>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {studentData.length > 0 ? studentData.slice(0, 4).map((student: any) => (
                                <TableRow key={student.id}>
                                    <TableCell className="font-medium flex items-center gap-3">
                                        <Image src={student.avatar_url || `https://i.pravatar.cc/150?u=${student.id}`} alt={student.name} width={32} height={32} className="rounded-full" data-ai-hint="student profile" />
                                        {student.name}
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">{student.email}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm">View Details</Button>
                                    </TableCell>
                                </TableRow>
                            )) : (
                              <TableRow>
                                <TableCell colSpan={3} className="text-center text-muted-foreground">No students enrolled in your classes.</TableCell>
                              </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <Dialog open={isAddStudentDialogOpen} onOpenChange={setIsAddStudentDialogOpen}>
                <DialogContent>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        handleAddStudent();
                    }}>
                        <DialogHeader>
                            <DialogTitle>Add Student to Class</DialogTitle>
                            <DialogDescription>
                                Select a student and a class to add them to.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="class">Class</Label>
                                <Select onValueChange={setSelectedClass}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a class" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {classes.map((cls) => (
                                            <SelectItem key={cls.id} value={cls.id}>
                                                {cls.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="student">Student</Label>
                                <Select onValueChange={setSelectedStudent}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a student" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {students.map((student) => (
                                            <SelectItem key={student.id} value={student.id}>
                                                {student.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsAddStudentDialogOpen(false)}>Cancel</Button>
                            <Button type="submit">Add Student</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
            <Dialog open={isEditClassDialogOpen} onOpenChange={setIsEditClassDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Class</DialogTitle>
                        <DialogDescription>
                            Update the class details below.
                        </DialogDescription>
                    </DialogHeader>
                    {selectedClassToEdit && (
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="className">Class Name</Label>
                                <Input id="className" value={selectedClassToEdit.name} onChange={(e) => setSelectedClassToEdit({ ...selectedClassToEdit, name: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="classCode">Class Code</Label>
                                <Input id="classCode" value={selectedClassToEdit.code} onChange={(e) => setSelectedClassToEdit({ ...selectedClassToEdit, code: e.target.value })} />
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsEditClassDialogOpen(false)}>Cancel</Button>
                        <Button onClick={handleSaveChanges}>Save Changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
        
        {/* Student List & Bulk Actions */}
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <CardTitle>Student List</CardTitle>
                    <CardDescription>Showing students for 'Introduction to AI'</CardDescription>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                    <Select onValueChange={fetchStudentsForClass}>
                        <SelectTrigger className="w-full sm:w-[200px]">
                            <SelectValue placeholder="Select a class" />
                        </SelectTrigger>
                        <SelectContent>
                            {(classes || []).map((cls: any) => (
                                <SelectItem key={cls.id} value={cls.id}>{cls.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                     <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="w-full sm:w-auto">
                                <Users className="mr-2"/> Bulk Actions
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem><BotMessageSquare className="mr-2" /> Message Selected</DropdownMenuItem>
                            <DropdownMenuItem><Download className="mr-2" /> Export Data</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Attendance</TableHead>
                  <TableHead>Participation</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {studentData.map((student: any) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-mono text-xs whitespace-nowrap">{student.id}</TableCell>
                    <TableCell className="font-medium whitespace-nowrap">{student.name}</TableCell>
                    <TableCell className="whitespace-nowrap">95%</TableCell>
                    <TableCell>
                      <Badge variant={'secondary'}>Medium</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem><User className="mr-2"/> View Profile</DropdownMenuItem>
                                <DropdownMenuItem><BotMessageSquare className="mr-2"/> Send Message</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Settings */}
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Settings /> Class Settings</CardTitle>
                <CardDescription>Manage settings for 'Introduction to AI'</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                        <Label htmlFor="auto-reminders">Automated Reminders</Label>
                        <p className="text-xs text-muted-foreground">Send reminders for upcoming deadlines.</p>
                    </div>
                    <Switch id="auto-reminders" defaultChecked />
                </div>
                 <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                        <Label htmlFor="participation-tracking">Enable Participation Tracking</Label>
                        <p className="text-xs text-muted-foreground">Allow AI to track student engagement.</p>
                    </div>
                    <Switch id="participation-tracking" />
                </div>
            </CardContent>
            <CardFooter>
                <Button>Save Settings</Button>
            </CardFooter>
        </Card>

      </main>
    </div>
  );
}
