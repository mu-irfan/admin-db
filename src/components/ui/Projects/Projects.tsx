import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MoveRight, Pencil, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDeleteProject } from "@/hooks/apis/useProject";
import { useContextConsumer } from "@/context/Context";
import { SweetAlert } from "@/components/alerts/SweetAlert";
import UpdateProjectModal from "@/components/Forms/forms-modal/UpdateModal";

interface ProjectsProps {
  projects: any[];
  onSeeMoreDetails: (id: string) => void;
}

const Projects: React.FC<ProjectsProps> = ({ projects, onSeeMoreDetails }) => {
  const { token } = useContextConsumer();
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const { mutate: deleteProject, isPending: deleting } =
    useDeleteProject(token);

  const handleEditClick = (project: any) => {
    setSelectedProject(project);
    setIsEditModalOpen(true);
  };

  const handleProjectDelete = async (uuid: any) => {
    const isConfirmed = await SweetAlert(
      "Delete Project?",
      "",
      "warning",
      "Yes, delete it!",
      "#15803D"
    );
    if (isConfirmed) {
      deleteProject(uuid);
    }
  };

  return (
    <>
      <div className="space-y-4">
        {projects &&
          projects.length > 0 &&
          projects.map((project) => {
            const projectDetails = {
              Title: project.title,
              Trade: project.trade,
              Sector: project.sector,
              Address: project.address,
              Tehsil: project.tehsil,
              District: project.district,
              Province: project.province,
              Duration: project.duration,
              "Start Date": project.startDate,
              "End Date": project.endDate,
              "Application Deadline": project.deadline,
              "Total Slots": project.totalSlots,
            };

            return (
              <Card
                key={project.uuid}
                className="w-[330px] sm:w-[350px] border border-gray-200 bg-white shadow-lg rounded-lg overflow-hidden"
              >
                <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 py-2 px-4">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-xl text-white">
                      Project Detail
                    </CardTitle>
                    <div className="flex">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:text-blue-800"
                        onClick={() => handleEditClick(project)}
                      >
                        <Pencil className=" w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:text-blue-800"
                        onClick={() => handleProjectDelete(project.uuid)}
                        disabled={deleting}
                      >
                        <Trash className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 space-y-2">
                  {Object.entries(projectDetails).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="font-semibold text-gray-700">
                        {key}:
                      </span>
                      <span className="text-gray-500">{value}</span>
                    </div>
                  ))}
                </CardContent>
                <CardFooter className="bg-gray-50 px-4 pb-4 md:pb-5">
                  <Button
                    variant="link"
                    onClick={() => onSeeMoreDetails(project.uuid)}
                    className="text-primary hover:text-blue-800 font-medium !pl-0"
                  >
                    View more Details <MoveRight className="inline pl-1" />
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
      </div>
      <UpdateProjectModal
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        project={selectedProject}
      />
    </>
  );
};

export default Projects;
