
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DollarSign, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function FeesCollectedPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold">Fees Collected</h1>
        <p className="text-muted-foreground">View records of all fee payments.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
          <CardDescription>
            A detailed log of all fees collected from students.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student Name</TableHead>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Alex Johnson</TableCell>
                <TableCell>TXN123456</TableCell>
                <TableCell>2024-07-30</TableCell>
                <TableCell className="font-medium">$5,000</TableCell>
                <TableCell><Badge className="bg-green-600 hover:bg-green-700">Paid</Badge></TableCell>
              </TableRow>
               <TableRow>
                <TableCell>Maria Garcia</TableCell>
                <TableCell>TXN123457</TableCell>
                <TableCell>2024-07-29</TableCell>
                <TableCell className="font-medium">$5,000</TableCell>
                <TableCell><Badge className="bg-green-600 hover:bg-green-700">Paid</Badge></TableCell>
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
