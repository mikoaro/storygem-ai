"use client"

import { createContext, useContext, useState } from "react";

const VideoDataContext = createContext();

export const VideoDataContextProvider = ({ children }) => {
    const [videoData, setVideoData] = useState({});
  
    return (
      <VideoDataContext.Provider value={{ videoData, setVideoData }}>
        {children}
      </VideoDataContext.Provider>
    );
};

export const useVideoData = () => useContext(VideoDataContext);