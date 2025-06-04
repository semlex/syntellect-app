export function checkIsNumber(str: string): boolean {
  return !!str.trim() && !Number.isNaN(Number(str));
}
