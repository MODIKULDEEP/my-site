"use client"
import React from "react"
import {useRouter} from "next/navigation";
import {deleteSubAccount, getSubaccountDetails, saveActivityLogNotification} from "@/lib/queries";

type Props = {
    subaccountId: string
}

const DeleteButton = ({subaccountId}: Props) => {
    const router = useRouter()

    return (
        <div onClick={async () => {
            const repsonse = await getSubaccountDetails(subaccountId)
            await saveActivityLogNotification({
                agencyId: undefined,
                description: `Deleted a subaccount | ${response?.name}`,
                subAccountId: subaccountId
            })
            await deleteSubAccount(subaccountId)
            router.refresh()
        }}>
            Delete Sub Account
        </div>
    )
}

export default DeleteButton