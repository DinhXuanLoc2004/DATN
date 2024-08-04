export class handleDate {
  static handleIsNewProduct = (date1: Date, date2: Date) => {
    const stringDate1 = date1.toISOString().split('T')[0];
    const stringDate2 = date2.toISOString().split('T')[0];
    console.log(stringDate1, stringDate2)
    return stringDate1 == stringDate2;
  };
}
