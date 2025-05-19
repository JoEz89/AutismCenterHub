import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number, currencyCode: string = "USD") {
  return new Intl.NumberFormat(currencyCode === "USD" ? "en-US" : "ar-SA", {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: 2,
  }).format(price);
}

export function getReadableDate(date: string, locale: string = "en") {
  return new Date(date).toLocaleDateString(locale === "en" ? "en-US" : "ar-SA", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function getTimeFromString(timeStr: string, locale: string = "en") {
  // Format: "HH:MM" (24-hour format)
  const [hours, minutes] = timeStr.split(":");
  const date = new Date();
  date.setHours(parseInt(hours, 10));
  date.setMinutes(parseInt(minutes, 10));
  
  return date.toLocaleTimeString(locale === "en" ? "en-US" : "ar-SA", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
}
