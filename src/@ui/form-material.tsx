import { FormHelperText, InputLabel } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import { Slot } from '@radix-ui/react-slot';
import * as React from 'react';
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  FormProviderProps,
  useFormContext,
} from 'react-hook-form';

const Form = <
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues extends FieldValues | undefined = undefined
>({
  children,
  control,
  formRef,
  ...rest
}: React.HTMLAttributes<HTMLFormElement> & {
  formRef?: React.Ref<HTMLFormElement>;
  control: Omit<
    FormProviderProps<TFieldValues, TContext, TTransformedValues>,
    'children'
  >;
}) => {
  return (
    <FormProvider {...control}>
      <form ref={formRef} {...rest}>
        {children}
      </form>
    </FormProvider>
  );
};

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  id: string;
  name: TName;
  disabled?: boolean;
};

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  props.shouldUnregister;
  const id = React.useId();

  return (
    <FormFieldContext.Provider
      value={{
        id,
        name: props.name,
        disabled: props.disabled,
      }}
    >
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>');
  }
  const id = fieldContext.id;

  return {
    id,
    name: fieldContext.name,
    disabled: fieldContext.disabled,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

const FormItem = (props: React.ComponentProps<typeof FormControl>) => {
  const { disabled, error } = useFormField();

  const hasError = error && !disabled;

  return <FormControl disabled={disabled} error={hasError} {...props} />;
};

const FormLabel = (props: React.ComponentProps<typeof InputLabel>) => {
  const { formItemId } = useFormField();

  return <label htmlFor={formItemId} {...props} />;
};

const FormMessage = (props: React.ComponentProps<typeof FormHelperText>) => {
  const { formMessageId, disabled, error } = useFormField();

  const hasError = error && !disabled;
  const body = error ? String(error?.message) : props.children;

  if (!hasError) {
    return null;
  }

  return (
    <FormHelperText id={formMessageId} {...props}>
      {body}
    </FormHelperText>
  );
};

const FormInputControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  );
});

export { Form, FormField, FormItem, FormLabel, FormMessage, FormInputControl };
