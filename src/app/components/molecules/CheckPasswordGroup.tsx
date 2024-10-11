import React, { useMemo } from "react";
import PasswordRequirement from "../atoms/PasswordRequirement";

export default function CheckPasswordGroup({ password }: { password: string }) {
  const {
    hasLowerCase,
    hasUpperCase,
    hasNumber,
    hasSpecialChar,
    hasMinLength,
  } = useMemo(() => {
    const hasLowerCase = /[a-z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasMinLength = password.length >= 8;
    return {
      hasLowerCase,
      hasUpperCase,
      hasNumber,
      hasSpecialChar,
      hasMinLength,
    };
  }, [password]);

  return (
    <ul className=" grid grid-cols-2 gap-2">
      <PasswordRequirement
        label="One lower case character"
        isValid={hasLowerCase}
      />
      <PasswordRequirement
        label="One upper case character"
        isValid={hasUpperCase}
      />
      <PasswordRequirement label="One number" isValid={hasNumber} />
      <PasswordRequirement
        label="One special character"
        isValid={hasSpecialChar}
      />
      <PasswordRequirement label="8 character minimum" isValid={hasMinLength} />
    </ul>
  );
}
