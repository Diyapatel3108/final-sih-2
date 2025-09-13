import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function AdministratorDashboard() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center p-4">
      <h1 className="text-4xl font-bold font-headline">Administrator Dashboard</h1>
      <p className="mt-4 text-lg text-muted-foreground">Welcome, Administrator! Manage your system here.</p>
      <Button asChild className="mt-8">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go Back
        </Link>
      </Button>
    </div>
  );
}
