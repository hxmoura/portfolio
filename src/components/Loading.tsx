import { Icon } from "@iconify/react";

export default function Loading() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Icon
        icon="ri:loader-5-fill"
        width={56}
        height={56}
        className="animate-spin"
      />
    </div>
  );
}
