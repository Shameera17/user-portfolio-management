import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { P4 } from "./Typography";

export default function PasswordRequirement({
  label,
  isValid,
}: {
  label: string;
  isValid: boolean;
}) {
  return (
    <li className="flex items-center gap-2">
      <Avatar className="h-4 w-5">
        {!isValid ? (
          <AvatarImage src="/images/checkcircle-1.svg" />
        ) : (
          <AvatarImage src="/images/checkcircle.svg" />
        )}
      </Avatar>{" "}
      <P4 text={label} />
    </li>
  );
}
