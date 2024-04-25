import * as yup from "yup";

// option 1: create another type for data
// export type TableData = {
//   id: string;
//   name: string;
//   phone: string;
//   email: string;
//   status: string;
// };

// define the schema for the form
export const TableSchema = yup.object().shape({
  id: yup.string().required("id cannot be null"),
  name: yup.string().required("name is required"),
  price: yup.number().required("price is required"),
});

export const FormSchema = yup.object().shape({
  row: yup.array().of(TableSchema),
});

// option 2: use the table schema type for the data as well
export type TableSchemaType = yup.InferType<typeof TableSchema>;

export type FromSchemaType = yup.InferType<typeof FormSchema>;
