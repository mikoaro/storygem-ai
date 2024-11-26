"use client";

import React, { useContext, useEffect, useState } from "react";
import SelectTopic from "./components/SelectTopic";
import SelectStyle from "./components/SelectStyle";
import SelectDuration from "./components/SelectDuration";
import { Button } from "@/components/ui/button";
import axios from "axios";
import CustomLoading from "./components/CustomLoading";
import { v4 as uuidv4 } from "uuid";
import { useVideoData } from "@/app/context/VideoDataContext";
import { db } from "@/configs/test/db";
import { useUser } from "@clerk/nextjs";
import { VideoData } from "@/configs/test/schema";
import PlayerDialog from "../components/PlayerDialog";
import { useRouter } from "next/router";

const NewVideoRoute = () => {
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [videoScript, setVideoScript] = useState();
  const [audioFileUrl, setAudioFileUrl] = useState("");
  const [captions, setCaptions] = useState();
  const [imageList, setImageList] = useState([]);
  const [playVideo, setPlayVideo] = useState(false);
  const [videoId, setVideoId] = useState();
  const { videoData, setVideoData } = useVideoData(); // ?? {};
  const { user } = useUser();

  console.log("in new page tsx");
  // console.log("videoData");
  // console.log(videoData);
  // console.log("user");
  // console.log(user);

  const onHandleInputChange = (fieldName: never, fieldValue: never) => {
    console.log(fieldName, fieldValue);

    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  const onCreateClickHandler = () => {
    GetVideoScript();
    // GenerateAudioFile(scriptData)
    // GenerateAudioCaption(assemblyAiFileUrl);
    // GenerateImage()
  };

  // Get Video Script
  const GetVideoScript = async () => {
    setLoading(true);

    try {
      const prompt =
        "Write a script to generate " +
        formData.duration +
        " video on topic: " +
        formData.topic +
        " along with AI image prompt in " +
        formData.imageStyle +
        " format for each scene and give me result in JSON format with imagePrompt and contentText as field, No plain text";

      console.log("prompt+++++++++++");
      console.log(prompt);

      const response = await axios.post("/api/test/get-video-script", {
        prompt: prompt,
      });

      // console.log("Received response: ---")
      // console.log(response.data)

      if (response.data) {
        // console.log(response.data.result);
        setVideoData((prevState) => ({
          ...prevState,
          videoScript: response.data,
        }));
        setVideoScript(response.data);
        await GenerateAudioFile(response.data);
      }
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }

    // .then((resp) => {
    //   console.log(resp.data.result);
    //   setVideoScript(resp.data.result);
    //   GenerateAudioFile(resp.data.result);
    // });
    // const resp = await res.data
    // console.log(resp)

    setLoading(false);
  };

  // Generate Audio File and Save to PINATA
  const GenerateAudioFile = async (videoScriptData) => {
    console.log("videoScriptData: ---");
    console.log(videoScriptData);
    setLoading(true);
    let script = "";
    const id = uuidv4();

    const arrVideoScriptData = Array.from(JSON.parse(videoScriptData)).slice(
      0,
      1
    );

    console.log("arrVideoScriptData: ---");
    console.log(arrVideoScriptData);

    arrVideoScriptData.forEach((item) => {
      // console.log(item.contentText)
      script = script + item.contentText + " ";
    });

    // console.log(script);

    try {
      const response = await axios.post("/api/test/generate-audio", {
        text: script,
        id: id,
      });
      console.log(response.data);

      setVideoData((prevState) => ({
        ...prevState,
        audioFileUrl: response.data.result,
      }));

      setAudioFileUrl(response.data.result);

      response.data.result &&
        GenerateAudioCaption(response.data.result, arrVideoScriptData);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  // Generate caption from Audio file
  const GenerateAudioCaption = async (fileUrl, videoScriptData) => {
    setLoading(true);

    try {
      const response = await axios.post("/api/test/generate-caption", {
        audioFileUrl: fileUrl,
      });

      console.log(response.data.result);
      setCaptions(response.data.result);

      setVideoData((prevState) => ({
        ...prevState,
        captions: response.data.result,
      }));

      response.data.result && GenerateImage(videoScriptData);
    } catch (error) {
      console.error(error);
    }

    console.log(videoScript, captions, audioFileUrl);

    setLoading(false);
  };

  // Generate AI Images
  const GenerateImage = async (videoScriptData) => {
    setLoading(true);
    const images = [];
    //console.log("--", videoScriptData)

    for (const element of videoScriptData) {
      try {
        const response = await axios.post("/api/test/generate-image", {
          prompt: element?.imagePrompt,
        });
        console.log(response.data.result);
        images.push(response.data.result);
      } catch (error) {
        console.error("Error: ", error);
      }
    }

    setVideoData((prevState) => ({
      ...prevState,
      imageList: images,
    }));

    setImageList(images);
    // setLoading(false);
  };

  useEffect(() => {
    console.log("videoData-0");
    console.log(videoData);

    // 4 = console.log(images, videoScript, audioFileUrl, captions) are there, not an array but an object
    if (Object.keys(videoData).length == 4) {
      SaveVideoData(videoData);
    }
  }, [videoData]);

  const SaveVideoData = async (videoData) => {
    setLoading(true);

    const result = await db
      .insert(VideoData)
      .values({
        videoScript: videoData?.videoScript,
        audioFileUrl: videoData?.audioFileUrl,
        captions: videoData?.captions,
        imageList: videoData?.imageList,
        createdBy: "mikoarodeveloper@gmail.com", //user?.primaryEmailAddress?.emailAddress,
      })
      .returning({ id: VideoData?.id });

    setVideoId(result[0].id);
    setPlayVideo(true);
    console.log(result);
    setLoading(false);
    setVideoData({});
    setImageList([]);
  };

  return (
    <div className="md:px-20">
      <h2 className="font-bold text-4xl text-primary text-center">New Story</h2>

      <div className="mt-10 shadow-md p-10">
        {/* Select Topic */}
        <SelectTopic onUserSelect={onHandleInputChange} />

        {/* Select Style */}
        <SelectStyle onUserSelect={onHandleInputChange} />

        {/* Duration */}
        <SelectDuration onUserSelect={onHandleInputChange} />

        {/* Create Button */}
        <Button className="mt-10 w-full" onClick={onCreateClickHandler}>
          Create Short Video
        </Button>
      </div>

      <CustomLoading loading={loading} />

      <PlayerDialog playVideo={playVideo} videoId={videoId} />
    </div>
  );
};

export default NewVideoRoute;
