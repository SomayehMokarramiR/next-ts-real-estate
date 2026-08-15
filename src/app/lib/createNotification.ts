import User from "@/app/models/User";
import Notification from "@/app/models/Notification";

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
  const user = await User.findById(userId);

  if (!user) {
    return null;
  }

  // =====================
  // CHECK USER SETTINGS
  // =====================

  if (type === "reservation") {
    if (!user.settings.notifications.reservation) {
      return null;
    }
  }

  if (type === "message") {
    if (!user.settings.notifications.messages) {
      return null;
    }
  }

  if (type === "offer") {
    if (!user.settings.notifications.offers) {
      return null;
    }
  }

  return await Notification.create({
    userId,
    title,
    message,
    type,
    isRead: false,
  });
}
