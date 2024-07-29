"use client"
import React from "react"
import {AgencySidebarOption, SubAccount, User} from "@prisma/client";
import {useModal} from "@/providers/modal-provider";
import {Button} from "@/components/ui/button";
import {twMerge} from "tailwind-merge";
import CustomModal from "@/components/global/custom-modal";
import SubAccountDetails from "@/components/forms/subaccount-details";
import {PlusCircleIcon} from "lucide-react";

type Props = {
    user: User & {
        Agency: | (| Agency | (null & {
            SubAccount: SubAccount[]
            SideBarOption: AgencySidebarOption[]
        }))
            | null
    }
    id: string
    className: string
}

const CreateSubAccountButton = ({user, id, className}: Props) => {
    const {setOpen} = useModal()
    const agencyDetails = user.Agency
    if (!agencyDetails) return null
    return (
        <Button className={twMerge('w-full flex gap-4', className)} onClick={() => {
            setOpen(
                <CustomModal title="Create a Subaccount" subheading="You can switch between you account">
                    <SubAccountDetails agencyDetails={agencyDetails} userId={user.id} userName={user.name}/>
                </CustomModal>
            )
        }}>
            <PlusCircleIcon size={15}/>
            Create Sub Account
        </Button>
    )
}

export default CreateSubAccountButton