export default function Avatar({
  name,
  size = "md",
}: {
  name: string;
  size?: "sm" | "md";
}) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);
  const sz =
    size === "sm" ? "w-9 h-9 text-xs" : "w-10 h-10 sm:w-11 sm:h-11 text-sm";
  return (
    <div
      className={`${sz} rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center flex-shrink-0 text-white font-bold select-none shadow-sm`}
    >
      {initials}
    </div>
  );
}
