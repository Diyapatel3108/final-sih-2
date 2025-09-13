
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function AttendanceRedirectPage() {
  return (
    <div className="flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
            <CardHeader>
                <CardTitle className="text-2xl">Attendance</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground mb-6">Please select a section from the sidebar.</p>
                <Button asChild>
                    <Link href="/administrator/attendance/summary">
                    Go to Summary
                    </Link>
                </Button>
            </CardContent>
        </Card>
    </div>
  );
}
