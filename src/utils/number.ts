export const formatKoreanCurrency = (number: number, suffix = "원") => {
  return `${Math.floor(number)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}${suffix}`;
};
