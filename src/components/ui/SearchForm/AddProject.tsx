import { Dialog, DialogContent } from "../dialog";
import AddProjectForm from "./AddProjectForm";

const AddProjectModal = ({ open, onOpenChange }: any) => {
  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-[80vw] sm:max-w-[500px] h-[90vh] lg:h-[95vh] overflow-y-auto scrollbar-custom">
          <h2 className="text-2xl font-bold tracking-tighter pb-6">
            Add Project
          </h2>
          <AddProjectForm onOpenChange={onOpenChange} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddProjectModal;
