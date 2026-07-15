import { FaInstagram, FaLinkedinIn, FaTelegramPlane } from "react-icons/fa";
import Logo from "../../modules/logo/Logo";

export default function App() {
  return (
    <footer
      className="w-full bg-[#f2f4f7] border-t border-gray-200 rounded-3xl"
      dir="rtl"
    >
      <div
        className="
          mx-auto
          px-4
          lg:px-[68.5px]
          py-12
        "
      >
        {/* Main Footer */}
        <div
          className="
            flex
            flex-col
            gap-y-16
            md:gap-y-8
            lg:flex-row
            lg:items-start
            lg:gap-x-[141px]
            lg:gap-y-0
          "
        >
          {/* Logo Section */}
          <div
            className="
              w-full
              lg:w-[501px]
              flex
              flex-col
              items-start
              gap-4
            "
          >
            <Logo />

            <p
              className="
                text-gray-500
                text-xs
                leading-6
                max-w-[450px]
                text-right
              "
            >
              ما همراه شما هستیم در مسیر اجاره، خرید و فروش ویلا؛ تا با اطمینان
              و آرامش، تجربه‌ای دلنشین از انتخاب اقامتگاه یا سرمایه‌گذاری
              یادماندنی داشته باشید.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-2">
              <a
                href="#"
                className="text-gray-500 hover:text-blue-600 transition"
              >
                <FaTelegramPlane size={20} />
              </a>

              <a
                href="#"
                className="text-gray-500 hover:text-pink-500 transition"
              >
                <FaInstagram size={20} />
              </a>

              <a
                href="#"
                className="text-gray-500 hover:text-blue-400 transition"
              >
                <FaLinkedinIn size={20} />
              </a>
            </div>
          </div>

          {/* Links Section */}
          <div
            className="
              w-full
              lg:w-[602px]
              grid
              grid-cols-1
              sm:grid-cols-3
              gap-8
            "
          >
            {/* رزرو */}
            <div>
              <h4 className="text-primary500 font-bold text-sm mb-5">
                نحوه رزرو اقامتگاه
              </h4>

              <ul className="flex flex-col gap-3">
                {[
                  "راهنمای رزرو اقامتگاه",
                  "شیوه پرداخت",
                  "لغو رزرو اقامتگاه",
                ].map((item) => (
                  <li
                    key={item}
                    className="
                      flex
                      items-center
                      gap-2
                      text-gray-500
                      text-xs
                    "
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />

                    <a href="#" className="hover:text-blue-500 transition">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* خدمات مشتریان */}
            <div>
              <h4 className="text-primary500 font-bold text-sm mb-5">
                خدمات مشتریان
              </h4>

              <ul className="flex flex-col gap-3">
                {[
                  "پرسش های متداول مهمان",
                  "پرسش های متداول میزبان",
                  "چطور اقامتگاه ثبت کنم ؟",
                  "حریم شخصی کاربران",
                ].map((item) => (
                  <li
                    key={item}
                    className="
                      flex
                      items-center
                      gap-2
                      text-gray-500
                      text-xs
                    "
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />

                    <a href="#" className="hover:text-blue-500 transition">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* ارتباط */}
            <div>
              <h4 className="text-primary500 font-bold text-sm mb-5">
                راه ارتباطی با ما
              </h4>

              <div className="flex flex-col gap-3 text-gray-500 text-xs">
                <p>09229167194 - 09854161231</p>
                <p>Delta@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-200 py-4">
        <p className="text-center text-gray-400 text-xs">
          تمام حقوق مادی و معنوی این اثر برای شما محفوظ است .
        </p>
      </div>
    </footer>
  );
}
