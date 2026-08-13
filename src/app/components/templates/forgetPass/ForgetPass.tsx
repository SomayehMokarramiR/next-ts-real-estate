"use client";

import ForgotPasswordStep1 from "./ForgotPasswordStep1";
import ForgotPasswordStep2 from "./ForgotPasswordStep2";
import ForgotPasswordStep3 from "./ForgotPasswordStep3";
import HouseSlider from "./HouseSlider";

import { useState } from "react";

export default function ForgetPass() {
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  return (
    <div className="flex flex-col">
      <main
        className="
          flex-1
          flex
          items-center
          justify-center
          px-4
          py-4
          sm:px-6
        "
      >
        <div
          className="
            w-full
            max-w-5xl
            bg-white
            dark:bg-[#272727]
            rounded-2xl
            shadow-2xl
            overflow-hidden
            flex
            flex-col
            md:flex-row-reverse
            md:min-h-[520px]
          "
        >
          {/* Slider - سمت چپ */}
          <div
            className="
              relative
              w-full
              md:w-[55%]
              min-h-[260px]
              md:min-h-[520px]
              shrink-0
            "
          >
            <HouseSlider />
          </div>

          {/* Form - سمت راست */}
          <div
            className="
              bg-white
              dark:bg-[#272727]
              w-full
              md:w-[45%]
              flex
              flex-col
              justify-center
              px-5
              py-8
              sm:px-8
              lg:px-10
              border-t
              md:border-t-0
              md:border-l
              border-gray-100
              dark:border-[#353535]
            "
          >
            <div
              className="
                w-full
                max-w-sm
                mx-auto
              "
            >
              <h1
                className="
                  text-xl
                  font-bold
                  text-gray-900
                  dark:text-white
                  mb-8
                  text-center
                "
              >
                فراموشی رمز عبور
              </h1>

              {step === 1 && (
                <ForgotPasswordStep1
                  email={email}
                  setEmail={setEmail}
                  onNext={() => setStep(2)}
                />
              )}

              {step === 2 && (
                <ForgotPasswordStep2
                  email={email}
                  code={code}
                  setCode={setCode}
                  onNext={() => setStep(3)}
                  onBack={() => setStep(1)}
                />
              )}

              {step === 3 && (
                <ForgotPasswordStep3
                  email={email}
                  code={code}
                  onBack={() => setStep(2)}
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
