/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { Portal } from "./Portal";

type ImageProps = {
  imageUrl: string;
  width?: string;
  height?: string;
  className?: string;
};

export default function ImageView({
  imageUrl,
  height,
  width,
  className,
}: ImageProps) {
  const [openImage, setOpenImage] = useState(false);

  const toggleOpenImage = () => {
    setOpenImage((prev) => !prev);
  };

  return (
    <>
      <img
        src={imageUrl}
        alt="Image"
        style={{ width, height }}
        className={`transition-transform duration-300 hover:scale-103 cursor-pointer ${
          className ?? ""
        }`}
        draggable={false}
        onClick={toggleOpenImage}
      />

      {openImage && (
        <Portal>
          <div
            className="fixed z-50 top-0 left-0 bg-black/60 w-screen h-screen flex items-center justify-center backdrop-blur-lg"
            onClick={toggleOpenImage}
          >
            <img
              src={imageUrl}
              alt="Image"
              className="object-cover max-h-10/12 max-w-10/12 rounded-xl"
              draggable={false}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </Portal>
      )}
    </>
  );
}
