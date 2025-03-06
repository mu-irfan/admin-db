import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProjectDetailsProps {
  project: any;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project }) => {
  if (!project) return <p>No project details available</p>;

  const projectDetails = {
    Title: project.title,
    Trade: project.trade,
    Sector: project.sector,
    Description: project.description,
    Requirements: project.requirements,
    Tehsil: project.tehsil,
    District: project.district,
    Province: project.province,
    Duration: project.duration,
    "Start Date": project.startDate,
    "End Date": project.endDate,
    "Application Deadline": project.deadline,
    "Total Slots": project.totalSlots,
    Address: project.address,
    "Slots Filled": project.slotsFilled,
    Status: project.status,
  };

  return (
    <Card className="w-full sm:w-[440px] border border-gray-200 bg-white shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 py-2 px-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl text-white">Project Details</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-8 space-y-2">
        {Object.entries(projectDetails).map(([key, value]) => (
          <div key={key} className="flex justify-between">
            <span className="font-semibold text-gray-700">{key}:</span>
            <span className="text-gray-500">{value}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ProjectDetails;
