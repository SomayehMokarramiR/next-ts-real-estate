import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function sendVerificationEmail(email: string, code: string) {
  try {
    console.log("==============================");
    console.log("SMTP EMAIL DEBUG");
    console.log("==============================");

    console.log("FROM:", process.env.EMAIL_USER ? "EXISTS" : "MISSING");

    console.log("TO:", email);
    console.log("CODE:", code);

    await transporter.sendMail({
      from: `"Bahr Real Estate" <${process.env.EMAIL_FROM}>`,

      to: email,

      subject: "کد تایید ثبت نام",

      html: `
        <div dir="rtl" style="
          font-family:Arial;
          text-align:center;
          padding:30px;
        ">

          <h2>
            تایید ایمیل
          </h2>

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

    console.log("EMAIL SENT SUCCESSFULLY");

    return true;
  } catch (error) {
    console.error("SMTP SEND ERROR:", error);

    if (error instanceof Error) {
      console.error("MESSAGE:", error.message);
    }

    return false;
  }
}
