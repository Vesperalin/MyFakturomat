export const objectValues = <T extends object>(object: T): Array<T[keyof T]> =>
  Object.values(object);
