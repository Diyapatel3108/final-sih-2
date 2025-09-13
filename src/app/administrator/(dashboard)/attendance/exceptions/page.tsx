
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertCircle, Check, X, ArrowLeft } from "lucide-react";
import Link from "next/link";

const exceptionRequests = [
    { name: "John Doe", class: "CS101", date: "2024-07-30", reason: "Medical emergency", status: "Pending" },
    { name: "Jane Smith", class: "EE203", date: "2024-07-29", reason: "Family event", status: "Approved" },
    { name: "Mike Johnson", class: "ME305", date: "2024-07-28", reason: "Internet outage", status: "Rejected" },
];

export default function AttendanceExceptionsPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold">Attendance Exceptions</h1>
        <p className="text-muted-foreground">Review and manage student attendance exception requests.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Exception Requests</CardTitle>
          <CardDescription>
            Approve or reject requests for excused absences.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student Name</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {exceptionRequests.map((request, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{request.name}</TableCell>
                  <TableCell>{request.class}</TableCell>
                  <TableCell>{request.date}</TableCell>
                  <TableCell className="max-w-xs truncate">{request.reason}</TableCell>
                  <TableCell>
                    <Badge variant={
                      request.status === "Approved" ? "default" :
                      request.status === "Rejected" ? "destructive" : "secondary"
                    } className={
                      request.status === "Approved" ? "bg-green-600" : ""
                    }>
                      {request.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    {request.status === "Pending" ? (
                      <div className="flex gap-2 justify-center">
                        <Button variant="outline" size="icon">
                          <Check className="h-4 w-4 text-green-500" />
                        </Button>
                        <Button variant="outline" size="icon">
                          <X className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    ) : (
                      <span>-</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
       <Card>
        <CardHeader>
          <CardTitle>Flagged Records</CardTitle>
          <CardDescription>
            Attendance records that require manual review (e.g., mismatch in face recognition).
          </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="text-center text-muted-foreground p-8 border rounded-lg">
                <AlertCircle className="mx-auto h-12 w-12 mb-4" />
                <p>No flagged records at this time.</p>
            </div>
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
