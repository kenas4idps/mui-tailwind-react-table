import * as yup from "yup";

/**
 * Define the schema for the form:
 * The schema needs to be the same with the DTO from api.
 * Each field needs to have a validation rule.
 * Additionally you can add new field for passing case specific information. (rare case)
 * Best to put all field that is required for the form submission.
 */
export const TableSchema = yup.object().shape({
  id: yup.string().required("id cannot be null"),
  name: yup.string().required("name is required"),
  phone: yup.string().required("phone is required"),
  email: yup
    .string()
    .email("your email is wrong")
    .required("email is required"),
  status: yup.string().required("status is required"),
});

export const FormSchema = yup.object().shape({
  row: yup.array().of(TableSchema),
});

// option 2: use the table schema type for the data as well
export type TableSchemaType = yup.InferType<typeof TableSchema>;

export type FromSchemaType = yup.InferType<typeof FormSchema>;
