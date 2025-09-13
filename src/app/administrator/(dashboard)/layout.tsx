
'use client';

import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  Users,
  DollarSign,
  ClipboardCheck,
  BarChart,
  Database,
  Settings,
  HardDrive,
  PanelLeft,
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { usePathname } from 'next/navigation';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from '@/lib/utils';

const mainSidebarNavItems = [
  { href: '/administrator/dashboard', icon: <LayoutDashboard />, label: 'Dashboard' },
];

const userManagementSubNavItems = [
    { href: '/administrator/users', label: 'All User' },
    { href: '/administrator/users/add', label: 'Add User' },
    { href: '/administrator/users/import-export', label: 'Import/Export' },
]

const feesSubNavItems = [
    { href: '/administrator/fees', label: 'Overview' },
    { href: '/administrator/fees/collected', label: 'Fees Collected' },
    { href: '/administrator/fees/remaining', label: 'Fees Remaining' },
]

const attendanceSubNavItems = [
    { href: '/administrator/attendance/summary', label: 'Summary' },
    { href: '/administrator/attendance/exceptions', label: 'Exceptions' },
]

const otherSidebarNavItems = [
  { href: '/administrator/reports', icon: <BarChart />, label: 'Reports' },
  { href: '/administrator/records', icon: <Database />, label: 'Records' },
  { href: '/administrator/settings', icon: <Settings />, label: 'Settings' },
  { href: '/administrator/hardware', icon: <HardDrive />, label: 'Hardware Settings' },
];

export default function AdministratorDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const pathname = usePathname();

    const isUsersRouteActive = pathname.startsWith('/administrator/users');
    const isFeesRouteActive = pathname.startsWith('/administrator/fees');
    const isAttendanceRouteActive = pathname.startsWith('/administrator/attendance');

  const sidebarContent = (
    <>
      <div className="flex items-center gap-3 mb-8 group p-4">
        <Avatar className="group-hover:ring-2 group-hover:ring-primary transition-all">
          <AvatarImage src="https://picsum.photos/100/100" alt="Admin" data-ai-hint="admin person" />
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold group-hover:underline">Admin User</p>
          <p className="text-sm text-muted-foreground">System Administrator</p>
        </div>
      </div>
      <nav className="flex flex-col gap-1 flex-1 px-4">
        {mainSidebarNavItems.map((item) => (
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

        <Accordion type="single" collapsible defaultValue={isUsersRouteActive ? "users" : undefined}>
            <AccordionItem value="users" className="border-none">
                <AccordionTrigger className={cn(
                    "justify-start gap-3 p-3 rounded-md text-sm font-medium hover:no-underline",
                    isUsersRouteActive ? 'bg-secondary text-secondary-foreground' : 'hover:bg-muted'
                    )}>
                     <Users className="h-5 w-5"/> User Management
                </AccordionTrigger>
                <AccordionContent className="pl-8 pt-2 space-y-1">
                    {userManagementSubNavItems.map(item => (
                        <Button
                            key={item.label}
                            variant={pathname === item.href ? 'secondary' : 'ghost'}
                            className="justify-start gap-3 w-full"
                            asChild
                        >
                            <Link href={item.href}>
                                {item.label}
                            </Link>
                        </Button>
                    ))}
                </AccordionContent>
            </AccordionItem>
        </Accordion>

        <Accordion type="single" collapsible defaultValue={isFeesRouteActive ? "fees" : undefined}>
            <AccordionItem value="fees" className="border-none">
                <AccordionTrigger className={cn(
                    "justify-start gap-3 p-3 rounded-md text-sm font-medium hover:no-underline",
                    isFeesRouteActive ? 'bg-secondary text-secondary-foreground' : 'hover:bg-muted'
                    )}>
                     <DollarSign className="h-5 w-5"/> Fees Management
                </AccordionTrigger>
                <AccordionContent className="pl-8 pt-2 space-y-1">
                    {feesSubNavItems.map(item => (
                        <Button
                            key={item.label}
                            variant={pathname === item.href ? 'secondary' : 'ghost'}
                            className="justify-start gap-3 w-full"
                            asChild
                        >
                            <Link href={item.href}>
                                {item.label}
                            </Link>
                        </Button>
                    ))}
                </AccordionContent>
            </AccordionItem>
        </Accordion>

        <Accordion type="single" collapsible defaultValue={isAttendanceRouteActive ? "attendance" : undefined}>
            <AccordionItem value="attendance" className="border-none">
                <AccordionTrigger className={cn(
                    "justify-start gap-3 p-3 rounded-md text-sm font-medium hover:no-underline",
                    isAttendanceRouteActive ? 'bg-secondary text-secondary-foreground' : 'hover:bg-muted'
                    )}>
                     <ClipboardCheck className="h-5 w-5"/> Attendance
                </AccordionTrigger>
                <AccordionContent className="pl-8 pt-2 space-y-1">
                    {attendanceSubNavItems.map(item => (
                        <Button
                            key={item.label}
                            variant={pathname.startsWith(item.href) ? 'secondary' : 'ghost'}
                            className="justify-start gap-3 w-full"
                            asChild
                        >
                            <Link href={item.href}>
                                {item.label}
                            </Link>
                        </Button>
                    ))}
                </AccordionContent>
            </AccordionItem>
        </Accordion>


        {otherSidebarNavItems.map((item) => (
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
        <Button variant="ghost" className="justify-start gap-3 text-red-500 hover:text-red-600" asChild>
          <Link href="/">
            Logout
          </Link>
        </Button>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <aside className="hidden w-72 flex-col border-r bg-background md:flex">
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
            <SheetContent side="left" className="p-0 w-72 flex flex-col">
              {sidebarContent}
            </SheetContent>
          </Sheet>
        </header>
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
