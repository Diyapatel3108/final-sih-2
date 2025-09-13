import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FaUserGraduate, FaChalkboardTeacher } from "react-icons/fa";
import { GrUserAdmin } from "react-icons/gr";


const roles = [
    {
      name: "Student",
      description: "Access your grades, attendance, and learning materials.",
      href: "/login?role=student",
      icon: <FaUserGraduate className="h-12 w-12 text-primary" />,
    },
    {
      name: "Teacher",
      description: "Manage your classes, students, and post announcements.",
      href: "/login?role=teacher",
      icon: <FaChalkboardTeacher className="h-12 w-12 text-primary" />,
    },
    {
      name: "Administrator",
      description: "Oversee the entire system, manage users, and generate reports.",
      href: "/login?role=admin",
      icon: <GrUserAdmin className="h-12 w-12 text-primary" />,
    },
  ];

export default function RoleSelector() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 p-4 font-sans">
      <div className="w-full max-w-4xl space-y-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl font-headline">
            Choose Your Role
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Select your profile to access your personalized dashboard.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {roles.map((role) => (
            <Link href={role.href} key={role.name} className="block group">
              <Card className="h-full w-full max-w-sm transform-gpu overflow-hidden bg-card/60 backdrop-blur-sm transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl group-hover:bg-card/80">
                <CardHeader className="items-center p-8 pb-4">
                  {role.icon}
                </CardHeader>
                <CardContent className="text-center p-8 pt-4">
                  <CardTitle className="mb-2 text-2xl font-bold font-headline">{role.name}</CardTitle>
                  <CardDescription>{role.description}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
