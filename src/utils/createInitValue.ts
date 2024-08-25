export function createInitValue<T>(): T {
  const initValue: any = {};
  for (const key in {} as T) {
    if (typeof ({} as T)[key] === 'string') {
      initValue[key] = '';
    } else if (typeof ({} as T)[key] === 'number') {
      initValue[key] = 0;
    }
  }
  return initValue;
}
