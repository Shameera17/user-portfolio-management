"use server";

import { connect } from "@/db/config";
import User from "@/db/models/UserModel";

function generateUsername(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with dashes
    .replace(/^-+|-+$/g, ""); // Trim leading/trailing dashes
}

export async function ensureUniqueUsername(baseName: string) {
  connect();
  let username = generateUsername(baseName);
  let count = 0;

  while (true) {
    const existingUser = await User.findOne({ username });
    if (!existingUser) break;
    count++;
    username = `${generateUsername(baseName)}${count}`;
  }

  return username;
}
