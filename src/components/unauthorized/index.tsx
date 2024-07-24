import React from "react"
import Link from "next/link";

type Props = {}

const Unauthorized = (props: Props) => {
    return (
        <div className="h-screen w-screen flex flex-col items-center justify-center p-4 text-center">
            <h1 className="text-3xl md:text-6xl">
                Unauthorized access!
            </h1>
            <p>
                Please contact support or agency owner to get access
            </p>
            <Link href="/" className="mt-4 bg-primary p-2">
                Back to Home
            </Link>
        </div>
    )
}

export default Unauthorized