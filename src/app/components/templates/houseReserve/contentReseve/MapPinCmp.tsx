import { MapPin } from "lucide-react";

export default function MapPinCmp({
  active,
  onClick,
}: {
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        absolute
        w-8
        h-8
        -translate-x-1/2
        -translate-y-1/2
        flex
        items-center
        justify-center
        rounded-full
        border-2
        shadow-md
        transition-all

        ${
          active
            ? "bg-blue-600 border-white scale-125 z-20"
            : "bg-white border-blue-500 hover:scale-110 z-10"
        }
      `}
    >
      <MapPin size={14} className={active ? "text-white" : "text-blue-600"} />
    </button>
  );
}
