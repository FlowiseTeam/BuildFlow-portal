export function getWelcomingText() {
  const time = new Date().getHours();
  if (time < 5) {
    return 'Miłej nocy.';
  }
  if (time < 18) {
    return 'Dzień dobry.';
  }
  if (time > 21) {
    return 'Miłej nocy.';
  }
  return 'Dobry wieczór.';
}
