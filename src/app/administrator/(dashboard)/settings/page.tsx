
'use client';

import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import Link from "next/link";

const permissions = [
  { feature: 'Access Admin Dashboard', admin: true, teacher: false, student: false },
  { feature: 'Manage User Accounts', admin: true, teacher: false, student: false },
  { feature: 'View System-Wide Analytics', admin: true, teacher: false, student: false },
  { feature: 'Manage Student Records', admin: true, teacher: false, student: false },
  { feature: 'Access Teacher Dashboard', admin: true, teacher: true, student: false },
  { feature: 'Manage Own Classes', admin: false, teacher: true, student: false },
  { feature: 'Generate Attendance QR Codes', admin: false, teacher: true, student: false },
  { feature: 'View Own Class Analytics', admin: false, teacher: true, student: false },
  { feature: 'Access Student Dashboard', admin: true, teacher: true, student: true },
  { feature: 'Scan QR for Attendance', admin: false, teacher: false, student: true },
  { feature: 'View Own Attendance', admin: false, teacher: false, student: true },
  { feature: 'View Activity/Gamification', admin: false, teacher: false, student: true },
];

export default function SettingsPage() {
  return (
    <div className="flex flex-col h-screen">
      <DashboardHeader title="System Settings & Permissions" description="Manage access control for different user roles." />
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="text-primary" />
              Role-Based Permissions
            </CardTitle>
            <CardDescription>
              Manage permissions for each user role in the system. Checked boxes indicate access is granted.
            </CardDescription>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/3">Feature</TableHead>
                  <TableHead className="text-center">Admin</TableHead>
                  <TableHead className="text-center">Teacher</TableHead>
                  <TableHead className="text-center">Student</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {permissions.map((perm, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium whitespace-nowrap">{perm.feature}</TableCell>
                    <TableCell className="text-center">
                      <Checkbox checked={perm.admin} disabled aria-label={`${perm.feature} Admin Permission`} />
                    </TableCell>
                    <TableCell className="text-center">
                      <Checkbox checked={perm.teacher} aria-label={`${perm.feature} Teacher Permission`} />
                    </TableCell>
                    <TableCell className="text-center">
                      <Checkbox checked={perm.student} aria-label={`${perm.feature} Student Permission`} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="border-t pt-6 justify-between">
            <Button>Save Changes</Button>
             <Button asChild variant="outline">
                <Link href="/administrator/dashboard">
                    <ArrowLeft className="mr-2" />
                    Back to Dashboard
                </Link>
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
