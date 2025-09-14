
"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Bell, AlertTriangle, Info, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';


const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'warning':
      return <AlertTriangle className="h-4 w-4" />;
    case 'info':
      return <Info className="h-4 w-4" />;
    default:
      return <Bell className="h-4 w-4" />;
  }
};

const getNotificationVariant = (type: string): "default" | "destructive" | null | undefined => {
    switch (type) {
      case 'warning':
        return "destructive";
      default:
        return "default";
    }
  };

import { useAuth } from '@/components/layout/AuthContext';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function NotificationPage() {
  const { user: student, loading } = useAuth();
  const [notifications, setNotifications] = useState<any[]>([]);


  if (loading) {
    return <div>Loading...</div>;
  }

  if (!student) {
    return <div>Could not load profile.</div>;
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-muted/40 p-4 sm:p-8">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-3xl">
            <Bell />
            Notifications
          </CardTitle>
          <CardDescription>Here are your recent notifications and alerts.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {(notifications || []).map((notification: any, index: number) => (
            <Alert key={index} variant={getNotificationVariant(notification.type)}>
              {getNotificationIcon(notification.type)}
              <AlertTitle className="flex justify-between">
                {notification.title}
                <span className="text-xs text-muted-foreground font-normal">{new Date(notification.created_at).toLocaleString()}</span>
              </AlertTitle>
              <AlertDescription>{notification.description}</AlertDescription>
            </Alert>
          ))}
            <Button variant="outline" asChild className="w-full md:w-auto">
                <Link href="/student/dashboard">
                    <ArrowLeft className="mr-2" />
                    Back to Dashboard
                </Link>
            </Button>
        </CardContent>
      </Card>
    </div>
  );
}
