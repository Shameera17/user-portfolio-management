"use client";
import React from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form} from "@/components/ui/form";
import {TextArea, TextInput} from "../../molecules/TextInput";
import {PrimaryButton} from "../../atoms/Button";
// import {useUser} from "@/app/context/userContext";
import {toast} from "sonner";
// import useSWR from "swr";
// import {
//     fetchUserProfile,
//     updateUserProfile,
// } from "@/app/api/services/profileService";

export const ProjectSetting = () => {
    // const {user} = useUser();
    // const {updateUser} = useUser();
    const [isLoading, setIsLoading] = React.useState(false);


    const formSchema = z.object({
        projectName: z
            .string()
            .min(1, {message: "Project name is required"}),
        demoUrl: z.string().min(1, {message: "Demo URL is required"}),
        repositoryURL: z.string().min(1, {message: "Repository URL is required"}),
        description: z.string().min(1, {message: "Description is required"}),
    });

    type FormValues = z.infer<typeof formSchema>;

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {},

        // will get updated once values returns
    });

    const onSubmit = async (formData: FormValues) => {
        setIsLoading(true);
        try {
            // const { data: updatedUser } = await updateUserProfile(formData);
            // form.reset(updatedUser);
            // updateUser({
            //   name: updatedUser.name,
            //   email: updatedUser.email,
            // });
            toast.success("Profile update successful.");
        } catch (error) {
            toast.error("Profile update failed. Please try again.");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
       <>
           <Form {...form}>
               <form onSubmit={form.handleSubmit(onSubmit)}>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                       <TextInput
                           readonly
                           label="Project Name"
                           control={form.control}
                           type="text"
                           name="projectName"
                           placeholder="Enter your project name"
                       />
                       <TextInput
                           label="Demo URL"
                           control={form.control}
                           type="text"
                           name="demoUrl"
                           placeholder="Enter the demo URL"
                       />
                       <TextInput
                           label="Repository URL"
                           control={form.control}
                           type="text"
                           name="repositoryURL"
                           placeholder="Enter the repository URL"
                       />
                   </div>

                   <TextArea
                       label="Description"
                       control={form.control}
                       name="description"
                       placeholder="Enter a short introduction.."
                   />

                   <div className="flex justify-end">
                       <PrimaryButton
                           iconPath="/images/checkcircle-1.svg"
                           width="w-max"
                           isLoading={isLoading}
                           label="Add"
                           type="submit"
                       />
                   </div>
               </form>
           </Form>
       </>
    );
};
