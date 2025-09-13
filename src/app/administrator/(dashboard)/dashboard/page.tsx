
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";

import { supabase } from "@/lib/supabaseClient";

const quickActions = [
    { label: "Add User", href: "/administrator/users/add" },
    { label: "Generate Report", href: "/administrator/reports" },
    { label: "System Health", href: "/administrator/hardware" },
];

export default async function AdminDashboardPage() {
  const { data: users, error: usersError } = await supabase.from('users').select('id, role');
  const { data: recentActivity, error: activityError } = await supabase.from('activities').select('*').order('created_at', { ascending: false }).limit(5);

  const totalUsers = users?.length || 0;

  const stats = [
    { label: "Total Users", value: totalUsers, color: "text-blue-400" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">System-wide overview and management.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              <div />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
             <Alert variant="destructive" className="bg-yellow-900/50 border-yellow-700 text-yellow-300 [&>svg]:text-yellow-400">
                <div />
                <AlertTitle>Live Alert</AlertTitle>
                <div className="flex justify-between items-center">
                    <AlertDescription>
                        Camera 3 offline at Main Entrance
                    </AlertDescription>
                    <Button variant="outline" size="sm" className="bg-transparent border-yellow-500 hover:bg-yellow-500/20" asChild>
                        <Link href="/administrator/hardware">Troubleshoot</Link>
                    </Button>
                </div>
            </Alert>
            <Card>
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>A log of the latest system and user actions.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Time</TableHead>
                                <TableHead>Action</TableHead>
                                <TableHead>User</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {(recentActivity || []).map((activity, index) => (
                                <TableRow key={index}>
                                    <TableCell>{new Date(activity.created_at).toLocaleString()}</TableCell>
                                    <TableCell>{activity.action}</TableCell>
                                    <TableCell>{activity.user_email}</TableCell>
                                    <TableCell>
                                    <Badge variant={activity.status === "Success" ? "default" : "destructive"} className={activity.status === 'Success' ? 'bg-green-600' : 'bg-yellow-600'}>
                                        {activity.status}
                                    </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col space-y-3">
              {quickActions.map((action) => (
                <Button key={action.label} asChild>
                  <Link href={action.href}>
                    <div />
                    {action.label}
                  </Link>
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
