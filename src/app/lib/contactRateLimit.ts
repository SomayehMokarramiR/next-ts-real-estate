import ContactRateLimit from "../models/ContactRateLimit";

const MAX_REQUESTS = 5;
const WINDOW_MS = 10 * 60 * 1000; // 10 دقیقه

export async function checkContactRateLimit(ip: string) {
  const now = new Date();

  const record = await ContactRateLimit.findOne({ ip }).exec();

  // اولین درخواست
  if (!record) {
    await ContactRateLimit.create({
      ip,
      count: 1,
      windowStart: now,
    });

    return {
      allowed: true,
      remaining: MAX_REQUESTS - 1,
      retryAfter: 0,
    };
  }

  const elapsed = now.getTime() - record.windowStart.getTime();

  // بازه 10 دقیقه‌ای تمام شده
  if (elapsed >= WINDOW_MS) {
    record.count = 1;
    record.windowStart = now;

    await record.save();

    return {
      allowed: true,
      remaining: MAX_REQUESTS - 1,
      retryAfter: 0,
    };
  }

  // محدودیت پر شده
  if (record.count >= MAX_REQUESTS) {
    const retryAfter = Math.ceil((WINDOW_MS - elapsed) / 1000);

    return {
      allowed: false,
      remaining: 0,
      retryAfter,
    };
  }

  // افزایش تعداد درخواست
  record.count += 1;

  await record.save();

  return {
    allowed: true,
    remaining: MAX_REQUESTS - record.count,
    retryAfter: 0,
  };
}
