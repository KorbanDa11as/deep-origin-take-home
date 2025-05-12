export type PaginationControlProps = {
  page: number
  pageSize: number
  totalRowCount: number
  setPage: React.Dispatch<React.SetStateAction<number>>
}
export function PaginationControl({ page, pageSize, totalRowCount, setPage }: PaginationControlProps) {

  const upperBoundForRowCount = pageSize * (page + 1);
  const lowerBoundForRowCount = pageSize * page + 1;
  const rowIndexRange = [
    lowerBoundForRowCount,
    upperBoundForRowCount > totalRowCount ? totalRowCount : upperBoundForRowCount,
  ];

  const upperBoundPage = Math.ceil(totalRowCount / pageSize)
  const dataRange = `${rowIndexRange[0]}-${rowIndexRange[1]}`;

  return <div className="pagination">
    {totalRowCount > 0 && (
      <span >
        <b>{dataRange}</b> of <b>{totalRowCount}</b>
      </span>
    )}
    <button onClick={() => setPage(prev => prev -= 1)} disabled={page === 0}>prev </button>
    <span>{page + 1}</span>
    <button onClick={() => setPage(prev => prev += 1)} disabled={page === upperBoundPage - 1}>next </button>


  </div>
}
