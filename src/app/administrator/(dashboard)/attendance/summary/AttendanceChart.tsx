'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

const chartData = [
    { date: "Jul 22", present: 95 },
    { date: "Jul 23", present: 92 },
    { date: "Jul 24", present: 88 },
    { date: "Jul 25", present: 96 },
    { date: "Jul 26", present: 98 },
    { date: "Jul 27", present: 99 },
    { date: "Jul 28", present: 97 },
];

export function AttendanceChart() {
    return (
        <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
            <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}%`} />
            <Tooltip
                cursor={{ fill: 'hsl(var(--secondary))' }}
                contentStyle={{ 
                background: 'hsl(var(--background))', 
                border: '1px solid hsl(var(--border))',
                borderRadius: 'var(--radius)'
                }}
            />
            <Bar dataKey="present" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    )
}