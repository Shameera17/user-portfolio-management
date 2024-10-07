import React from "react";
import { Password } from "../atoms/TextInput";
import Link from "next/link";

interface InputGroupProps {
  placeholder: string;
  linkText: string;
  linkHref: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PasswordGroup: React.FC<InputGroupProps> = ({
  placeholder,
  linkText,
  linkHref,
  value,
  onChange,
}) => {
  return (
    <div>
      {/* Input Field */}
      <Password value={value} onChange={onChange} placeholder={placeholder} />
      {/* Forgot Password Link */}
      <Link
        className="text-sm text-blue-600 hover:underline flex justify-end right-2 top-3"
        href={linkHref}
      >
        {linkText}
      </Link>
    </div>
  );
};
