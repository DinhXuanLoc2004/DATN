export class handleDate {
  static handleIsNewProduct = (createAt: Date) => {
    const today = new Date()
    const stringCreateAt = createAt.toISOString().split('T')[0];
    const stringToDay = today.toISOString().split('T')[0];
    return stringCreateAt == stringToDay;
  };
}
