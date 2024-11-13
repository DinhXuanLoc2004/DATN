export class handleDate {
  static convertTimestampToDate = (time: number) => {
    const date = new Date(time * 1000)
    return date
  }

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

  static convertDateToDDMMYYYY(dateString: string): string {
    const date = new Date(dateString);
    const utc7Date = new Date(date.getTime() + 7 * 60 * 60 * 1000);

    const day = String(utc7Date.getUTCDate()).padStart(2, '0');
    const month = String(utc7Date.getUTCMonth() + 1).padStart(2, '0');
    const year = utc7Date.getUTCFullYear();

    return `${day}-${month}-${year}`;
  }
}
