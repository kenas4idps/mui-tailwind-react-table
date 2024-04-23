import { Table as TableType, flexRender } from '@tanstack/react-table';
import { ComponentPropsWithoutRef, Fragment } from 'react';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { cn } from './util/cn';

type DataTableProp<TData> = {
  table: TableType<TData>;
  onRowClick?: (row: TData) => void;
} & ComponentPropsWithoutRef<typeof Table>;

function DataTable<TData>({
  table,
  onRowClick,
  sx,
  className,
  ...rest
}: DataTableProp<TData>) {
  return (
    <Table
      sx={{ minWidth: 650, top: 0, ...sx }}
      stickyHeader
      className={cn('p-0 text-gray', className)}
      {...rest}
    >
      <TableHead>
        {table.getHeaderGroups().map((headerGroups) => {
          return (
            <TableRow className="h-[60px]">
              {headerGroups.headers.map((header) => (
                <Fragment key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </Fragment>
              ))}
            </TableRow>
          );
        })}
      </TableHead>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              onClick={() => {
                onRowClick && onRowClick(row.original);
              }}
            >
              {row.getVisibleCells().map((cell) => (
                <Fragment key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Fragment>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              variant={'body'}
              colSpan={table.getVisibleLeafColumns().length}
            >
              {`No results.`}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export default DataTable;
