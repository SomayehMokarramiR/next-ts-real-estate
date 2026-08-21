import User from "@/app/models/User";
import Notification from "@/app/models/Notification";
import AdminSettings from "@/app/models/AdminSettings";

type NotificationType = "reservation" | "message" | "offer" | "system";

export async function createNotification({
  userId,
  title,
  message,
  type,
}: {
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
}) {
  try {
    // =====================
    // ADMIN SETTINGS CHECK
    // =====================

    const adminSettings = await AdminSettings.findOne();

    if (adminSettings) {
      const adminNotifications = adminSettings.notifications;

      // رزرو
      if (type === "reservation" && adminNotifications?.reservation === false) {
        return null;
      }

      // پیام های سیستمی
      if (
        ["message", "system"].includes(type) &&
        adminNotifications?.systemMessages === false
      ) {
        return null;
      }

      // پیشنهادها و تخفیف ها
      if (
        type === "offer" &&
        adminNotifications?.offersAndDiscounts === false
      ) {
        return null;
      }
    }

    // =====================
    // USER SETTINGS CHECK
    // =====================

    const user = await User.findById(userId);

    if (!user) {
      return null;
    }

    const notifications = user.notifications;

    // رزرو کاربر
    if (type === "reservation" && notifications?.reservation === false) {
      return null;
    }

    // پیام های سیستم کاربر
    if (
      ["message", "system"].includes(type) &&
      notifications?.systemMessages === false
    ) {
      return null;
    }

    // پیشنهادها کاربر
    if (type === "offer" && notifications?.offersAndDiscounts === false) {
      return null;
    }

    // =====================
    // CREATE NOTIFICATION
    // =====================

    return await Notification.create({
      userId,
      title,
      message,
      type,
      isRead: false,
    });
  } catch (error) {
    console.error("CREATE NOTIFICATION ERROR:", error);
    return null;
  }
}
