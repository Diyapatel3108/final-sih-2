'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

const chartData = [
  { month: "Jan", collected: 45000 },
  { month: "Feb", collected: 62000 },
  { month: "Mar", collected: 78000 },
  { month: "Apr", collected: 55000 },
  { month: "May", collected: 89000 },
  { month: "Jun", collected: 120000 },
];

export function FeesChart() {
    return (
        <ResponsiveContainer width="100%" height={150}>
            <BarChart data={chartData}>
            <XAxis
                dataKey="month"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
            />
            <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${Number(value) / 1000}k`}
            />
            <Tooltip
                cursor={{ fill: 'hsl(var(--secondary))' }}
                contentStyle={{ 
                background: 'hsl(var(--background))', 
                border: '1px solid hsl(var(--border))',
                borderRadius: 'var(--radius)'
                }}
            />
            <Bar dataKey="collected" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    )
}
