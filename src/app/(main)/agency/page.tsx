import { currentUser } from "@clerk/nextjs/server";
import React from "react";

const Page = async() => {
  const authUser = await currentUser()
  return <div>Agency Dashboard</div>;
};

export default Page;
