export interface ContactPayload {
  name: string;
  email: string;
  message: string;
  website?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  data?: ContactMessage;
}

export const contactService = {
  async sendMessage(payload: ContactPayload): Promise<ContactResponse> {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    let data: ContactResponse;

    try {
      data = await response.json();
    } catch {
      throw new Error("پاسخ نامعتبر از سرور دریافت شد.");
    }

    if (!response.ok || !data.success) {
      throw new Error(data.message || "ارسال پیام با خطا مواجه شد.");
    }

    return data;
  },
};
