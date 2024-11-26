"use client";

import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import EmptyState from "./components/EmptyState";
import { Users, VideoData } from "@/configs/test/schema";
import { db } from "@/configs/test/db";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import VideoList from "./components/VideoList";
import { useUserDetail } from "@/app/context/UserDetailContext";
import { VideoDataContextProvider } from "@/app/context/VideoDataContext";

const Dashboard = () => {
  const [videoList, setVideoList] = useState([]);
  // const [userDetail, setUserDetail] = useState([]);
  const { userDetail, setUserDetail } = useUserDetail();

  const { user } = useUser();

  useEffect(() => {
    user && GetUserDetail();
  }, [user]);

  const GetUserDetail = async () => {
    const result = await db
      .select()
      .from(Users)
      .where(eq(Users.email, "mikoarodeveloper@gmail.com"));
      // .where(eq(Users.email, user?.primaryEmailAddress?.emailAddress));

    setUserDetail(result[0]);
  };

  useEffect(() => {
    user && GetVideoList();
  }, [user]);

  // Get all videos by a user
  const GetVideoList = async () => {
    const result = await db
      .select()
      .from(VideoData)
      .where(eq(VideoData?.createdBy, user?.primaryEmailAddress?.emailAddress));

    console.log(result);
    setVideoList(result);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-2xl text-primary">My Videos</h2>
        <Button asChild>
          <Link href={"/test/dashboard/new"}>
            <PlusCircle className="mr-2 size-4" />
            Create Video
          </Link>
        </Button>
      </div>

      {/* Empty State */}
      {videoList?.length == 0 && <EmptyState />}

      {/* List of videos */}
      <VideoList videos={videoList} />
    </div>
  );
};

export default Dashboard;
