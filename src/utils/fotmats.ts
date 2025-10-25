export const fotmatedAmount = (amount: number) => {
  return (
    new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'})
      .format(amount)
      .replace('₫', '') + ' đ'
  );
};

export const formatOrder = (order: number): string => {
  if (order >= 1000000) {
    return `${(order / 1000000).toFixed(1)}m`;
  }
  if (order >= 1000) {
    return `${(order / 1000).toFixed(1)}k`;
  }
  return `${order}`;
};
