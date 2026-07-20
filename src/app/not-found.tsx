import Link from "next/link";
import Navbar from "./components/modules/navbar/Navbar";
import MainLayout from "./components/layout/MainLayout";

export default function NotFound() {
  return (
    <MainLayout>
      <Navbar />

      <main
        className="
    flex
    flex-col
    items-center
    justify-center
    overflow-hidden
    px-4
    pt-[100px]
    pb-10
  "
      >
        {/* CONTENT */}

        <div
          className="
            flex
            flex-col
            items-center
            gap-4
            z-10
            mb-8
            text-center
          "
        >
          <h1
            className="
              text-[clamp(5rem,20vw,10rem)]
              font-black
              leading-none
              tracking-tight
              text-primary500
            "
          >
            404
          </h1>

          <p
            className="
              text-lg
              sm:text-xl
              font-bold
              text-gray-900
            "
          >
            صفحه مورد نظر یافت نشد
          </p>

          <Link
            href="/"
            className="
              mt-2
              inline-flex
              items-center
              gap-2
              px-6
              py-2.5
              rounded-full
              text-white
              text-sm
              sm:text-base
              font-medium
              transition-opacity
              hover:opacity-90
              active:scale-95
              bg-primary500
            "
          >
            <span>برگردیم به صفحه اصلی</span>

            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="rotate-180"
            >
              <path
                d="M6 12L10 8L6 4"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>

        {/* SVG */}

        <div
          className="
            w-full
            max-w-[1200px]
            relative
          "
          style={{
            height: "clamp(120px,20vw,200px)",
          }}
        >
          <svg
            viewBox="0 0 1200 200"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
            className="
              w-full
              h-full
            "
          >
            {/* LEFT LINE */}

            <path
              d="
                M -10 100
                C 60 60,100 140,180 100
                C 260 60,300 140,380 100
                C 430 70,470 130,520 115
              "
              stroke="#2563eb"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />

            {/* RIGHT LINE */}

            <path
              d="
                M 680 85
                C 730 70,770 130,820 100
                C 900 60,940 140,1020 100
                C 1100 60,1140 140,1210 100
              "
              stroke="#1a1a2e"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />

            {/* PLUGS */}

            <g transform="translate(600 100)">
              {/* LEFT PLUG */}

              <g transform="translate(-60 -12)">
                <rect
                  x="-28"
                  y="-14"
                  width="28"
                  height="28"
                  rx="4"
                  fill="#1a1a2e"
                />

                <rect
                  x="-22"
                  y="-8"
                  width="6"
                  height="10"
                  rx="1.5"
                  fill="white"
                />

                <rect
                  x="-10"
                  y="-8"
                  width="6"
                  height="10"
                  rx="1.5"
                  fill="white"
                />

                <line
                  x1="-28"
                  y1="0"
                  x2="-52"
                  y2="0"
                  stroke="#1a1a2e"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </g>

              {/* RIGHT PLUG */}

              <g transform="translate(60 12)">
                <rect
                  x="0"
                  y="-14"
                  width="28"
                  height="28"
                  rx="4"
                  fill="#1a1a2e"
                />

                <rect
                  x="6"
                  y="-9"
                  width="5"
                  height="10"
                  rx="1.5"
                  fill="white"
                />

                <rect
                  x="17"
                  y="-9"
                  width="5"
                  height="10"
                  rx="1.5"
                  fill="white"
                />

                <line
                  x1="28"
                  y1="0"
                  x2="52"
                  y2="0"
                  stroke="#1a1a2e"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </g>

              {/* SPARK */}

              <g>
                <line
                  x1="-10"
                  y1="-8"
                  x2="0"
                  y2="0"
                  stroke="#facc15"
                  strokeWidth="2"
                  strokeLinecap="round"
                />

                <line
                  x1="0"
                  y1="0"
                  x2="-6"
                  y2="6"
                  stroke="#facc15"
                  strokeWidth="2"
                  strokeLinecap="round"
                />

                <line
                  x1="6"
                  y1="-6"
                  x2="14"
                  y2="2"
                  stroke="#facc15"
                  strokeWidth="2"
                  strokeLinecap="round"
                />

                <line
                  x1="14"
                  y1="2"
                  x2="8"
                  y2="10"
                  stroke="#facc15"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </g>
            </g>
          </svg>
        </div>
      </main>
    </MainLayout>
  );
}
