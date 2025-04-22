"use client";

import { RiAddCircleFill } from "@remixicon/react";
import Image from "next/image";
import Link from "next/link";

type ProjectProps = {
  title: string;
  description: string;
  image: string;
  redirectUrl: string;
  onClick?: VoidFunction;
};

export default function Project({
  title,
  description,
  image,
  redirectUrl,
  onClick,
}: ProjectProps) {
  return (
    <Link
      href={redirectUrl}
      onClick={onClick}
      className="relative group overflow-hidden rounded-lg animation-blur"
    >
      <div className="absolute inset-0 flex justify-center items-center flex-col gap-3 opacity-0 sm:group-hover:opacity-100 transition-all duration-300 z-40">
        <RiAddCircleFill size={80} className="text-white" />
        <p className="text-white">Clique para saber mais</p>
      </div>

      <div className="absolute bottom-6 left-6 z-40 space-y-1 opacity-100 sm:group-hover:opacity-0 transition-all duration-300">
        <strong className="font-semibold text-white">{title}</strong>
        <p className="text-white">{description}</p>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent from-50% to-black/70 sm:group-hover:bg-black/50 sm:group-hover:backdrop-blur-xs z-30 transition-all duration-300" />

      <Image
        src={image}
        alt={`${title} - ${description}`}
        width={1000}
        height={700}
        className="w-full h-auto max-h-[320px] object-cover sm:group-hover:scale-110 transition-all duration-300"
      />
    </Link>
  );
}
