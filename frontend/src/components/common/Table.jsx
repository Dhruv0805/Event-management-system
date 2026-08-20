// Generic responsive table. `columns`: [{ key, header, render? }]
const Table = ({ columns, data, emptyMessage = 'No records found.', rowKey = '_id' }) => {
  if (!data || data.length === 0) {
    return <p className="py-8 text-center text-body-md text-text-muted">{emptyMessage}</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] border-collapse text-left text-body-md">
        <thead>
          <tr className="border-b border-border text-label-md text-text-muted">
            {columns.map((col) => (
              <th key={col.key} className="whitespace-nowrap px-3 py-3 font-semibold">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr
              key={row[rowKey]}
              className="border-b border-border/60 hover:bg-surface-raised/60 transition-colors"
            >
              {columns.map((col) => (
                <td key={col.key} className="px-3 py-3 text-text-secondary">
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
