import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { ReactNode } from "react";
import useMediaQuery from "@/app/utils/hooks/useMediaQuery";

export function Modal({
  children,
  title,
  description,
  open,
  setOpen,
}: {
  children: ReactNode;
  title: string;
  description?: string;
  setOpen: (open: boolean) => void;
  open: boolean;
}) {
  const isDesktop = true;
  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[95vh] rounded-lg ">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <div className=" max-h-[70vh] overflow-y-auto">{children}</div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer
      open={open}
      onOpenChange={setOpen}
      fadeFromIndex={1}
      snapPoints={[0.9, 1]}
    >
      <DrawerContent className="max-h-[100vh]">
        <DrawerHeader className="text-left">
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>
        <div className="overflow-y-auto">{children}</div>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="default">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
