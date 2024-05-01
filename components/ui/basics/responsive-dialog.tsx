import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/basics/dialog'
import { Button } from '@/components/ui/basics/button'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/basics/drawer'
import React, { useState } from 'react'
import { useDesktop } from '@/lib/hooks/use-media-query'

export function ResponsiveDialog({
    openButton,
    footer = true,
    title,
    description,
    children,
}: {
    openButton: React.ReactElement
    footer?: boolean
    title: string
    description?: string
    children: React.ReactNode
}) {
    const [open, setOpen] = useState(false)
    const isDesktop = useDesktop()

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>{openButton}</DialogTrigger>
                <DialogContent className="sm:max-w-[850px]">
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        <DialogDescription>{description}</DialogDescription>
                    </DialogHeader>
                    {children}

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline" className="w-full">
                                Annuler
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>{openButton}</DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>{title}</DrawerTitle>
                    <DrawerDescription>{description}</DrawerDescription>
                </DrawerHeader>
                {/*<ProfileForm className="px-4" />*/}
                {children}
                {footer && (
                    <DrawerFooter className="pt-2">
                        <DrawerClose asChild>
                            <Button variant="outline">Annuler</Button>
                        </DrawerClose>
                    </DrawerFooter>
                )}
            </DrawerContent>
        </Drawer>
    )
}