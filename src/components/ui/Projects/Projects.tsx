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
import {
  useApproveProject,
  useDeleteProject,
  useRejectProject,
} from "@/hooks/apis/useProject";
import { useContextConsumer } from "@/context/Context";
import { SweetAlert } from "@/components/alerts/SweetAlert";
import UpdateProjectModal from "@/components/Forms/forms-modal/UpdateModal";
import { getStatusStyles } from "@/lib/helper";

interface ProjectsProps {
  projects: any[];
  onSeeMoreDetails: (id: string) => void;
}

const Projects: React.FC<ProjectsProps> = ({ projects, onSeeMoreDetails }) => {
  const { token } = useContextConsumer();
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const { mutate: approveProject, isPending: approving } =
    useApproveProject(token);
  const { mutate: rejectProject, isPending: rejecting } =
    useRejectProject(token);
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

  const handleProjectApprove = async (uuid: any) => {
    const isConfirmed = await SweetAlert(
      "Approve Project?",
      "",
      "warning",
      "Yes, approve it!",
      "#15803D"
    );
    if (isConfirmed) {
      approveProject(uuid);
    }
  };

  const handleProjectReject = async (uuid: any) => {
    const isConfirmed = await SweetAlert(
      "Cancel Project?",
      "",
      "warning",
      "Yes, Cancel it!",
      "#15803D"
    );
    if (isConfirmed) {
      rejectProject(uuid);
    }
  };

  const getPostedByDetails = (project: any) => {
    if (project.admin) {
      return {
        role: "Admin",
        name: `${project.admin.firstName} ${project.admin.lastName}`,
        email: project.admin.email,
      };
    } else if (project.employer) {
      return {
        role: "Employer",
        name: project.employer.name,
        email: project.employer.email,
        organization: project.employer.organization,
        phone: project.employer.phone,
      };
    }
    return { role: "Unknown" };
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

            const postedByDetails = getPostedByDetails(project);

            return (
              <Card
                key={project.uuid}
                className="w-[330px] sm:w-[350px] border border-gray-200 bg-white shadow-lg rounded-lg overflow-hidden"
              >
                <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 py-2 px-4 flex flex-row justify-between">
                  <CardTitle className="text-xl text-white">
                    Project Detail
                    <span
                      className={`px-2 py-1 text-sm font-medium rounded-md block w-fit capitalize ${getStatusStyles(
                        project.status
                      )}`}
                    >
                      {project.status}
                    </span>
                  </CardTitle>
                  <div>
                    {project.status !== "rejected" && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:text-blue-800"
                        onClick={() => handleEditClick(project)}
                      >
                        <Pencil className=" w-4 h-4" />
                      </Button>
                    )}
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

                  {postedByDetails.role === "Employer" && (
                    <>
                      <h3 className="font-semibold">Posted By:</h3>
                      <div className="text-gray-800 text-sm">
                        <p>Employer: {postedByDetails.name}</p>
                        <p>Organization: {postedByDetails.organization}</p>
                        <p>Email: {postedByDetails.email}</p>
                        <p>Phone: +92{postedByDetails.phone}</p>
                      </div>
                    </>
                  )}
                  <br />
                </CardContent>

                <CardFooter className="bg-gray-50 px-4 pb-4 md:pb-5 flex justify-between">
                  <Button
                    variant="link"
                    onClick={() => onSeeMoreDetails(project.uuid)}
                    className="text-primary hover:text-blue-800 font-medium !pl-0"
                  >
                    View more Details <MoveRight className="inline pl-1" />
                  </Button>
                  <div className="flex gap-2 justify-end">
                    {project.status === "pending" && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleProjectApprove(project.uuid)}
                        className="bg-gray-200 font-medium my-1.5 px-2 py-0.5 text-xs"
                        disabled={approving}
                      >
                        {approving ? "Approving..." : "Approve"}
                      </Button>
                    )}
                    {project.status !== "rejected" && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleProjectReject(project.uuid)}
                        className="bg-gray-200 font-medium my-1.5 px-2 py-0.5 text-xs"
                        disabled={rejecting}
                      >
                        {rejecting ? "Wait..." : "Cancel"}
                      </Button>
                    )}
                  </div>
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
