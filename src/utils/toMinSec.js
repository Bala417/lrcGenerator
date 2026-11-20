export function toMinSec(seconds) {
  if (seconds == null || isNaN(seconds)) return "00:00";
  seconds = Math.max(0, seconds);
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}
