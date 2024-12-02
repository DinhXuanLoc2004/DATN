export const fotmatedAmount = (amount: number) => {
  return (
    new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'})
      .format(amount)
      .replace('₫', '') + ' đ'
  );
};
