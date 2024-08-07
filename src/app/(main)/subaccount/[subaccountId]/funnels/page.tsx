import {getFunnels} from '@/lib/queries'
import React from 'react'
import FunnelsDataTable from './data-table'
import {Plus} from 'lucide-react'
import {columns} from './columns'
import FunnelForm from '@/components/forms/funnel-form'

const Funnels = async ({params}: { params: { subaccountId: string } }) => {
    const funnels = await getFunnels(params.subaccountId)
    if (!funnels) return null

    return (
        <FunnelsDataTable
            actionButtonText={
                <>
                    <Plus size={15}/>
                    Create Funnel
                </>
            }
            modalChildren={
                <FunnelForm subAccountId={params.subaccountId}></FunnelForm>
            }
            filterValue="name"
            columns={columns}
            data={funnels}
        />
    )
}

export default Funnels
