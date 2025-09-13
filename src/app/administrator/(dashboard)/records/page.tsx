
'use client';

import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileDown, Search, ArrowLeft } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import Link from "next/link";


const currentStudents = [
  { id: 'S001', name: 'Alice Johnson', email: 'alice@example.com', semester: 8, registered: '2020-08-15' },
  { id: 'S002', name: 'Bob Williams', email: 'bob@example.com', semester: 6, registered: '2021-08-20' },
  { id: 'S003', name: 'Charlie Brown', email: 'charlie@example.com', semester: 4, registered: '2022-08-18' },
  { id: 'S004', name: 'Diana Miller', email: 'diana@example.com', semester: 2, registered: '2023-08-22' },
];

const alumni = [
  { id: 'A001', name: 'Zane Miller', email: 'zane@example.com', passOutYear: 2023, degree: 'B.Tech CSE' },
  { id: 'A002', name: 'Yara Davis', email: 'yara@example.com', passOutYear: 2022, degree: 'B.Tech ECE' },
  { id: 'A003', name: 'Xavier Smith', email: 'xavier@example.com', passOutYear: 2023, degree: 'M.Tech AI' },
];

export default function RecordsPage() {
  return (
    <div className="flex flex-col h-screen">
      <DashboardHeader title="Student Records" description="View and manage student records." />
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <Tabs defaultValue="current">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
            <TabsList>
              <TabsTrigger value="current">Current Students</TabsTrigger>
              <TabsTrigger value="alumni">Alumni Records</TabsTrigger>
            </TabsList>
            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2 w-full md:w-auto">
                 <div className="relative w-full md:w-auto">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search records..." className="pl-8 w-full md:w-64" />
                 </div>
                 <Button variant="outline" className="w-full md:w-auto"><FileDown className="mr-2" /> Export</Button>
            </div>
          </div>
          <Card>
            <TabsContent value="current">
              <CardHeader>
                <CardTitle>Current Student Records</CardTitle>
                <CardDescription>Records of all students currently enrolled, organized by semester.</CardDescription>
              </CardHeader>
              <CardContent className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Current Semester</TableHead>
                      <TableHead>Date Registered</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentStudents.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-mono whitespace-nowrap">{user.id}</TableCell>
                        <TableCell className="whitespace-nowrap">{user.name}</TableCell>
                        <TableCell className="whitespace-nowrap">{user.email}</TableCell>
                        <TableCell className="text-center whitespace-nowrap">{user.semester}</TableCell>
                        <TableCell className="whitespace-nowrap">{user.registered}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </TabsContent>
            <TabsContent value="alumni">
               <CardHeader>
                <CardTitle>Alumni Student Records</CardTitle>
                <CardDescription>Records of students who have graduated, organized by pass-out year.</CardDescription>
              </CardHeader>
              <CardContent className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Degree</TableHead>
                      <TableHead>Pass Out Year</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {alumni.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-mono whitespace-nowrap">{user.id}</TableCell>
                        <TableCell className="whitespace-nowrap">{user.name}</TableCell>
                        <TableCell className="whitespace-nowrap">{user.email}</TableCell>
                        <TableCell className="whitespace-nowrap">{user.degree}</TableCell>
                        <TableCell className="text-center whitespace-nowrap">{user.passOutYear}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </TabsContent>
          </Card>
        </Tabs>
        <div className="mt-6">
          <Button asChild variant="outline">
            <Link href="/administrator/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
