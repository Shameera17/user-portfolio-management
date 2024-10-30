"use client";
import React from "react";
import {ref, uploadBytes, getDownloadURL, deleteObject} from "firebase/storage";
import {storage} from "@/app/firebaseConfig";
import {Icon} from "../../atoms/Icon";
import {UploadButton} from "../../atoms/Button";
import {P2} from "../../atoms/Typography";
import {
    deleteUserImage,
    updateUserImage,
} from "@/app/api/services/profileService";
import {useUser} from "@/app/context/userContext";

export const AvatarUpload = () => {
    const [file, setFile] = React.useState<File | null>(null);
    const [uploading, setUploading] = React.useState(false);
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const {user, updateUserAvatar} = useUser();
    const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);

    const handleUploadClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreviewUrl(URL.createObjectURL(selectedFile));
        }
    };
    const handleUpload = async () => {
        if (!file) return;
        if (!user?.email) return;
        setUploading(true);
        const filePath = `images/${file.name}`;
        const storageRef = ref(storage, filePath);
        try {
            await uploadBytes(storageRef, file);
            const url = await getDownloadURL(storageRef);
            await updateUserImage({
                email: user.email!,
                avatarUrl: url,
                avatarPath: filePath,
            }).then(() => {
                updateUserAvatar(url, filePath);
            });
            console.log("file uploaded successfully");
        } catch (error) {
            console.log("error uploading the file");
        } finally {
            setUploading(false);
        }
    };
    return (
        <div className="flex flex-col items-center gap-4 bg-[#F2F5F9] py-7">
            <input
                ref={fileInputRef}
                style={{display: "none"}}
                type="file"
                onChange={handleFileChange}
            />

            <Icon
                type={"avatar"}
                dimention={80}
                onClick={handleUploadClick}
                // Display previewUrl if available, otherwise fallback to user?.avatarUrl or default image
                path={previewUrl ?? user?.avatarUrl ?? "/images/avatar-image.svg"}
            />
            <P2 text="Image must be PNG or JPEG - max 2MB"/>
            <div className="flex gap-3">
                <UploadButton
                    disabled={!file}
                    type="button"
                    onClick={handleUpload}
                    isLoading={uploading}
                    iconPath="/images/upload.svg"
                    label={"Upload Image"}
                    fontColor="#20293A"
                    width="w-max"
                />
                <UploadButton
                    disabled={!user?.avatarPath && !user?.avatarUrl}
                    type="button"
                    onClick={async () => {
                        if (!user?.email) return;
                        if (user.avatarUrl && user.avatarPath) {
                            const storageRef = ref(storage, user.avatarPath);
                            await deleteObject(storageRef);
                        }
                        await deleteUserImage(user.email!).then(() => {
                            updateUserAvatar(null, null);
                        });
                    }}
                    isLoading={uploading}
                    iconPath="/images/trash.svg"
                    label="Delete Image"
                    fontColor="#DD524C"
                    width="w-max"
                />
            </div>
        </div>
    );
};
