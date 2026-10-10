import { birthdayConfig } from "@/birthday.config";
import type { BirthdayConfig } from "./types";

/** Typed access to the single source of content: birthday.config.ts */
export const config: BirthdayConfig = birthdayConfig;

const isDev = process.env.NODE_ENV === "development";

/** The birthday moment in effect: `devDate` while developing, otherwise `date`. */
export const birthdayDate = (isDev && config.birthday.devDate) || config.birthday.date;

/** ?simulate=… testing shortcuts only work in development, so nobody can skip the lock on the live site. */
export const allowSimulation = isDev;

/** Replace {name}, {sender} and any extra {placeholders} in a config string. */
export function fill(template: string, extra: Record<string, string | number> = {}) {
  const vars: Record<string, string | number> = {
    name: config.recipient.name,
    sender: config.sender.name,
    ...extra,
  };
  return template.replace(/\{(\w+)\}/g, (match, key: string) => (key in vars ? String(vars[key]) : match));
}
