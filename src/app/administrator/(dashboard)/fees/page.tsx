

"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { DollarSign, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FeesChart } from "./FeesChart";
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


import { supabase } from "@/lib/supabaseClient";

export default function FeesOverviewPage() {
  const [fees, setFees] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [isAssignFeeDialogOpen, setIsAssignFeeDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState('');

  const fetchFees = async () => {
    const { data, error } = await supabase.from('fees').select('amount, status');
    if (data) {
      setFees(data);
    }
  };

  const fetchStudents = async () => {
    const { data, error } = await supabase.from('users').select('id, name').eq('role', 'student');
    if (data) {
      setStudents(data);
    }
  };

  useEffect(() => {
    fetchFees();
    fetchStudents();
  }, []);

  const handleAssignFee = async () => {
    const { error } = await supabase.from('fees').insert([
      { student_id: selectedStudent, amount, due_date: dueDate, status: 'Unpaid' },
    ]);

    if (!error) {
      setIsAssignFeeDialogOpen(false);
      fetchFees();
    }
  };

  const totalFees = fees.reduce((acc, fee) => acc + fee.amount, 0) || 0;
  const feesCollected = fees?.filter(fee => fee.status === 'Paid').reduce((acc, fee) => acc + fee.amount, 0) || 0;
  const feesRemaining = totalFees - feesCollected;
  const collectionRate = totalFees > 0 ? (feesCollected / totalFees) * 100 : 0;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold">Fees Overview</h1>
        <p className="text-muted-foreground">A summary of fee collection status.</p>
      </div>
      <div className="flex justify-end">
        <Button onClick={() => setIsAssignFeeDialogOpen(true)}>Assign Fee</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Fees</CardTitle>
            <DollarSign className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">${totalFees.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Fees Collected</CardTitle>
                <div />
            </CardHeader>
            <CardContent>
                <div className="text-4xl font-bold text-green-400">${feesCollected.toLocaleString()}</div>
                <Button variant="link" size="sm" className="p-0 h-auto" asChild>
                    <Link href="/administrator/fees/collected">
                        View Collected <Eye className="ml-1 h-4 w-4" />
                    </Link>
                </Button>
            </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Fees Remaining</CardTitle>
            <div />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-yellow-400">${feesRemaining.toLocaleString()}</div>
             <Button variant="link" size="sm" className="p-0 h-auto" asChild>
                <Link href="/administrator/fees/remaining">
                    View Remaining <Eye className="ml-1 h-4 w-4" />
                </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Collection Progress</CardTitle>
            <CardDescription>
              {collectionRate.toFixed(2)}% of total fees have been collected.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={collectionRate} className="h-4" />
            <div className="flex justify-between mt-2 text-sm text-muted-foreground">
              <span>$0</span>
              <span>${totalFees.toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Collections</CardTitle>
            <CardDescription>
              Fees collected over the last 6 months.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FeesChart />
          </CardContent>
        </Card>
      </div>
    <Dialog open={isAssignFeeDialogOpen} onOpenChange={setIsAssignFeeDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Fee</DialogTitle>
            <DialogDescription>
              Assign a new fee to a student.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
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
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input id="amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="due_date">Due Date</Label>
              <Input id="due_date" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAssignFeeDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAssignFee}>Assign Fee</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
