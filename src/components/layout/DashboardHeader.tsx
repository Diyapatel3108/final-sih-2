
'use client';

interface DashboardHeaderProps {
    title: string;
    description?: string;
}

export function DashboardHeader({ title, description }: DashboardHeaderProps) {
    return (
        <div className="p-4 sm:p-6 pb-0">
            <h1 className="text-3xl font-bold font-headline">{title}</h1>
            {description && <p className="text-muted-foreground">{description}</p>}
        </div>
    )
}
