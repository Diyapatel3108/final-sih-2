
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Send, ArrowLeft } from "lucide-react";
import Link from "next/link";


export default function FeesRemainingPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold">Remaining Fees</h1>
        <p className="text-muted-foreground">Track students with outstanding fee balances.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Outstanding Balances</CardTitle>
          <CardDescription>
            List of students with fees yet to be paid.
          </CardDescription>
        </CardHeader>
        <CardContent>
           <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student Name</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Amount Due</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>James Smith</TableCell>
                <TableCell>Computer Science</TableCell>
                <TableCell className="font-medium text-red-400">$2,500</TableCell>
                <TableCell>2024-08-15</TableCell>
                <TableCell><Badge variant="destructive">Overdue</Badge></TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    <Send className="mr-2 h-4 w-4" />
                    Send Reminder
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Emily White</TableCell>
                <TableCell>Electrical Engineering</TableCell>
                <TableCell className="font-medium text-yellow-400">$5,000</TableCell>
                <TableCell>2024-09-01</TableCell>
                <TableCell><Badge className="bg-yellow-600 hover:bg-yellow-700">Pending</Badge></TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    <Send className="mr-2 h-4 w-4" />
                    Send Reminder
                  </Button>
                </TableCell>
              </TableRow>
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
