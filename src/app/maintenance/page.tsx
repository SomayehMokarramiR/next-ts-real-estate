export default function MaintenancePage() {
  return (
    <main
      dir="rtl"
      className="
        flex
        min-h-screen
        items-center
        justify-center
        bg-background
        px-6
      "
    >
      <div
        className="
          w-full
          max-w-md
          rounded-2xl
          border
          border-border
          bg-card
          p-8
          text-center
          shadow-lg
        "
      >
        <div
          className="
            mx-auto
            mb-6
            flex
            h-20
            w-20
            items-center
            justify-center
            rounded-full
            bg-primary500
            text-4xl
            text-white
          "
        >
          🛠
        </div>

        <h1
          className="
            mb-4
            text-2xl
            font-bold
            text-foreground
          "
        >
          سایت در حال بروزرسانی است
        </h1>

        <p
          className="
            leading-7
            text-text-body
          "
        >
          ما در حال انجام تغییرات و بهبود سامانه هستیم. لطفاً کمی بعد دوباره
          مراجعه کنید.
        </p>

        <p
          className="
            mt-6
            text-sm
            text-gray-400
          "
        >
          املاک آدا
        </p>
      </div>
    </main>
  );
}
