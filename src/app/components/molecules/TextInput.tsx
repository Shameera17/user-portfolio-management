"use client";

import { useFormControl } from "@/app/utils/hooks/useFormControl";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  HTMLInputTypeAttribute,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { Control, FieldValues, Path } from "react-hook-form";
import { Eye, EyeClosed } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Sapling } from "@saplingai/sapling-js/observer";
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
        <Textarea
          contentEditable="true"
          id="editor"
          sapling-ignore="true"
          placeholder={placeholder}
          {...field}
        />
      </FormControl>
      <FormMessage>{error?.message}</FormMessage>
    </FormItem>
  );
}
export function SaplingTextArea<T extends FieldValues>({
  placeholder,
  label,
  control,
  name,
}: IInputProps<T>) {
  const { field, error } = useFormControl({
    control,
    name,
  });
  const editorRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    Sapling.init({
      key: "SXQZ6J4AJMYXAIHOWEX8GJMOAWNW4OD1",
      endpointHostname: "https://api.sapling.ai",
      editPathname: "/api/v1/edits",
      statusBadge: true,
      mode: "dev",
    });

    const editor = document.getElementById("editor");
    Sapling.observe(editor!);
  });
  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Textarea
          contentEditable="true"
          id="editor"
          sapling-ignore="true"
          placeholder={placeholder}
          {...field}
          ref={editorRef}
        />
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
