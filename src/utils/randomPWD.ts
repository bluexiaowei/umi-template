export default function randomPassword(total: number, patten: RegExp): string {
  const arrTotal = Array.from({ length: total });
  const arrRandom = arrTotal.map(() =>
    String.fromCharCode(Math.floor(Math.random() * (126 - 33 + 1)) + 33),
  );
  const password = arrRandom.join('');

  if (patten) {
    return patten.test(password) ? password : randomPassword(total, patten);
  }

  return password;
}
