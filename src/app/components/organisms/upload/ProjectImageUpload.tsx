"use client";
import React from "react";

import { Icon } from "../../atoms/Icon";
import { P2 } from "../../atoms/Typography";
import Image from "next/image";
export const ProjectImageUpload = ({
  file,
  setPojectImage,
}: {
  file: File | null;
  setPojectImage: (file: File | null) => void;
}) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(
    file ? URL.createObjectURL(file) : null
  );

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setPojectImage(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  return (
    <div className="flex flex-col items-center gap-3 bg-[#F2F5F9] py-2">
      <input
        ref={fileInputRef}
        style={{ display: "none" }}
        type="file"
        onChange={handleFileChange}
      />

      {!previewUrl && (
        <Icon
          type={"avatar"}
          dimention={90}
          onClick={handleUploadClick}
          path={"/images/avatar-image.svg"}
        />
      )}
      {previewUrl && (
        <div className="relative inline-block">
          {/* Image */}
          <Image
            src={previewUrl}
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "auto", height: "100px" }}
            alt="Preview"
            className="h-36 w-80 object-contain rounded-lg"
          />

          {/* Trash Icon */}
          <Icon
            type="avatar"
            dimention={20}
            onClick={async () => {
              setPojectImage(null);
              setPreviewUrl(null);
            }}
            path="/images/trash.svg"
            className="absolute top-2 right-2 cursor-pointer bg-white shadow-inner bg-blend-normal hover:shadow-lg rounded-full p-0.5"
          />
        </div>
      )}
      <P2 text="Image must be PNG or JPEG - max 2MB" />
    </div>
  );
};
