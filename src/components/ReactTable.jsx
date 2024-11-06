import { useTable, usePagination, useGlobalFilter } from 'react-table';
const ReactTable = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 }
    },
    useGlobalFilter, // Use the useGlobalFilter hook
    usePagination // Use the usePagination hook
  );
  const renderTable = () => <div className="table-responsive">
    <table {...getTableProps()} className="table mb-3">
      <thead>
        {headerGroups.map((headerGroup, headerGroupIndex) => (
          <tr key={headerGroupIndex} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column, columnIndex) => (
              <th key={columnIndex} {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {page.map((row, rowIndex) => {
          prepareRow(row);
          return (
            <tr key={rowIndex} {...row.getRowProps()}>
              {row.cells.map((cell, cellIndex) => (
                <td key={cellIndex} {...cell.getCellProps()}>{cell.render('Cell')}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
  const renderHeader = () => <div className="d-flex justify-content-between mb-3">
    <div>
      <input
        className="form-control"
        id="tableSearchInput"
        placeholder="Search"
        value={state.globalFilter || ''}
        onChange={e => setGlobalFilter(e.target.value)}
      />
    </div>
    <div>
      <select
        className="form-select"
        value={state.pageSize}
        onChange={e => {
          setPageSize(Number(e.target.value))
        }}>
        {[10, 20, 30, 40, 50].map(pageSize => (
          <option key={pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </select>
    </div>
  </div>
  // Render the UI for your table
  return (
    <div className='card p-3 shadow-sm'>
      {renderHeader()}
      {renderTable()}
      <div className='d-flex flex-column align-items-center'>
        <nav>
          <ul className="pagination">
            <li className={`page-item ${canPreviousPage ? "" : "disabled"}`}>
              <button className="page-link" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                {'<<'}
              </button>
            </li>
            <li className={`page-item ${canPreviousPage ? "" : "disabled"}`}>
              <button className="page-link" onClick={() => previousPage()} disabled={!canPreviousPage}>
                {'<'}
              </button>
            </li>
            {canPreviousPage &&
              <li className="page-item">
                <button className="page-link" onClick={() => previousPage()}>{state.pageIndex}</button>
              </li>
            }
            <li className="page-item active"><button className="page-link">{state.pageIndex + 1}</button></li>
            {canNextPage &&
              <li className="page-item">
                <button className="page-link" onClick={() => nextPage()}>{state.pageIndex + 2}</button>
              </li>
            }
            <li className={`page-item ${canNextPage ? "" : "disabled"}`}>
              <button className="page-link" onClick={() => nextPage()} disabled={!canNextPage}>
                {'>'}
              </button>
            </li>
            <li className={`page-item ${canNextPage ? "" : "disabled"}`}>
              <button className="page-link" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                {'>>'}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
export default ReactTable