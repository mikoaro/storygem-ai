"use client"

import Image from "next/image";
import React, { useState } from "react";

const styleOptions = [
  {
    name: "Guided by The Stars",
    image: "/guidedbythestars.png",
  },
  {
    name: "Seeking Divine Guidance",
    image: "/seekingdivineguidance.png",
  },
  {
    name: "Sorcerer's Companion",
    image: "/sorcererscompanion.png",
  },
  {
    name: "Zen Garden",
    image: "/zengarden.png",
  },
  {
    name: "Path of Honor",
    image: "/pathofhonor.png",
  },
  {
    name: "Space Marine",
    image: "/spacemarine.png",
  },
  {
    name: "Egyptian Pharaoh",
    image: "/egyptianpharaoh.png",
  },
];



const SelectStyle = ({onUserSelect}) => {
  const [selectedOption, setSelectedOption] = useState()

  return (
    <div className="mt-7">
      <h2 className="font-bold text-xl text-primary">Style</h2>
      <p className="text-gray-500">Select your video style</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-5 mt-3">
        {styleOptions.map((item, index) => (
          <div key={index} className={`relative hover:scale-105 transition-all cursor-pointer rounded-xl
            ${selectedOption==item.name && 'border-4 border-primary'}
          `}>
            <Image
              src={item.image}
              width={100}
              height={100}
              alt={"option style"}
              className="h-48 object-cover rounded-lg w-full"
              onClick={() => {
                setSelectedOption(item.name)
                onUserSelect('imageStyle', item.name)
              }}
            />
            <h2 className="absolute p-1 bg-black bottom-0 w-full text-white text-center rounded-b-lg">{item.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectStyle;