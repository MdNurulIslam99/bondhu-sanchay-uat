import { cn } from '@/lib/cn';

/**
 * columns: [{ key, header, render?(row), align?: 'right', className? }]
 * footer:  optional array of cell contents aligned with columns.
 */
export default function DataTable({ columns, rows, rowKey, highlight, footer, maxHeight, className }) {
  const cell = (c) => cn('px-3 py-3 sm:px-4', c.align === 'right' && 'text-right', c.className);
  return (
    <div className={cn('overflow-auto rounded-xl border border-line', className)} style={maxHeight ? { maxHeight } : undefined}>
      <table className="w-full whitespace-nowrap text-left text-sm">
        <thead className="sticky top-0 z-[1] bg-sand text-[13px] text-muted">
          <tr>
            {columns.map((c) => (
              <th key={c.key} scope="col" className={cn(cell(c), 'font-semibold')}>
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={rowKey(row, i)} className={cn('border-t border-line', highlight?.(row) && 'bg-mint/60 font-semibold')}>
              {columns.map((c) => (
                <td key={c.key} className={cell(c)}>
                  {c.render ? c.render(row) : row[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        {footer && (
          <tfoot className="bg-sand font-semibold">
            <tr className="border-t border-line">
              {footer.map((f, i) => (
                <td key={i} className={cell(columns[i])}>
                  {f}
                </td>
              ))}
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
}
