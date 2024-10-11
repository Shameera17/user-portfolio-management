import { useFormControl } from "@/app/utils/hooks/useFormControl";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { HTMLInputTypeAttribute } from "react";
import { Control, FieldValues, Path } from "react-hook-form";

// Update the interface to accept generic types for better flexibility
interface IInputProps<T extends FieldValues> {
  type?: HTMLInputTypeAttribute | undefined;
  placeholder?: string;
  label?: string;
  control: Control<T>;
  name: Path<T>; // Updated to use Path<T> from react-hook-form
}

// Make the component generic
export function TextInput<T extends FieldValues>(props: IInputProps<T>) {
  const { field, error } = useFormControl({
    control: props.control,
    name: props.name,
  });
  return (
    <FormItem>
      <FormLabel>{props.label}</FormLabel>
      <FormControl>
        <Input type={props.type} placeholder={props.placeholder} {...field} />
      </FormControl>
      <FormMessage>{error?.message}</FormMessage>
    </FormItem>
  );
}
