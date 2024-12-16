export interface User {
  name: string;
  email: string;
  token?: string;
  avatarUrl?: string | null;
  avatarPath?: string | null;
  username?: string | null;
}
