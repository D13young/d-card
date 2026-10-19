function yearsWord(count: number): string {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod10 === 1 && mod100 !== 11) {
    return 'год';
  }
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) {
    return 'года';
  }
  return 'лет';
}

function monthsWord(count: number): string {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod10 === 1 && mod100 !== 11) {
    return 'месяц';
  }
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) {
    return 'месяца';
  }
  return 'месяцев';
}

export function calculateDuration(
  startDate: Date,
  endDate: Date | null,
): string {
  const end = endDate ?? new Date();
  let months =
    (end.getFullYear() - startDate.getFullYear()) * 12 +
    (end.getMonth() - startDate.getMonth());
  if (end.getDate() < startDate.getDate()) {
    months -= 1;
  }
  if (months < 1) {
    return 'меньше месяца';
  }
  const years = Math.floor(months / 12);
  const restMonths = months % 12;
  const parts: string[] = [];
  if (years > 0) {
    parts.push(`${years} ${yearsWord(years)}`);
  }
  if (restMonths > 0) {
    parts.push(`${restMonths} ${monthsWord(restMonths)}`);
  }
  return parts.join(' ');
}
