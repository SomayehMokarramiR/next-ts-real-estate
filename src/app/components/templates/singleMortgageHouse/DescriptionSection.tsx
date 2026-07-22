import { descText } from "./constants";

export default function DescriptionSection() {
  return (
    <article className="space-y-5">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
        چرا هتل همایون رو انتخاب کنیم؟
      </h2>

      <p className="text-gray-600 dark:text-[#CDCED6] leading-8 text-sm sm:text-base">
        {descText}
      </p>

      <div className="rounded-2xl overflow-hidden w-full aspect-[16/7]">
        <img
          src="https://images.unsplash.com/photo-1522679056866-8dbbc8774a9d"
          alt="فانوس دریایی"
          className="w-full h-full object-cover"
        />
      </div>

      <p className="text-gray-600 dark:text-[#CDCED6]  leading-8 text-sm sm:text-base">
        {descText}
      </p>
    </article>
  );
}
