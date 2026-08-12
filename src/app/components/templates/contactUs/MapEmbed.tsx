export default function MapEmbed() {
  return (
    <div className="w-full h-full min-h-[340px] rounded-2xl overflow-hidden shadow-md border border-gray-100">
      <iframe
        title="موقعیت مکانی رستمکلا"
        src="https://www.google.com/maps?q=رستمکلا،+بهشهر،+مازندران،+ایران&output=embed"
        width="100%"
        height="100%"
        style={{ border: 0, minHeight: "340px" }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
}
