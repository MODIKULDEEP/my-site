import {Button} from '@/components/ui/button'
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from '@/components/ui/card'
import {db} from '@/lib/db'
import Image from 'next/image'
import React from 'react'

type Props = {
    searchParams: {
        state: string
        code: string
    }
    params: { subaccountId: string }
}

const LaunchPad = async ({params, searchParams}: Props) => {
    const subaccountDetails = await db.subAccount.findUnique({
        where: {
            id: params.subaccountId,
        },
    })

    if (!subaccountDetails) {
        return
    }

    const allDetailsExist =
        subaccountDetails.address &&
        subaccountDetails.subAccountLogo &&
        subaccountDetails.city &&
        subaccountDetails.companyEmail &&
        subaccountDetails.companyPhone &&
        subaccountDetails.country &&
        subaccountDetails.name &&
        subaccountDetails.state

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="w-full h-full max-w-[800px]">
                <Card className="border-none ">
                    <CardHeader>
                        <CardTitle>Lets get started!</CardTitle>
                        <CardDescription>
                            Follow the steps below to get your account setup correctly.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4">
                        <div className="flex justify-between items-center w-full h-20 border p-4 rounded-lg ">
                            <div className="flex items-center gap-4">
                                <Image
                                    src="/appstore.png"
                                    alt="App logo"
                                    height={80}
                                    width={80}
                                    className="rounded-md object-contain"
                                />
                                <p>Save the website as a shortcut on your mobile devide</p>
                            </div>
                            <Button>Start</Button>
                        </div>
                        <div className="flex justify-between items-center w-full h-20 border p-4 rounded-lg">
                            <div className="flex items-center gap-4">
                                <Image
                                    src="/stripelogo.png"
                                    alt="App logo"
                                    height={80}
                                    width={80}
                                    className="rounded-md object-contain "
                                />
                                <p>
                                    Connect your stripe account to accept payments. Stripe is
                                    used to run payouts.
                                </p>
                            </div>
                            <Button>Start</Button>
                        </div>
                        <div className="flex justify-between items-center w-full h-20 border p-4 rounded-lg">
                            <div className="flex items-center gap-4">
                                <Image
                                    src={subaccountDetails.subAccountLogo}
                                    alt="App logo"
                                    height={80}
                                    width={80}
                                    className="rounded-md object-contain p-4"
                                />
                                <p>Fill in all your business details.</p>
                            </div>
                            <Button>Start</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default LaunchPad
