"use client"
import React from "react"
import {useModal} from "@/providers/modal-provider";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog";

type Props = {
    children: React.ReactNode
    title: string
    subheading: string
    defaultOpen?: boolean
}

const CustomModal = ({children, title, subheading, defaultOpen}: Props) => {
    const {isOpen, setClose} = useModal()
    return (
        <Dialog open={isOpen || defaultOpen} onOpenChange={setClose}>
            <DialogContent className="overflow-scroll md:max-h-[700px] md:h-fit h-screen bg-card">
                <DialogHeader className="pt-8 text-left">
                    <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
                    <DialogDescription>{subheading}</DialogDescription>
                    {children}
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default CustomModal