import { RowData, Table as TableType, flexRender } from "@tanstack/react-table";
import { ComponentPropsWithoutRef, Fragment } from "react";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { cn } from "./util/cn";

type DataTableProp<TData> = {
  table: TableType<TData>;
  onRowClick?: (row: TData) => void;
} & ComponentPropsWithoutRef<typeof Table>;

// use module augmentation to add new properties to the TableMeta interface
// so now we can use the new properties in the DataTable component inside options.meta
declare module "@tanstack/react-table" {
  // react-table library force us to set TData extend RowData
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface TableMeta<TData extends RowData> {
    isEditable?: boolean;

    /**
     * Function to select a single cell in the table
     */
    selectCell?: (rowIndex: number, columnId: string) => void;

    /**
     * Function to delete a row in the table. Implementation should be defined in the parent component
     */
    deleteRow?: (rowId: string) => void;

    /**
     * Function to add a copy of a row in the table. Implementation should be defined in the parent component
     */
    addCopyRow?: (rowId: string) => void;
  }
}

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
      className={cn("p-0 text-gray", className)}
      {...rest}
    >
      <TableHead>
        {table.getHeaderGroups().map((headerGroups) => {
          return (
            <TableRow className="h-[60px]" key={headerGroups.id}>
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
              key={`${row.id}`}
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
              variant={"body"}
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
