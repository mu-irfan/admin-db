import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import UpdateProjectForm from "../UpdateProjectForm";

const UpdateProjectModal = ({ open, onOpenChange, project }: any) => {
  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-[80vw] md:max-w-xl lg:max-w-2xl">
          <DialogHeader className="mt-8 mb-4 md:flex-row items-center justify-between">
            <div>
              <DialogTitle className="text-primary text-xl font-bold">
                Update Project
              </DialogTitle>
              <DialogDescription className="!dark:text-farmacieLightGray">
                Update Project
              </DialogDescription>
            </div>
          </DialogHeader>
          <UpdateProjectForm project={project} onClose={onOpenChange} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UpdateProjectModal;
