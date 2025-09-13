

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Users, CheckCircle, XCircle } from "lucide-react";
import { AttendanceChart } from "./AttendanceChart";


export default function AttendanceSummaryPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold">Attendance Summary</h1>
        <p className="text-muted-foreground">An overview of campus-wide attendance.</p>
      </div>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Overall Attendance</CardTitle>
            <TrendingUp className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">94.2%</div>
            <p className="text-xs text-muted-foreground">+2.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Students Present</CardTitle>
            <CheckCircle className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">1,180</div>
            <p className="text-xs text-muted-foreground">out of 1,250 total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Students Absent</CardTitle>
            <XCircle className="h-5 w-5 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">70</div>
             <p className="text-xs text-muted-foreground">6% of total students</p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">High-Risk Students</CardTitle>
            <TrendingDown className="h-5 w-5 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Attendance below 75%</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
         <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Daily Attendance Trend</CardTitle>
            <CardDescription>
              Attendance percentage over the last 7 days.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AttendanceChart />
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
           <CardHeader>
            <CardTitle>Attendance by Department</CardTitle>
             <CardDescription>
              Live overview of attendance rates.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Department</TableHead>
                  <TableHead className="text-right">Attendance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                    <TableCell>Computer Science</TableCell>
                    <TableCell className="text-right font-bold text-green-400">98%</TableCell>
                </TableRow>
                 <TableRow>
                    <TableCell>Electrical Engineering</TableCell>
                    <TableCell className="text-right font-bold text-green-400">96%</TableCell>
                </TableRow>
                 <TableRow>
                    <TableCell>Mechanical Engineering</TableCell>
                    <TableCell className="text-right font-bold text-yellow-400">89%</TableCell>
                </TableRow>
                 <TableRow>
                    <TableCell>Civil Engineering</TableCell>
                    <TableCell className="text-right font-bold text-red-400">74%</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
