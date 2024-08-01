"use client"
import {Agency, Contact, Plan, User} from "@prisma/client"
import {createContext, useContext, useEffect, useState} from "react";
import {PricesList, TicketDetails} from "@/lib/types";

interface ModalProviderProps {
    children: React.ReactNode
}

export type ModalData = {
    user?: User;
    agency?: Agency;
    ticket?: TicketDetails[0];
    contact?: Contact;
    plans?: {
        defaultPriceId: Plan,
        plans: PricesList['data']
    }
}

type ModalContextType = {
    data: ModalData;
    isOpen: boolean;
    setOpen: (modal: React.ReactNode, fetchData?: () => Promise<any>) => void;
    setClose: () => void;
}

export const ModalContext = createContext<ModalContextType>({
    data: {},
    isOpen: false,
    setOpen: (modal: React.ReactNode, fetchData?: () => Promise<any>) => {
    },
    setClose: () => {
    }
});

const ModalProvider: React.FC<ModalProviderProps> = ({children}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState<ModalData>({});
    const [showingModal, setShowingModal] = useState<React.ReactNode>(null);
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true)
    }, []);
    const setOpen = async (modal: React.ReactNode, fetchData?: () => Promise<any>) => {
        if (modal) {
            if (fetchData) {
                setData({...data, ...(await fetchData())} || {});
            }
            setShowingModal(modal);
            setIsOpen(true)
        }
    }

    const setClose = () => {
        setIsOpen(false);
        setData({})
    }
    if (!isMounted) return null

    return (
        <ModalContext.Provider value={{data, setOpen, setClose, isOpen}}>
            {children}
            {showingModal}
        </ModalContext.Provider>
    )
}

export const useModal = () => {
    const conntext = useContext(ModalContext);
    if (!conntext) {
        throw new Error("useModal must be used within a Provider")
    }
    return conntext
}

export default ModalProvider