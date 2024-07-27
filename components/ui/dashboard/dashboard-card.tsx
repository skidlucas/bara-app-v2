'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/basics/card'

interface DashboardCardProps {
    title: string
    description?: string
    content?: string
    footer?: string
}
export function DashboardCard({ title, description, content, footer }: DashboardCardProps) {
    return (
        <Card className="w-full my-2 md:w-1/4 md:my-0">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                {description && <CardDescription>{description}</CardDescription>}
            </CardHeader>
            {content && (
                <CardContent>
                    <p>{content}</p>
                </CardContent>
            )}
            {footer && (
                <CardFooter>
                    <p>{footer}</p>
                </CardFooter>
            )}
        </Card>
    )
}
