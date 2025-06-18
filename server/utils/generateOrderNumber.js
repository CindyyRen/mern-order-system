export function generateOrderNumber() {
  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
  const timeStr = `${now.getHours()}${now.getMinutes()}`.padStart(4, '0');
  const rand = Math.floor(Math.random() * 100)
    .toString()
    .padStart(2, '0');
  return `${dateStr}${timeStr}${rand}`;
}
