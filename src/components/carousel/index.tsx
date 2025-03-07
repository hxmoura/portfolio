"use client";

import { RiArrowDropLeftLine, RiArrowDropRightLine } from "@remixicon/react";
import Image from "next/image";
import { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";

type CarouselProps = {
  images: string[];
};

export default function Carousel({ images }: CarouselProps) {
  const dotsRef = useRef<HTMLUListElement>(null);
  const enableScrolling = images.length >= 5;

  const settings = {
    dots: true,
    dotsClass: "slick-custom",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    beforeChange: (_: number, activeIndex: number) => {
      scrollToActiveDot(activeIndex);
    },
    customPaging: function (i: number) {
      return (
        <Image
          src={images[i]}
          width={0}
          height={0}
          unoptimized
          alt="Preview image"
          draggable={false}
          className="min-w-24 h-16 sm:min-w-32 sm:h-20 cursor-pointer object-cover rounded-lg"
        />
      );
    },
    appendDots: (dots: number) => (
      <div className="relative w-full">
        {enableScrolling && (
          <button
            className="absolute left-0 bottom-0 -translate-y-1/2 bg-brand-50/70 dark:bg-brand-700/70 text-brand-700 dark:text-white w-9 h-9 rounded-full z-10 items-center justify-center cursor-pointer hidden sm:flex"
            onClick={() => handleScroll(-400)}
          >
            <RiArrowDropLeftLine size={36} />
          </button>
        )}

        <ul
          className={`flex gap-3 overflow-x-scroll mt-3 disable-scroll scroll-smooth animation-blur
            ${!enableScrolling && "justify-center"}
          `}
          ref={dotsRef}
        >
          {dots}
        </ul>

        {enableScrolling && (
          <button
            className="absolute right-0 bottom-0 -translate-y-1/2 w-9 h-9 bg-brand-50/70 dark:bg-brand-700/70 text-brand-700 dark:text-white rounded-full z-10 items-center justify-center cursor-pointer hidden sm:flex"
            onClick={() => handleScroll(400)}
          >
            <RiArrowDropRightLine size={36} />
          </button>
        )}
      </div>
    ),
  };

  function scrollToActiveDot(index: number) {
    if (dotsRef.current) {
      const dots = dotsRef.current.children;
      const activeDot = dots[index] as HTMLElement;

      handleScroll(
        activeDot.offsetLeft -
          dotsRef.current.offsetWidth / 2 +
          activeDot.offsetWidth / 2
      );
    }
  }

  function handleScroll(value: number) {
    if (dotsRef.current) {
      dotsRef.current.scrollLeft = value;
    }
  }

  return (
    <Slider {...settings} className="animation-blur">
      {images.map((image) => (
        <div key={image} className="aspect-video w-full outline-none">
          <Image
            src={image}
            width={0}
            height={0}
            unoptimized
            alt="Slide"
            className="w-full h-full object-cover cursor-grab rounded-lg"
          />
        </div>
      ))}
    </Slider>
  );
}
