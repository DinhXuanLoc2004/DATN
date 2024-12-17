export class handleDate {
  static formatDateTimeHHMM(input: string) {
    const date = new Date(input); // Chuyển chuỗi ISO 8601 thành đối tượng Date

    const hours = date.getHours().toString().padStart(2, '0'); // Giờ (hh)
    const minutes = date.getMinutes().toString().padStart(2, '0'); // Phút (mm)

    const day = date.getDate().toString().padStart(2, '0'); // Ngày (dd)
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Tháng (mm)

    return `${hours}:${minutes} ${day}-${month}`;
  }

  static handleTimeEndVoucher = (time_end: string) => {
    const timeEnd = new Date(time_end);
    const now = new Date();
    return now > timeEnd;
  };

  static convertTimestampToDate = (time: number) => {
    const date = new Date(time * 1000);
    return date;
  };

  static handleIsNewProduct = (createAt: string) => {
    const today = new Date();
    const createdDate = new Date(createAt);

    const diffTime = today.getTime() - createdDate.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    return diffDays <= 3;
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
