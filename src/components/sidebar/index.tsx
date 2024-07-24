import React from "react"
import {getAuthUserDetails} from "@/lib/queries";
import MenuOption from "@/components/sidebar/menu-options";

type Props = {
    id: string
    type: "agency" | "subaccount"
}

const Sidebar = async ({id, type}: Props) => {
    const user = await getAuthUserDetails()
    if (!user) return null;
    if (!user.Agency) return

    const details = type === "agency" ? user?.Agency : user?.Agency.SubAccount.find((subaccount) => subaccount.id === id)
    const isWhiteLAbledAgency = user.Agency.whiteLabel
    if (!details) return

    let sideBarLogo = user.Agency.agencyLogo || 'assets/my-site-logo.svg'

    if (!isWhiteLAbledAgency) {
        if (type === "subaccount") {
            sideBarLogo = user?.Agency.SubAccount.find((subaccount) => subaccount.id === id)?.subAccountLogo || user.Agency.agencyLogo
        }
    }

    const sidebarOpt = type === "agency" ? user.Agency.SidebarOption || [] : user?.Agency.SubAccount.find((subaccount) => subaccount.id === id)?.sidebarOption || []
    const subaccounts = user.Agency.SubAccount.find((subaccount) => user.Permissions.find((permission) => permission.subAccountId === subaccount.id && permission.access))

    return (
        <>
            <MenuOption details={details} id={id} sidebarOpt={sidebarOpt} sidebarLogo={sideBarLogo} user={user}
                        subAccounts={subaccounts} defaultOpen={true}/>
            <MenuOption details={details} id={id} sidebarOpt={sidebarOpt} sidebarLogo={sideBarLogo} user={user}
                        subAccounts={subaccounts}/>
        </>
    )
}
export default Sidebar