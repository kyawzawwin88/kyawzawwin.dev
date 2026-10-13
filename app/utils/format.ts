const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONTHS_SHORT = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

function parts(iso: string) {
  const [year, month, day] = iso.slice(0, 10).split("-").map(Number);
  return { year, month, day };
}

export function noteDate(iso: string) {
  const { year, month, day } = parts(iso);
  if (!year || !month || !day) return iso;
  return `${String(day).padStart(2, "0")} ${MONTHS_SHORT[month - 1]} ${String(year).slice(2)}`;
}

export function noteMonth(iso: string) {
  const { year, month } = parts(iso);
  if (!year || !month) return iso;
  return `${MONTHS[month - 1]} ${year}`;
}

export function snapshotDate(iso: string) {
  const { year, month, day } = parts(iso);
  if (!year || !month || !day) return iso;
  return `${day} ${MONTHS[month - 1]} ${year}`;
}

export function firstSentence(text: string | null | undefined) {
  if (!text) return null;
  const trimmed = text.trim();
  const split = trimmed.split(/(?<=\.)\s/);
  return split[0] || trimmed;
}

export function starLabel(count: number) {
  return count === 1 ? "1 star" : `${count} stars`;
}

export function trackDuration(durationMs: number) {
  const total = Math.round(durationMs / 1000);
  if (!Number.isFinite(total) || total <= 0) return null;
  const minutes = Math.floor(total / 60);
  const seconds = total % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}
