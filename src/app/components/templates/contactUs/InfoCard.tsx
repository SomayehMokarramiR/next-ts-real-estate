export default function InfoCard({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3.5 bg-white hover:border-primary500/30 hover:shadow-sm transition-all shadow-[0_2px_8px_rgba(72,72,72,0.16)]">
      <div className="w-9 h-9 rounded-lg bg-[#eef1fb] flex items-center justify-center flex-shrink-0">
        <span className="text-primary500">{icon}</span>
      </div>
      <div className="flex-1 min-w-0 text-sm text-gray-700 leading-relaxed break-all">
        {children}
      </div>
    </div>
  );
}
