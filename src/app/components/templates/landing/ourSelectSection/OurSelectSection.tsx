import Image from "next/image";
import { features } from "./constants";
export default function OurSelectSection() {
  return (
    <section className="w-full py-20">
      <div className="mx-auto">
        <div className="relative grid grid-cols-1 lg:grid-cols-[600px_1fr] gap-0 overflow-hidden rounded-[32px]">
          {/* Right */}
          <div className="relative min-h-[664px]">
            <Image
              src="/images/selectPng.png"
              alt="زوج در خانه"
              fill
              className="object-cover"
              sizes="50vw"
            />
          </div>
          {/* Left */}
          <div className="bg-[#EDEDED] px-10 py-12">
            <h2 className="text-[36px] font-bold text-center text-black mb-4">
              چرا باید ما را انتخاب کنید
            </h2>

            <p className="text-center text-[#8B8D98] text-sm leading-7 mb-10">
              تیم باتجربه ما در زمینه املاک و مستغلات با سالها بازار موفق سرآمد
              است ثانوی، ارائه تصمیمات آگاهانه و نتایج بهینه.
            </p>

            <div className="flex flex-col gap-4">
              {features.map((item) => (
                <div
                  key={item.id}
                  className="
                    overflow-hidden
                    relative
                    bg-white
                    rounded-2xl
                    px-8
                    py-5
                    shadow-sm
                  "
                >
                  {/* Blue Line */}
                  <span className="absolute left-0 top-0 h-full w-[4px] bg-primary500 rounded-l-2xl" />

                  <h4 className="text-center font-bold text-[18px] mb-2">
                    {item.title}
                  </h4>

                  <p className="text-center text-[#8B8D98] text-sm leading-6">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
