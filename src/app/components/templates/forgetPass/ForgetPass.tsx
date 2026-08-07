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
        p-4
        sm:p-6
        lg:p-10
        "
      >
        <div
          className="
          w-full
          max-w-5xl
          bg-white
          dark:bg-[#272727]
          rounded-3xl
          shadow-xl
          overflow-hidden
          flex
          flex-col
          sm:flex-row-reverse
          min-h-[520px]
          "
        >
          {/* Slider - سمت چپ */}

          <div
            className="
            w-full
            lg:w-[55%]
            h-64
            sm:h-auto
            p-4
            "
          >
            <HouseSlider />
          </div>

          {/* Form - سمت راست */}

          <div
            className="
            w-full
            lg:w-[45%]
            flex
            items-center
            justify-center
            border-t
            lg:border-t-0
            lg:border-l
            border-gray-100
            dark:border-[#353535]
            "
          >
            <div
              className="
              w-full
              max-w-sm
              flex
              flex-col
              items-center
              "
            >
              {/* عنوان فرم */}

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
