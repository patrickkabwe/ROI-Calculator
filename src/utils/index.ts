export function kFormatter(num: number) {
  let formatter =new Intl.NumberFormat("en", { notation: "compact" });
  return formatter.format(num);
}

export function formatterCurrency(num: number) {
  let formatter = new Intl.NumberFormat("en-IN", { style:'currency', currency: "USD" });
  return formatter.format(num);
}
