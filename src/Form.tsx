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
import {
  Button,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormGroup,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete/Autocomplete";
import CustomInput from "@ui/input";

export const FormSchema = yup.object().shape({
  name: yup.string().required("name is required"),
  email: yup
    .string()
    .email("your email is wrong")
    .required("email is required"),
  gender: yup.string().required("gender is required"),
  single: yup.boolean().required("single is required"),
  driveLane: yup.mixed().oneOf(["left", "right"]).required("lane is required"),
  sideDishes: yup.object().shape({
    tomato: yup.boolean(),
    raddish: yup.boolean(),
  }),
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
    <>
      <FormField
        control={control}
        name={"email"}
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel>Email:</FormLabel>
              <FormInputControl>
                <CustomInput {...field} />
              </FormInputControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />

      <FormField
        control={control}
        name={"single"}
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel>Single:</FormLabel>
              <FormInputControl>
                <RadioGroup {...field}>
                  <FormControlLabel
                    label={"Yes"}
                    control={<Radio />}
                    value={true}
                  />
                  <FormControlLabel
                    label={"No"}
                    control={<Radio />}
                    value={false}
                  />
                </RadioGroup>
              </FormInputControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />

      <FormField
        control={control}
        name={"driveLane"}
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel>Drive Lane:</FormLabel>
              <FormInputControl>
                <RadioGroup {...field}>
                  <FormControlLabel
                    label={"Right"}
                    control={<Radio />}
                    value={"right"}
                  />
                  <FormControlLabel
                    label={"Left"}
                    control={<Radio />}
                    value={"left"}
                  />
                </RadioGroup>
              </FormInputControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />

      <FormField
        control={control}
        name={"sideDishes"}
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel>Single:</FormLabel>
              <FormInputControl>
                <FormGroup>
                  <FormControlLabel
                    label={"Tomato"}
                    control={<Checkbox />}
                    name={field.name + ".tomato"}
                  />
                  <FormControlLabel
                    label={"Raddish"}
                    control={<Checkbox />}
                    name={field.name + ".radish"}
                  />
                </FormGroup>
              </FormInputControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />
    </>
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
                {/* custom input control implementation */}
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
