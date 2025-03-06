"use client";

import React from "react";
import { useContextConsumer } from "@/context/Context";
import { useGetAllApplications } from "@/hooks/apis/useApplication";
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

export default function RejectedApplications() {
  const { token } = useContextConsumer();
  const { data: applications, isLoading } = useGetAllApplications(
    token,
    "rejected"
  );
  console.log(applications, "applicaitonsapplicaitons");

  if (isLoading) {
    return (
      <h5 className="text-gray-500 text-center">Loading applications...</h5>
    );
  }

  if (!applications?.data || applications.data.length === 0) {
    return <h5 className="text-gray-500 text-center">No applications found</h5>;
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-5">
      {applications.data.map((application: any, index: number) => {
        const { project, status, createdAt } = application;

        return (
          <div className="px-8 pt-8" key={application.uuid}>
            <div className="space-y-0.5">
              <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                Applications
              </h1>
              <p className="text-muted-foreground">Manage applications</p>
            </div>
            <Separator className="my-4 lg:my-6" />
            <div className="flex flex-1 flex-col space-y-2 overflow-hidden md:space-y-2 lg:flex-row lg:space-x-10 lg:space-y-0">
              <div className="flex w-full overflow-y-hidden p-1 pr-4">
                <Card className="w-[330px] sm:w-[350px] border border-gray-200 bg-white shadow-sm rounded-lg overflow-hidden">
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
                      <span className="font-semibold text-gray-700">
                        Trade:
                      </span>
                      <span className="text-gray-500">
                        {project?.trade || "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-700">
                        Sector:
                      </span>
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
                  </CardContent>
                  <CardFooter className="!pl-0 pr-4 flex justify-between">
                    <Button
                      variant="link"
                      className="text-primary hover:text-blue-800 font-medium"
                      onClick={() =>
                        console.log("Viewing details for", application.uuid)
                      }
                    >
                      View more Details <MoveRight className="inline pl-1" />
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
