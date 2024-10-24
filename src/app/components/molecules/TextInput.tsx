"use client";

import { useFormControl } from "@/app/utils/hooks/useFormControl";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { HTMLInputTypeAttribute, useState, useCallback } from "react";
import { Control, FieldValues, Path } from "react-hook-form";
import { Eye, EyeClosed } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

// Updated interface for better flexibility with generic types
interface IInputProps<T extends FieldValues> {
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  label?: string;
  control: Control<T>;
  name: Path<T>;
  disabled?: boolean;
  readonly?: boolean;
}

// Generic TextInput component
export function TextInput<T extends FieldValues>({
  type,
  placeholder,
  label,
  control,
  name,
  disabled,
  readonly,
}: IInputProps<T>) {
  const { field, error } = useFormControl({
    control,
    name,
  });

  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Input
          disabled={disabled}
          readOnly={readonly}
          type={type}
          placeholder={placeholder}
          {...field}
        />
      </FormControl>
      <FormMessage>{error?.message}</FormMessage>
    </FormItem>
  );
}
// Generic TextArea component
export function TextArea<T extends FieldValues>({
  placeholder,
  label,
  control,
  name,
}: IInputProps<T>) {
  const { field, error } = useFormControl({
    control,
    name,
  });

  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Textarea placeholder={placeholder} {...field} />
      </FormControl>
      <FormMessage>{error?.message}</FormMessage>
    </FormItem>
  );
}

// Generic PasswordInput component with toggle visibility feature
export function PasswordInput<T extends FieldValues>({
  placeholder,
  label,
  control,
  name,
}: IInputProps<T>) {
  const { field, error } = useFormControl({
    control,
    name,
  });

  const [showPassword, setShowPassword] = useState(false);

  // Use useCallback to avoid re-creating the function on each render
  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prevState) => !prevState);
  }, []);

  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder={placeholder}
            {...field}
          />
          {showPassword ? (
            <Eye
              className="absolute right-4 top-1.5 z-10 cursor-pointer "
              onClick={togglePasswordVisibility}
            />
          ) : (
            <EyeClosed
              className="absolute right-4 top-1.5 z-10 cursor-pointer "
              onClick={togglePasswordVisibility}
            />
          )}
        </div>
      </FormControl>
      <FormMessage>{error?.message}</FormMessage>
    </FormItem>
  );
}
