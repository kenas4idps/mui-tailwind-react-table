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
import Columns from "./columns";

const mockData = [
  {
    id: "1",
    name: "John Doe",
    price: 123,
  },
  {
    id: "2",
    name: "John Doe",
    price: 123,
  },
  {
    id: "3",
    name: "John Doe",
    price: 123,
  },
];

function MyTableForm() {
  // data should be coming from API
  // const [data, setData] = useState<TableSchemaType[]>(mockData);

  const [isEditable, setIsEditable] = useState(true);

  const form = useForm<FromSchemaType>({
    defaultValues: {
      row: mockData, // because we use form control
    },
    disabled: !isEditable,
    // form validation by using zod schema
    resolver: yupResolver(FormSchema),
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
    meta: {
      isEditable: isEditable,
      deleteRow: (rowId) => {
        console.log(rowId);
        // the order matters
        // get new data first
        // const newData = data.filter((obj) => obj.id !== rowId);
        const prevData = form.getValues("row") ?? [];
        const newData = prevData.filter((obj) => obj.id !== rowId);

        console.log(prevData);
        console.log(newData);
        // then set the new data
        // setData(newData);
        form.setValue("row", newData);
      },

      addCopyRow: (rowId) => {
        const prevData = form.getValues("row") ?? [];
        const selectedRow = prevData.find((obj) => obj.id === rowId);

        console.log(rowId);

        if (!selectedRow) return;

        console.log(prevData);
        console.log(selectedRow);

        const newId = uuidv4();
        const newData = [
          ...prevData,
          {
            ...selectedRow,
            id: newId,
          },
        ];

        console.log(newData);

        form.setValue("row", newData);
      },
    },
  });

  return (
    <div className="my-8 border pt-4">
      <h2>Form Table B</h2>

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
                    price: 0,
                  },
                ];

                form.setValue("row", newData);
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
