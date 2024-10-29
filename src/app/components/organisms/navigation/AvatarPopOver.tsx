import { LogOut } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar } from "@/components/ui/avatar";
import { useUser } from "@/app/context/userContext";
import { H2, P2 } from "../../atoms/Typography";
import { Icon } from "../../atoms/Icon";
import { useEffect } from "react";
import { fetchUserImage } from "@/app/api/services/profileService";

export function AvatarPopOver() {
  const { user, updateUserAvatar } = useUser();
  const getUserAvatar = async (email: string) => {
    const response = await fetchUserImage(email);
    if (response.data.avatarUrl) {
      updateUserAvatar(response.data.avatarUrl);
    }
  };
  useEffect(() => {
    if (user?.email) {
      getUserAvatar(user?.email);
    }
  }, [user?.email]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <Icon
            type={"avatar"}
            dimention={52}
            path={user?.avatarUrl ?? "/images/avatar-image-1.svg"}
          />
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup className="flex gap-2">
          <DropdownMenuItem>
            <Avatar>
              <Icon
                type={"avatar"}
                dimention={52}
                path={user?.avatarUrl ?? "/images/avatar-image-1.svg"}
              />
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
