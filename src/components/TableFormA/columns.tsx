import { CellContext, createColumnHelper } from "@tanstack/react-table";
import TableCell from "@mui/material/TableCell/TableCell";
import CustomInput from "@ui/input";
import { FromSchemaType, TableSchemaType } from "./schema";
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormMessage,
  FormInputControl,
} from "@ui/form-material";

const columnHelper = createColumnHelper<TableSchemaType>();

// name cell
function InputCell(props: CellContext<TableSchemaType, unknown>) {
  const { control } = useFormContext<FromSchemaType>();

  const rowIndex = props.row.index;
  const columnId = props.column.id as keyof TableSchemaType;

  return (
    <FormField
      control={control}
      name={`row.${rowIndex}.${columnId}`}
      render={({ field }) => {
        return (
          <FormItem>
            <FormInputControl>
              <CustomInput {...field} />
            </FormInputControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}

function ActionCell(props: CellContext<TableSchemaType, unknown>) {
  // const { setValue, getValues } = useFormContext<FromSchemaType>();
  const rowId = props.row.original.id;
  const deleteRow = props.table.options.meta?.deleteRow;
  const addCopyRow = props.table.options.meta?.addCopyRow;

  return (
    <div className="flex gap-2">
      <button
        onClick={() => {
          deleteRow && deleteRow(rowId);
        }}
      >
        Delete
      </button>

      <button
        onClick={() => {
          addCopyRow && addCopyRow(rowId);
        }}
      >
        Copy
      </button>
    </div>
  );
}

/**
 * column definition
 */
const Columns = [
  // if the column will not be rendered on screen
  // but still need to be accessed from the table data
  columnHelper.accessor("id", {}),
  columnHelper.accessor("name", {
    header: () => <TableCell variant={"head"}>Name</TableCell>,
    cell: (props) => {
      return (
        <TableCell variant={"body"}>
          <InputCell {...props} />
        </TableCell>
      );
    },
  }),
  columnHelper.accessor("price", {
    header: () => <TableCell variant={"head"}>Price</TableCell>,
    cell: (props) => {
      return (
        <TableCell variant={"body"}>
          <InputCell {...props} />
        </TableCell>
      );
    },
  }),

  columnHelper.display({
    id: "action",
    header: () => <TableCell variant={"head"}>Action</TableCell>,
    cell: (props) => {
      return (
        <TableCell variant={"body"}>
          <ActionCell {...props} />
        </TableCell>
      );
    },
  }),
];

export default Columns;
