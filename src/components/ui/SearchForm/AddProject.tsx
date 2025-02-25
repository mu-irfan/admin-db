import { Dialog, DialogContent } from "../dialog";
import AddProjectForm from "./AddProjectForm";

const AddProjectModal = ({ open, onOpenChange, onSearchSubmit }: any) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[80vw] sm:max-w-[500px] rounded-lg overflow-y-auto scrollbar-custom">
        <h2 className="text-3xl font-bold tracking-tight pb-6 text-gradient bg-gradient-to-r from-green-700 to-green-100 bg-clip-text text-transparent">
          Add Project
        </h2>
        <AddProjectForm
          onSearchSubmit={onSearchSubmit}
          onOpenChange={onOpenChange}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddProjectModal;
