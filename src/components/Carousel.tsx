"use client";

import { RiArrowDropLeftLine, RiArrowDropRightLine } from "@remixicon/react";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";

type CarouselProps = {
  images: string[];
};

type ArrowProps = {
  onClick?: VoidFunction;
  nextArrow?: boolean;
};

function Arrow({ onClick, nextArrow }: ArrowProps) {
  return (
    <button
      onClick={onClick}
      className={`
        absolute bottom-1/2 translate-y-1/2 bg-brand-700/20 text-white w-9 h-9 rounded-full z-10 items-center   justify-center cursor-pointer hidden sm:flex ${
          nextArrow ? "right-3" : "left-3"
        }
      `}
    >
      {nextArrow ? (
        <RiArrowDropRightLine size={36} />
      ) : (
        <RiArrowDropLeftLine size={36} />
      )}
    </button>
  );
}

export default function Carousel({ images }: CarouselProps) {
  const settings = {
    dots: true,
    dotsClass: "slick-custom",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <Arrow />,
    nextArrow: <Arrow nextArrow />,
  };

  return (
    <>
      {images.length === 1 ? (
        <div className="aspect-video w-full">
          <Image
            src={images[0]}
            width={600}
            height={320}
            draggable={false}
            quality={100}
            alt="Image"
            className="w-full h-full object-cover rounded-lg animation-blur"
          />
        </div>
      ) : (
        <Slider {...settings} className="animation-blur">
          {images.map((image, index) => (
            <div key={index} className="aspect-video w-full outline-none">
              <Image
                src={image}
                width={600}
                height={320}
                quality={100}
                alt="Slide"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          ))}
        </Slider>
      )}
    </>
  );
}
