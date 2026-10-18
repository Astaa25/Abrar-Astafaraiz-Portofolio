export function cn(...inputs: (string | number | boolean | undefined | null)[]): string {
  return inputs
    .filter((x): x is string => typeof x === 'string' && x.length > 0)
    .join(' ');
}
