import TableContainer from "@mui/material/TableContainer/TableContainer";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import DataTable from "./DataTable";
import { useState } from "react";
import TableCell from "@mui/material/TableCell/TableCell";
import Box from "@mui/material/Box/Box";
import TablePagination from "@mui/material/TablePagination/TablePagination";

const mockData: Data[] = [
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

type Data = {
  id: string;
  name: string;
  phone: string;
  email: string;
  status: string;
};

const columnHelper = createColumnHelper<Data>();

/**
 * column definition
 */
const columns = [
  // if the column will not be rendered on screen
  // but still need to be accessed from the table data
  {
    accessorKey: "id",
  },
  columnHelper.accessor("name", {
    header: () => <TableCell variant={"head"}>Name</TableCell>,
    cell: (props) => (
      <TableCell variant={"body"}>{props.cell.getValue()}</TableCell>
    ),
  }),
  columnHelper.accessor("phone", {
    header: () => <TableCell variant={"head"}>Phone</TableCell>,
    cell: (props) => (
      <TableCell variant={"body"}>{props.cell.getValue()}</TableCell>
    ),
  }),
  columnHelper.accessor("email", {
    header: () => <TableCell variant={"head"}>Email</TableCell>,
    cell: (props) => (
      <TableCell variant={"body"}>{props.cell.getValue()}</TableCell>
    ),
  }),
  columnHelper.accessor("status", {
    header: () => <TableCell variant={"head"}>Status</TableCell>,
    cell: (props) => {
      return <TableCell variant={"body"}>{props.cell.getValue()}</TableCell>;
    },
  }),
];

function MyTable() {
  // data should be coming from API
  const [data] = useState<Data[]>(mockData);

  // page can be saved in url
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true, // enable manual pagination
    initialState: {
      columnVisibility: {
        id: false,
      },
    },
  });

  return (
    <div className="mt-4">
      <h2>Table</h2>

      <Box component="div" className="border border-1">
        <TableContainer component="div">
          <DataTable table={table} />
        </TableContainer>

        {/* add pagination as needed */}
        <TablePagination
          component="div"
          count={100}
          page={page}
          onPageChange={(_, page) => {
            setPage(page);
          }}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[10, 50, 100]}
          onRowsPerPageChange={(event) => {
            const value = event.target.value;
            console.log(value);
            setRowsPerPage(Number(value));
          }}
        />
      </Box>
    </div>
  );
}

export default MyTable;
