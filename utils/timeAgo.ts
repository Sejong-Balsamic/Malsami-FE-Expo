import { formatDistanceToNow, parseISO } from "date-fns";
import { ko } from "date-fns/locale";

const timeAgo = (timestamp: string): string => {
  if (!timestamp) return "";
  try {
    const date = parseISO(timestamp);
    return formatDistanceToNow(date, { addSuffix: true, locale: ko });
  } catch (error) {
    return timestamp;
  }
};

export { timeAgo };
