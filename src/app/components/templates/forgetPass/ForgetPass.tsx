import ForgotPasswordForm from "./ForgotPasswordForm";
import HouseSlider from "./HouseSlider";

export default function ForgetPass() {
  return (
    <div className=" flex flex-col">
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-10">
        <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col sm:flex-row min-h-130">
          {/* Right — Form */}
          <div className="w-full lg:w-[45%] flex items-center justify-center border-t lg:border-t-0 lg:border-r border-gray-100">
            <ForgotPasswordForm />
          </div>

          {/* Left — Slider */}
          <div className="hidden sm:block  w-full lg:w-[60%] h-64 sm:h-80 lg:h-auto p-4">
            <HouseSlider />
          </div>
        </div>
      </main>
    </div>
  );
}
