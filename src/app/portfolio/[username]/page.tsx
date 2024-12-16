"use client";
import React from "react";
import useSWR, { mutate } from "swr";
import { fetchUserPortfolio } from "../../api/services/portfolioService";
import { useRouter } from "next/navigation";
import { ProgressIndicator } from "@/app/components/molecules/ProgressIndicator";
import Portfolio from "@/app/components/pages/UserPortfolio";

interface PageProps {
  params: { username: string };
}

export default function Page({ params }: PageProps) {
  const { username } = params;
  const router = useRouter();
  const { data, isLoading } = useSWR(
    username ? `/api/portfolio?username=${username}` : null,
    () => fetchUserPortfolio(username)
  );

  // Trigger mutate directly if required.
  if (!data && username) {
    mutate(`/api/user?email=${username}`);
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <ProgressIndicator
          initialValue={13}
          targetValue={66}
          duration={20}
          fillToFull={true}
          fullFillDelay={1000}
        />
      </div>
    );
  }

  if (!data) {
    router.replace("/404");
    return null;
  }

  return (
    <div>
      <Portfolio portfolio={data} />
    </div>
  );
}
