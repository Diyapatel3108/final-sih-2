
'use client';

import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  QrCode,
  Calendar,
  BookOpen,
  Settings,
  Bell,
  LogOut,
  PanelLeft,
  User,
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';


const sidebarNavItems = [
  { href: '/student/dashboard', icon: <LayoutDashboard />, label: 'Dashboard' },
  { href: '/student/qr-scanner', icon: <QrCode />, label: 'QR Scanner' },
  { href: '/student/attendance', icon: <Calendar />, label: 'Attendance' },
  { href: '/student/activity', icon: <BookOpen />, label: 'My Activity' },
  { href: '/student/notification', icon: <Bell />, label: 'Notifications' },
  { href: '/student/profile', icon: <User />, label: 'Profile' },
];

export default function StudentDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const pathname = usePathname();

  const sidebarContent = (
    <>
      <Link href="/student/profile" className="flex items-center gap-3 mb-8 group p-4">
        <Avatar className="group-hover:ring-2 group-hover:ring-primary transition-all">
          <AvatarImage src="https://picsum.photos/100/100" alt="Student" data-ai-hint="student person" />
          <AvatarFallback>AD</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold group-hover:underline">Alex Doe</p>
          <p className="text-sm text-muted-foreground">Student ID: 12345</p>
        </div>
      </Link>
      <nav className="flex flex-col gap-1 flex-1 px-4">
        {sidebarNavItems.map((item) => (
          <Button
            key={item.label}
            variant={pathname === item.href ? 'secondary' : 'ghost'}
            className="justify-start gap-3"
            asChild
          >
            <Link href={item.href}>
              {item.icon} {item.label}
            </Link>
          </Button>
        ))}
      </nav>
      <div className="mt-auto flex flex-col gap-2 p-4">
         <Button variant="ghost" className="justify-start gap-3" asChild>
                <Link href="#">
                    <Settings className="h-5 w-5" /> Settings
                </Link>
            </Button>
        <Button variant="ghost" className="justify-start gap-3 text-red-500 hover:text-red-600" asChild>
          <Link href="/">
             <LogOut className="h-5 w-5" /> Logout
          </Link>
        </Button>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <aside className="hidden w-64 flex-col border-r bg-background md:flex">
        {sidebarContent}
      </aside>
      <div className="flex flex-col flex-1">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 md:hidden">
           <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64 flex flex-col">
              {sidebarContent}
            </SheetContent>
          </Sheet>
        </header>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
