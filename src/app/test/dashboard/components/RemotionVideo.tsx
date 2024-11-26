import React from "react";
import {
  AbsoluteFill,
  Img,
  Sequence,
  useVideoConfig,
  Audio,
  useCurrentFrame,
  interpolate,
} from "remotion";

const RemotionVideo = ({
  videoScript,
  audioFileUrl,
  imageList,
  captions,
  setDurationInFrame,
}) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  const GetDurationFrame = () => {
    setDurationInFrame(
      (captions.words[captions.words?.length - 1]?.end / 1000) * fps
    );
    return (captions.words[captions.words?.length - 1]?.end / 1000) * fps;
  };

  const GetCurrentCaption = () => {
    const currentTime = (frame / 30) * 1000; // Convert frame number to milliseconds ( fps = 30 )
    const currentCaption = captions.words.find(
      (word) => currentTime >= word.start && currentTime <= word.end
    );
    return currentCaption ? currentCaption?.text : "";
  };

  return (
    <AbsoluteFill className="bg-black">
      {imageList?.map((item, index) => {
        const startTime = (index * GetDurationFrame()) / imageList?.length;
        const duration = GetDurationFrame();
        const scale = (index) =>
          interpolate(
            frame,
            [startTime, startTime + duration / 2, startTime + duration],
            index % 2 == 0 ? [1, 1.8, 1] : [1.8, 1, 1.8],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          ); // Zoom In and Zoom Out Effect

        return (
          <>
            <Sequence
              key={index}
              from={startTime}
              durationInFrames={GetDurationFrame()}
            >
              <AbsoluteFill className="justify-center items-center">
                <Img
                  src={item}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transform: `scale(${scale(scale)})`,
                  }}
                />
                {/* <AbsoluteFill styel={{
                  color: 'white',
                  justifyContent: 'center',
                  top: undefined,
                  bottom: 50,
                  height: 150,
                  textAlign: 'center',
                  width: '100%'
                }}> */}
                <AbsoluteFill>
                  <h2 className="text-white absolute inset-x-28 bottom-20 items-center h-[50px] text-2xl">
                    {/* <h2 className="text-2xl"> */}
                    {GetCurrentCaption()}
                  </h2>
                </AbsoluteFill>
              </AbsoluteFill>
            </Sequence>
          </>
        );
      })}
      <Audio src={`${audioFileUrl}`} />
    </AbsoluteFill>
  );
};

export default RemotionVideo;
