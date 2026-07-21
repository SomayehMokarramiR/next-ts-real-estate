/* ─── Avatar ──────────────────────────────────────────── */
export default function Avatar({
  name,
  size = "md",
}: {
  name: string;
  size?: "sm" | "md";
}) {
  const colors = [
    "bg-[#1e40af]",
    "bg-emerald-500",
    "bg-violet-500",
    "bg-rose-500",
    "bg-amber-500",
  ];
  const color = colors[name.charCodeAt(0) % colors.length];
  const sz = size === "sm" ? "w-7 h-7 text-xs" : "w-9 h-9 text-sm";
  return (
    <div
      className={`${sz} ${color} rounded-full flex items-center justify-center text-white font-bold flex-shrink-0`}
    >
      {name[0]}
    </div>
  );
}
