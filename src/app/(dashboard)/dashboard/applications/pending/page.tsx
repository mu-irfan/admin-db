"use client";

import React from "react";
import { useContextConsumer } from "@/context/Context";
import {
  useApproveApplication,
  useGetAllApplications,
  useRejectApplication,
} from "@/hooks/apis/useApplication";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { SweetAlert } from "@/components/alerts/SweetAlert";
import ApplicationDetails from "@/components/ui/Projects/ProjectDetail/ApplicationDetails";

export default function PendingProjects() {
  const {
    token,
    handleApplicationDetails,
    applicationDetails,
    showApplicationDetails,
  } = useContextConsumer();
  const { data: applications, isLoading } = useGetAllApplications(
    token,
    "pending"
  );
  const { mutate: approveApplication, isPending: approving } =
    useApproveApplication(token);
  const { mutate: rejectApplications, isPending: rejecting } =
    useRejectApplication(token);

  if (isLoading) {
    return (
      <h5 className="text-gray-500 text-center">Loading applications...</h5>
    );
  }

  if (!applications?.data || applications.data.length === 0) {
    return <h5 className="text-gray-500 text-center">No applications found</h5>;
  }

  console.log(applicationDetails, "applicationDetailsapplicationDetails");

  const handleApplicationApprove = async (uuid: any) => {
    const isConfirmed = await SweetAlert(
      "Approve Application?",
      "",
      "warning",
      "Yes, approve it!",
      "#15803D"
    );
    if (isConfirmed) {
      approveApplication(uuid);
    }
  };

  const handleApplicationReject = async (uuid: any) => {
    const isConfirmed = await SweetAlert(
      "Cancel Project?",
      "",
      "warning",
      "Yes, Cancel it!",
      "#15803D"
    );
    if (isConfirmed) {
      rejectApplications(uuid);
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-4 gap-2 p-10">
      {applications.data.map((application: any, index: number) => {
        const { project, status, createdAt } = application;

        let postedBy = "Unknown";
        let postedByDetails = null;
        if (project?.admin) {
          postedBy = "Admin";
        } else if (project?.employer) {
          postedBy = "Employer";
          postedByDetails = {
            name: project.employer.name || "N/A",
            organization: project.employer.organization || "N/A",
            email: project.employer.email || "N/A",
            phone: project.employer.phone || "N/A",
          };
        }

        return (
          <>
            {!showApplicationDetails ? (
              <Card
                key={application.uuid}
                className="w-[330px] sm:w-[350px] border border-gray-200 bg-white shadow-sm rounded-lg overflow-hidden"
              >
                <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 py-2 px-4 flex flex-row items-center justify-between">
                  <CardTitle className="text-xl text-white">
                    {index + 1}. Application ({project?.title || "N/A"})
                  </CardTitle>
                  <span
                    className={`px-2 py-1 text-sm font-medium rounded-md capitalize ${
                      status === "accepted"
                        ? "bg-green-500 text-white"
                        : status === "pending"
                        ? "bg-yellow-500 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {status}
                  </span>
                </CardHeader>
                <CardContent className="p-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">
                      Project:
                    </span>
                    <span className="text-gray-500">
                      {project?.title || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">Trade:</span>
                    <span className="text-gray-500">
                      {project?.trade || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">Sector:</span>
                    <span className="text-gray-500">
                      {project?.sector || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">
                      Applied On:
                    </span>
                    <span className="text-gray-500">{createdAt}</span>
                  </div>

                  {/* Posted By Section */}
                  <Separator className="my-3" />
                  <h3 className="text-lg font-semibold text-gray-700">
                    Posted By:
                  </h3>
                  {postedBy === "Admin" ? (
                    <span className="text-gray-500">Admin</span>
                  ) : postedBy === "Employer" ? (
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="font-semibold text-gray-700">
                          Name:
                        </span>
                        <span className="text-gray-500">
                          {postedByDetails?.name}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold text-gray-700">
                          Organization:
                        </span>
                        <span className="text-gray-500">
                          {postedByDetails?.organization}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold text-gray-700">
                          Email:
                        </span>
                        <span className="text-gray-500">
                          {postedByDetails?.email}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold text-gray-700">
                          Phone:
                        </span>
                        <span className="text-gray-500">
                          {postedByDetails?.phone}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <span className="text-gray-500">Unknown</span>
                  )}
                </CardContent>
                <CardFooter className="!pl-0 pr-4 flex justify-between">
                  <Button
                    variant="link"
                    className="text-primary hover:text-blue-800 font-medium"
                    onClick={() => handleApplicationDetails(application.uuid)}
                  >
                    View more Details <MoveRight className="inline pl-1" />
                  </Button>
                  <div className="flex gap-2 justify-end">
                    {application.status === "pending" && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          handleApplicationApprove(application.uuid)
                        }
                        className="bg-gray-200 font-medium my-1.5 px-2 py-0.5 text-xs"
                        disabled={approving}
                      >
                        {approving ? "Approving..." : "Approve"}
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleApplicationReject(application.uuid)}
                      className="bg-gray-200 font-medium my-1.5 px-2 py-0.5 text-xs"
                      disabled={rejecting}
                    >
                      {rejecting ? "Wait..." : "Cancel"}
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ) : (
              <ApplicationDetails />
            )}
          </>
        );
      })}
    </div>
  );
}
