export const undefToNull = <T>(value: T | undefined) =>
  value !== undefined ? value : null
