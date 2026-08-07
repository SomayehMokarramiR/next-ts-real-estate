import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(email: string, code: string) {
  try {
    console.log("==============================");
    console.log("RESEND DEBUG");
    console.log("==============================");

    console.log("API KEY:", process.env.RESEND_API_KEY ? "EXISTS" : "MISSING");

    console.log("FROM:", process.env.RESEND_FROM_EMAIL);

    console.log("TO:", email);
    console.log("CODE:", code);

    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: [email],
      subject: "کد تایید ثبت نام",
      html: `
        <div dir="rtl" style="
          font-family:Arial;
          text-align:center;
          padding:30px;
        ">
          <h2>تایید ایمیل</h2>

          <p>
            کد تایید شما:
          </p>

          <h1 style="
            color:#2A52BE;
            letter-spacing:8px;
          ">
            ${code}
          </h1>

          <p>
            این کد تا ۵ دقیقه معتبر است.
          </p>

        </div>
      `,
    });

    if (error) {
      console.error("RESEND ERROR:", JSON.stringify(error, null, 2));

      return false;
    }

    console.log("EMAIL SENT:", JSON.stringify(data, null, 2));

    return true;
  } catch (error) {
    console.error("SEND EMAIL ERROR:", error);

    return false;
  }
}
