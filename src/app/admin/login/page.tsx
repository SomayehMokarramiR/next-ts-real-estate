import AdminLoginForm from "../components/templates/login/AdminLoginForm";

export default function AdminLoginPage() {
  return (
    <main
      dir="rtl"
      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-background
        px-4
      "
    >
      <div
        className="
          w-full
          max-w-md
          rounded-2xl
          bg-white
          dark:bg-[#353535]
          shadow-xl
          p-8
        "
      >
        <div className="mb-8 text-center">
          <h1
            className="
              text-2xl
              font-bold
              text-gray-900
              dark:text-white
            "
          >
            ورود مدیریت
          </h1>

          <p
            className="
              mt-2
              text-sm
              text-gray-500
              dark:text-gray-400
            "
          >
            برای ورود به پنل مدیریت وارد حساب ادمین شوید.
          </p>
        </div>

        <AdminLoginForm />
      </div>
    </main>
  );
}
