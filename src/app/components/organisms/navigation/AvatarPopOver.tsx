import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/app/context/userContext";
import { H2, P1, P2 } from "../../atoms/Typography";
import Image from "next/image";
import { Icon } from "../../atoms/Icon";

export function AvatarPopOver() {
  const { user } = useUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup className="flex gap-2">
          <DropdownMenuItem>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex flex-col items-start">
            <H2 fontSize="14px" text={user?.name ?? ""} />
            <P2 text={user?.email ?? ""} />
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        {/* account */}
        <DropdownMenuGroup>
          <P2 text={"Account"} />
          <DropdownMenuItem>
            <Icon path="/images/profile-2.svg" />
            <span>Profile Settings</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Icon path="/images/multiple image-1.svg" />
            <span>Project Settings</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Icon path="/images/airplay.svg" />
            <span>My Portfolio</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        {/* log out */}
        <DropdownMenuItem>
          <LogOut />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
