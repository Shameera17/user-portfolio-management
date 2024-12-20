"use client";

import React from "react";
import useSWR from "swr";
import { notFound } from "next/navigation";
import { ProgressIndicator } from "@/app/components/molecules/ProgressIndicator";
import Portfolio from "@/app/components/pages/UserPortfolio";
import { fetchUserPortfolio } from "../api/services/portfolioService";

interface PageProps {
  params: { username: string };
}

export default function Page({ params }: PageProps) {
  const { username } = params;

  const { data, error, isLoading } = useSWR(
    username ? `/api/portfolio?username=${username}` : null,
    () => fetchUserPortfolio(username)
  );

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

  if (error || !data) {
    notFound(); // Redirects to the 404 page.
  }

  return (
    <div>
      <Portfolio portfolio={data} />
    </div>
  );
}
