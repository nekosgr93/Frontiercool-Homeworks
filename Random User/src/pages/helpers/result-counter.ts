export function calcCurrentResultNumber(currentPage: number, pageSize: number, itemTotal: number) {
  const start = (currentPage - 1) * pageSize + 1;
  const pageLength = Math.ceil(itemTotal / pageSize);
  let end: number;
  if (currentPage !== pageLength) {
    end = currentPage * pageSize!;
  } else {
    end = itemTotal;
  }

  return { start, end };
}
