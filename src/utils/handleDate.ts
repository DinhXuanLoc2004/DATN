export class handleDate {
  static handleIsNewProduct = (createAt: string) => {
    const today = new Date();
    const stringCreateAt = createAt.split('T')[0];
    const stringToDay = today.toISOString().split('T')[0];
    return stringCreateAt == stringToDay;
  };
  static formatDate = (createAt: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    };
    return createAt.toLocaleDateString('en-US', options);
  };
}
