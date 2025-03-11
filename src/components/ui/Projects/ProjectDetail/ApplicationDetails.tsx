import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useContextConsumer } from "@/context/Context";
import { Separator } from "@/components/ui/separator";

const ApplicationDetails: React.FC = () => {
  const { applicationDetails, setShowApplicationDetails } =
    useContextConsumer();

  if (!applicationDetails || !("data" in applicationDetails)) {
    return <p>No application details available</p>;
  }

  const application = applicationDetails.data as ApplicationData;
  const project = application.project;

  const applicationInfo = {
    Status: application.status,
    "Applied On": application.createdAt,
  };

  const projectDetails = {
    Title: project.title,
    Trade: project.trade,
    Sector: project.sector,
    Description: project.description,
    Requirements: project.requirements,
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

  const postedBy = project.admin
    ? "Admin"
    : project.employer
    ? "Employer"
    : "Unknown";

  const postedByDetails = project.employer
    ? {
        Name: project.employer.name || "N/A",
        Organization: project.employer.organization || "N/A",
        Email: project.employer.email || "N/A",
        Phone: project.employer.phone || "N/A",
      }
    : null;

  return (
    <div className="flex flex-col p-6">
      <Card className="w-full sm:w-[440px] border border-gray-200 bg-white shadow-lg rounded-lg overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 py-2 px-4">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl text-white">
              Application Details
            </CardTitle>
            <span
              className={`px-2 py-1 text-sm font-medium rounded-md capitalize ${
                application.status === "accepted"
                  ? "bg-green-500 text-white"
                  : application.status === "pending"
                  ? "bg-yellow-500 text-white"
                  : "bg-red-500 text-white"
              }`}
            >
              {application.status}
            </span>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">
            Application Details
          </h3>
          {Object.entries(applicationInfo).map(([key, value]) => (
            <div key={key} className="flex justify-between">
              <span className="font-semibold text-gray-700">{key}:</span>
              <span className="text-gray-500">{value}</span>
            </div>
          ))}

          <Separator className="my-4" />

          <h3 className="text-lg font-semibold text-gray-700">
            Project Details
          </h3>
          {Object.entries(projectDetails).map(([key, value]) => (
            <div key={key} className="flex justify-between w-full">
              <span className="font-semibold text-gray-700">{key}:</span>
              {key === "Description" || key === "Requirements" ? (
                <span className="text-gray-500 text-sm pl-2 block w-full break-words whitespace-pre-wrap max-h-40 overflow-y-auto scrollbar-custom">
                  {value}
                </span>
              ) : (
                <span className="text-gray-500">{value}</span>
              )}
            </div>
          ))}

          <Separator className="my-4" />

          <h3 className="text-lg font-semibold text-gray-700">Posted By</h3>
          {postedBy === "Admin" ? (
            <span className="text-gray-500">Admin</span>
          ) : postedBy === "Employer" ? (
            Object.entries(postedByDetails!).map(([key, value]) => (
              <div key={key} className="flex justify-between">
                <span className="font-semibold text-gray-700">{key}:</span>
                <span className="text-gray-500">{value}</span>
              </div>
            ))
          ) : (
            <span className="text-gray-500">Unknown</span>
          )}
        </CardContent>
      </Card>
      <Button
        variant="outline"
        className="mt-6 w-fit"
        onClick={() => setShowApplicationDetails(false)}
      >
        Back to Applications
      </Button>
    </div>
  );
};

export default ApplicationDetails;
