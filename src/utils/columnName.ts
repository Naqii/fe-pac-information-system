export function calculateNameColumnWidth(data: (string | number)[][]): number {
  if (!data || data.length === 0) return 100;
  const maxLength = Math.max(
    ...data.map((row) => (row[0] ? row[0].toString().length : 0)),
  );
  return Math.min(maxLength * 10 + 20, 400);
  // perkalian 10 biar lebar cukup,
  // +20 padding,
  // max 400px supaya gak terlalu lebar
}
