import { CellContext, createColumnHelper } from "@tanstack/react-table";
import TableCell from "@mui/material/TableCell/TableCell";
import CustomInput from "@ui/input";
import {
  FromSchemaType,
  TableSchemaType,
} from "src/components/MyTableForm/schema";
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormMessage,
  FormInputControl,
} from "@ui/form-material";

const columnHelper = createColumnHelper<TableSchemaType>();

// name cell
function InputCell(props: CellContext<TableSchemaType, string>) {
  const { control } = useFormContext<FromSchemaType>();

  const rowIndex = props.row.index;
  const columnId = props.column.id as keyof TableSchemaType;

  return (
    <FormField
      control={control}
      /** if disabled props is filled with boolean it will create a warning that breaks the app
       * see discussion 👉 https://github.com/orgs/react-hook-form/discussions/10964
       * so instead put the disabled value directly on the useForm hook inside index.tsx
       */
      // disabled={!isEditable}
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

  return (
    <div className="flex gap-2">
      <button
        onClick={() => {
          deleteRow && deleteRow(rowId);
        }}
      >
        Delete
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

  /**
   * The order of the column definition matters.
   * The order of the column definition will be the order of the column in the table.
   */
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
  columnHelper.accessor("phone", {
    header: () => <TableCell variant={"head"}>Phone</TableCell>,
    cell: (props) => {
      return (
        <TableCell variant={"body"}>
          <InputCell {...props} />
        </TableCell>
      );
    },
  }),
  columnHelper.accessor("email", {
    header: () => <TableCell variant={"head"}>Email</TableCell>,
    cell: (props) => {
      return (
        <TableCell variant={"body"}>
          <InputCell {...props} />
        </TableCell>
      );
    },
  }),
  columnHelper.accessor("status", {
    header: () => <TableCell variant={"head"}>Status</TableCell>,
    cell: (props) => {
      return (
        <TableCell variant={"body"}>
          <InputCell {...props} />
        </TableCell>
      );
    },
  }),

  /**
   * You can define a display column that is not part of the data schema.
   * This column will be used for action buttons or other display purposes.
   */
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
