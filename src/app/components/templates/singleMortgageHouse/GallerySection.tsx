export default function GallerySection() {
  return (
    <section className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 overflow-hidden rounded-3xl">
        {/* عکس بزرگ */}
        <div className="h-[500px]">
          <img
            src="/images/galary1.png"
            alt="gallery"
            className="w-full h-full object-cover rounded-3xl"
          />
        </div>

        {/* چهار عکس کوچک */}
        <div className="grid grid-cols-2 grid-rows-2 gap-4 h-[500px]">
          <div>
            <img
              src="/images/galary2.png"
              alt="gallery"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>

          <div>
            <img
              src="/images/galary3.png"
              alt="gallery"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>

          <div>
            <img
              src="/images/galary4.png"
              alt="gallery"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>

          <div className="relative overflow-hidden rounded-2xl">
            <img
              src="/images/galary5.png"
              alt="gallery"
              className="w-full h-full object-cover"
            />

            {/* overlay شفاف */}
            <div className="absolute inset-0 bg-black/40" />

            {/* button */}
            <button
              className="
      absolute 
      top-1/2 left-1/2 
      -translate-x-1/2 -translate-y-1/2
      px-5 py-3
      rounded-full
      bg-white
      text-gray-900
      font-semibold
      text-sm
      shadow-md
      hover:bg-gray-100
      transition
    "
            >
              مشاهده بیشتر +5
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
