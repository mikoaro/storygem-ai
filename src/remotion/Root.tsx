import React from "react";
import { Composition } from "remotion";
import { MyComposition } from "./Composition";
import RemotionVideo from "@/app/test/dashboard/components/RemotionVideo";

const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="Empty"
        component={RemotionVideo}
        durationInFrames={60}
        fps={30}
        width={1280}
        height={720}
      />
    </>
  );
};

export default RemotionRoot;
