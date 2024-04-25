import TableContainer from "@mui/material/TableContainer/TableContainer";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import DataTable from "../../DataTable";
import { useState } from "react";
import Box from "@mui/material/Box/Box";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form } from "@ui/form-material";
import { FormSchema, FromSchemaType } from "./schema";
import { v4 as uuidv4 } from "uuid";
import Columns from "src/components/MyTableForm/columns";

const mockData = [
  {
    id: "1",
    name: "John Doe",
    phone: "123",
    email: "johndoe@email.com",
    status: "pending",
  },
  {
    id: "2",
    name: "John Doe",
    phone: "123",
    email: "johndoe@email.com",
    status: "success",
  },
  {
    id: "3",
    name: "John Doe",
    phone: "123",
    email: "johndoe@email.com",
    status: "failed",
  },
];

function MyTableForm() {
  const [isEditable, setIsEditable] = useState(true);

  const form = useForm<FromSchemaType>({
    defaultValues: {
      // mockData should be coming from API or can be passed down from props
      row: mockData, // because we use form control we have to put default values
    },
    // form validation by using zod schema
    resolver: yupResolver(FormSchema),

    // 👇 put the disabled value directly on the useForm hook
    disabled: !isEditable,
  });

  const onSubmit = form.handleSubmit((data) => {
    console.log(data);
  });

  const table = useReactTable({
    data: form.watch("row") ?? [],
    columns: Columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true, // enable manual pagination
    initialState: {
      columnVisibility: {
        id: false,
      },
    },
    /**
     * meta is a global context that can be used by each cell
     */
    meta: {
      // Implementation of each function may vary depending on use-case
      // 👇 below are just examples of such implementation
      deleteRow: (rowId) => {
        // the order matters
        // get new data first
        // const newData = data.filter((obj) => obj.id !== rowId);
        const prevData = form.getValues("row") ?? [];
        const newData = prevData.filter((obj) => obj.id !== rowId);

        // then set the new data
        // setData(newData);
        form.setValue("row", newData);
      },

      addCopyRow: (rowId) => {
        const prevData = form.getValues("row") ?? [];
        const selectedRow = prevData.find((obj) => obj.id === rowId);
        if (!selectedRow) return;

        const newData = [
          ...prevData,
          {
            ...selectedRow,
            id: uuidv4(),
          },
        ];

        form.setValue("row", newData);
      },
    },
  });

  return (
    <div className="my-8 border pt-4">
      <h2>Form Table</h2>

      <div className="flex px-4 mb-4">
        <button
          className="ml-auto border p-2 rounded-md"
          onClick={() => {
            setIsEditable((prev) => !prev);
          }}
        >
          Edit Form
        </button>
        <button className="ml-2 border p-2 rounded-md" onClick={onSubmit}>
          Submit Form
        </button>
      </div>
      <Box component="div" className="border border-1">
        <TableContainer component="div">
          <Form
            control={form}
            id="form-id-test"
            className="flex flex-col"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <DataTable table={table} />
            <div
              className="bg-gray-500 text-left p-4 text-white cursor-pointer selection:bg-none"
              onClick={() => {
                const prevData = form.getValues("row") ?? [];
                const newData = [
                  ...prevData,
                  {
                    id: uuidv4(),
                    name: "",
                    phone: "",
                    email: "",
                    status: "pending",
                  },
                ];

                form.setValue("row", newData);
                // setData(newData);
              }}
            >
              add new row
            </div>
          </Form>
        </TableContainer>
      </Box>
    </div>
  );
}

export default MyTableForm;
