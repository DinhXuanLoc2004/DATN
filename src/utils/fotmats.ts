export const fotmatedAmount = (amount: number) =>
  new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'}).format(
    amount,
  );
