"use client";

import React, { useCallback, useEffect, useState } from "react";
import ProjectCard from "../molecules/ProjectCard/ProjectCard";
import { Portfolio } from "@/app/api/services/portfolioService";
import { Avatar } from "@/components/ui/avatar";
import { Icon } from "../atoms/Icon";
import { H3, P5 } from "../atoms/Typography";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

export default function UserPortfolio({
  portfolio: { projectList, user },
}: {
  portfolio: Portfolio;
}) {
  return (
    <div className="flex flex-col">
      {/* top */}
      <section className="relative mb-20">
        {/* Adjusted margin-bottom */}
        <img
          src="/images/profile-bg.svg"
          alt="profile-bg"
          className="w-full h-52 object-cover"
        />
        <div className="absolute top-[120px] left-1/3 transform -translate-x-1/3">
          <Avatar className="h-40 w-40 border-4 border-white rounded-full shadow-lg">
            <Icon
              type={"avatar"}
              dimention={160}
              path={user.avatarUrl ?? "/images/avatar-image-1.svg"}
            />
          </Avatar>
        </div>
      </section>
      <section className=" w-full sm:w-[592px] md:w-[720px] lg:w-[720px] mx-auto p-2 space-y-6">
        {/* user deets */}
        <div>
          <H3 text={user.name} className="text-[#364153] mb-1" />
          <P5 text={user.jobTitle} />
          <a href={`mailto:${user.email}`}>
            <Button variant={"outline"} className="text-[#364153] mt-5">
              <Mail /> Contact
            </Button>
          </a>
        </div>
        {/* bio */}
        <div>
          <P5 text={"Bio"} className="mb-1" />
          <P5 text={user.bio} className="text-black" />
        </div>
        {/* projects */}
        <div>
          <P5 text={"Projects"} className="mb-3" />
          <div className="space-y-4">
            {Array.isArray(projectList) &&
              projectList?.map((project) => (
                <ProjectCard isHide key={project.code} record={project} />
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
