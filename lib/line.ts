const DEFAULT_LINE_BOT_BASIC_ID = "@482ykgdg";
const DEFAULT_LINE_PERSONAL_QR = "/lineQRcode.jpg";

/** Public OA basic ID — safe for client bundle */
export function getLineBasicId(): string {
  const raw = process.env.NEXT_PUBLIC_LINE_BOT_BASIC_ID ?? DEFAULT_LINE_BOT_BASIC_ID;
  return raw.startsWith("@") ? raw : `@${raw}`;
}

/** Official Account add-friend deep link */
export function getLineAddFriendUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_LINE_ADD_FRIEND_URL?.trim();
  if (fromEnv) return fromEnv;
  return `https://line.me/R/ti/p/${getLineBasicId()}`;
}

/** Personal LINE add-friend URL (social / sc) */
export function getLinePersonalAddFriendUrl(): string | null {
  const fromEnv = process.env.NEXT_PUBLIC_LINE_PERSONAL_ADD_FRIEND_URL?.trim();
  return fromEnv || null;
}

/** Static QR image for personal LINE when no deep link is configured */
export function getLinePersonalQrImage(): string {
  return process.env.NEXT_PUBLIC_LINE_PERSONAL_QR_IMAGE?.trim() || DEFAULT_LINE_PERSONAL_QR;
}

export function getLineBasicIdLabel(locale: "zh-TW" | "en" = "zh-TW"): string {
  const id = getLineBasicId();
  return locale === "zh-TW" ? `官方帳號 ${id}` : `Official account ${id}`;
}

export function getLinePersonalLabel(locale: "zh-TW" | "en" = "zh-TW"): string {
  return locale === "zh-TW" ? "私人 LINE" : "Personal LINE";
}
