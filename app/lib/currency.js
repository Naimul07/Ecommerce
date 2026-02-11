// Simple currency helper to display prices in Bangladeshi Taka (BDT)
// Prices in the product data remain stored in USD; we convert on display.

export const USD_TO_BDT = 110; // default conversion rate (configurable)

export function toBDT(usd, rate = USD_TO_BDT) {
  if (typeof usd !== 'number') return 0;
  return Math.round(usd * rate);
}

export function formatBDTFromUSD(usd, rate = USD_TO_BDT) {
  const bdt = toBDT(usd, rate);
  return `৳${bdt.toLocaleString()}`;
}

const currencyUtils = { USD_TO_BDT, toBDT, formatBDTFromUSD };

export default currencyUtils;
