"use client";
import { useUser } from "@/app/context/userContext";
import React from "react";

export default function ProfilePage() {
  const { user } = useUser();
  if (!user) return <div>Loading...</div>;
  return <div>ProfilePage name{user?.name}</div>;
}
