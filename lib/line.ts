const DEFAULT_LINE_BOT_BASIC_ID = "@482ykgdg";

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

export function getLineBasicIdLabel(locale: "zh-TW" | "en" = "zh-TW"): string {
  const id = getLineBasicId();
  return locale === "zh-TW" ? `官方帳號 ${id}` : `Official account ${id}`;
}
