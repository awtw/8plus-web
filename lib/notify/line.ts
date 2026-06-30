export type ContactNotificationPayload = {
  name: string;
  email: string;
  company?: string;
  budget?: string;
  message: string;
  submittedAt: string;
  source: string;
};

function isLinePushConfigured(): boolean {
  return Boolean(
    process.env.LINE_CHANNEL_ACCESS_TOKEN?.trim() &&
      process.env.LINE_NOTIFY_USER_ID?.trim(),
  );
}

export function formatContactLineMessage(payload: ContactNotificationPayload): string {
  const lines = [
    "📩 8plus 聯絡表單",
    "",
    `姓名：${payload.name}`,
    `Email：${payload.email}`,
  ];

  if (payload.company) lines.push(`公司：${payload.company}`);
  if (payload.budget) lines.push(`合作模式：${payload.budget}`);
  lines.push("", "訊息：", payload.message);
  lines.push("", `時間：${payload.submittedAt}`);

  return lines.join("\n");
}

export async function pushLineContactNotification(
  payload: ContactNotificationPayload,
): Promise<boolean> {
  if (!isLinePushConfigured()) return false;

  const token = process.env.LINE_CHANNEL_ACCESS_TOKEN!.trim();
  const to = process.env.LINE_NOTIFY_USER_ID!.trim();
  const text = formatContactLineMessage(payload);

  try {
    const res = await fetch("https://api.line.me/v2/bot/message/push", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to,
        messages: [{ type: "text", text }],
      }),
    });

    if (!res.ok) {
      console.error("[line] push failed", res.status, await res.text());
      return false;
    }

    return true;
  } catch (error) {
    console.error("[line] push error", error);
    return false;
  }
}
