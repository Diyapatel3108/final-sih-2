
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function PlaceholderPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
            <CardHeader>
                <CardTitle className="text-2xl">Hardware Settings</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground mb-6">This page is under construction.</p>
                <Button asChild>
                    <Link href="/administrator/dashboard">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Go Back to Dashboard
                    </Link>
                </Button>
            </CardContent>
        </Card>
    </div>
  );
}
