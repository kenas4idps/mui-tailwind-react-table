import { useForm, useFormContext } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Form,
  FormField,
  FormInputControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ui/form-material";
import { Button } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete/Autocomplete";
import CustomInput from "@ui/input";

export const FormSchema = yup.object().shape({
  name: yup.string().required("name is required"),
  email: yup
    .string()
    .email("your email is wrong")
    .required("email is required"),
  gender: yup.string().required("gender is required"),
});

export type FormSchemaType = yup.InferType<typeof FormSchema>;

const NestedUncontrolledInput = () => {
  const { register } = useFormContext<FormSchemaType>();

  // be default using register is the most straight forward with TextField
  return <CustomInput {...register("name")} />;
};

export const NestedControlledInput = () => {
  const { control } = useFormContext<FormSchemaType>();

  // if use control, need to use the generic component FormField
  // and also need to follow this field structure
  return (
    <FormField
      control={control}
      name={"email"}
      render={({ field }) => {
        return (
          <FormItem>
            {/* <div className="flex items-center"> */}
            <FormLabel>Email:</FormLabel>
            {/* <div> */}
            <FormInputControl>
              <CustomInput {...field} />
            </FormInputControl>
            <FormMessage />
            {/* </div> */}
            {/* </div> */}
          </FormItem>
        );
      }}
    />
  );
};

export default function FormProviderCaseMaterial() {
  const form = useForm<FormSchemaType>({
    defaultValues: {
      email: "", // because we use form control
    },
    // form validation by using zod schema
    resolver: yupResolver(FormSchema),
  });

  const onSubmit = form.handleSubmit((data) => {
    alert(data.name);
  });

  return (
    <Form
      onSubmit={onSubmit}
      control={form}
      id="form-id-test"
      className="flex flex-col"
    >
      <NestedUncontrolledInput />

      <NestedControlledInput />

      <FormField
        control={form.control}
        name={"gender"}
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel>Gender:</FormLabel>
              <FormInputControl>
                <Autocomplete
                  options={[
                    {
                      label: "Male",
                      value: "male",
                    },
                    {
                      label: "Female",
                      value: "female",
                    },
                  ]}
                  onChange={(_, item) => {
                    form.setValue(field.name, item?.value ?? "");
                  }}
                  renderInput={(params) => <CustomInput {...params} />}
                  renderOption={(props, option) => (
                    <li {...props} key={option.label}>
                      {option.label}
                    </li>
                  )}
                />
              </FormInputControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />

      <Button variant="contained" type="submit">
        Submit
      </Button>
    </Form>
  );
}
