import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(email: string, code: string) {
  try {
    const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

    console.log("RESEND KEY EXISTS:", !!process.env.RESEND_API_KEY);
    console.log("FROM EMAIL:", fromEmail);
    console.log("TO EMAIL:", email);

    const { data, error } = await resend.emails.send({
      from: `Real Estate <${fromEmail}>`,
      to: [email],
      subject: "کد تایید ثبت نام",
      html: `
        <div
          dir="rtl"
          style="
            font-family: Arial, sans-serif;
            text-align:center;
            padding:30px;
          "
        >
          <h2>
            تایید ایمیل
          </h2>

          <p>
            کد تایید ثبت نام شما:
          </p>

          <h1
            style="
              color:#2A52BE;
              letter-spacing:8px;
              font-size:32px;
            "
          >
            ${code}
          </h1>

          <p>
            این کد تا ۵ دقیقه معتبر است.
          </p>

          <p
            style="
              color:#888;
              font-size:12px;
            "
          >
            اگر شما درخواست ثبت نام نداده‌اید، این ایمیل را نادیده بگیرید.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("RESEND EMAIL ERROR:", JSON.stringify(error, null, 2));

      return false;
    }

    console.log("VERIFICATION EMAIL SENT:", data?.id);

    return true;
  } catch (error) {
    console.error(
      "SEND EMAIL ERROR:",
      error instanceof Error ? error.message : error,
    );

    return false;
  }
}
