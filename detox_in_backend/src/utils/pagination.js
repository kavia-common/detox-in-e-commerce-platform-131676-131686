export function getPagination(query) {
  const page = Math.max(1, parseInt(query.page || '1', 10));
  const pageSize = Math.max(1, Math.min(100, parseInt(query.pageSize || '12', 10)));
  const offset = (page - 1) * pageSize;
  return { page, pageSize, offset };
}
