"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { Trash2 } from "lucide-react";

type DeleteDialogProps = {
  open: boolean;
  title: string;
  description: string;
  loading?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function DeleteDialog({
  open,
  title,
  description,
  loading = false,
  onCancel,
  onConfirm,
}: DeleteDialogProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!value) onCancel();
      }}
    >
      <DialogContent className="sm:max-w-md">

        <DialogHeader>

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">

            <Trash2 className="h-8 w-8 text-red-600" />

          </div>

          <DialogTitle className="mt-4 text-center">
            {title}
          </DialogTitle>

          <DialogDescription className="text-center">
            {description}
          </DialogDescription>

        </DialogHeader>

        <DialogFooter className="flex-row justify-center gap-3">

          <Button
            variant="outline"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </Button>

          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>

        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
}