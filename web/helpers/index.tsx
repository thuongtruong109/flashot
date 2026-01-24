export const round2Dec = (num: number): number =>
  Number((Math.round(num * 100) / 100).toFixed(2));
