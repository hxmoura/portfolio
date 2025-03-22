import { RiLoader5Fill } from "@remixicon/react";

export default function Loading() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <RiLoader5Fill size={56} className="animate-spin" />
    </div>
  );
}
