export function splitArray(arr: any[], len: number) {
  const total = arr.length;
  const result = [];
  for (let i = 0; i < total; i += len) {
    result.push(arr.slice(i, i + len));
  }
  return result;
}