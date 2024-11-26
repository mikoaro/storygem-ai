import Header from "./components/Header";
import React, { useEffect, useState } from "react";
import SideNav from "./components/SideNav";

import { useUser } from "@clerk/nextjs";
import { db } from "@/configs/test/db";
import { Users } from "@/configs/test/schema";
import { eq } from "drizzle-orm";

const DashboardLayout = ({ children }: never) => {
  return (
    <div>
      {/* <div className="hidden md:block h-screen bg-white fixed mt-[65px] w-64">
        <SideNav />
      </div> */}
      <div>
        <Header />
        <div className="md:ml-64 p-10">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
