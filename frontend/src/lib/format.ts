export function formatNumber(value: number | undefined) {
  if (value === undefined || value === null) return '-';
  return new Intl.NumberFormat('fr-FR').format(value);
}

export function formatRate(value: number | undefined) {
  if (value === undefined || value === null) return '-';
  return `${value.toFixed(1)}/s`;
}
