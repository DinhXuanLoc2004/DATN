export const handleSelect = (
  val: string,
  arr: string[],
  set_arr: (arr: string[]) => void,
) => {
  if (arr.includes(val)) {
    set_arr(arr.filter(item => item !== val));
  } else {
    set_arr([...arr, val]);
  }
};
