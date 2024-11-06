"use client";
import React from "react";

import { Icon } from "../../atoms/Icon";
import { P2 } from "../../atoms/Typography";
import { UploadButton } from "../../atoms/Button";

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
    <div className="flex flex-col items-center gap-4 bg-[#F2F5F9] py-7">
      <input
        ref={fileInputRef}
        style={{ display: "none" }}
        type="file"
        onChange={handleFileChange}
      />

      {!previewUrl && (
        <Icon
          type={"avatar"}
          dimention={80}
          onClick={handleUploadClick}
          path={"/images/avatar-image.svg"}
        />
      )}
      {previewUrl && (
        <>
          <img
            src={previewUrl}
            alt="Preview"
            className="h-36 w-80  object-cover"
          />
          <UploadButton
            type="button"
            onClick={async () => {
              setPojectImage(null);
              setPreviewUrl(null);
            }}
            iconPath="/images/trash.svg"
            label="Remove Image"
            fontColor="#DD524C"
            width="w-max"
          />
        </>
      )}
      <P2 text="Image must be PNG or JPEG - max 2MB" />
    </div>
  );
};
