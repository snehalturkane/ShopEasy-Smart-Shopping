export function formatINR(amount) {
  if (amount === undefined || amount === null) return '₹0';
  const num = Math.round(Number(amount));
  return '₹' + num.toLocaleString('en-IN');
}
