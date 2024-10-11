import { Control, FieldValues, Path, useController } from "react-hook-form";

interface UseFormControlProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
}

export function useFormControl<T extends FieldValues>({
  control,
  name,
}: UseFormControlProps<T>) {
  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
  });

  return {
    field,
    error,
  };
}
