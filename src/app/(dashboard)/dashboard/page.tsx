"use client";

import AdminStatsDashboard from "@/components/charts/AdminStatsDashboard";
import ApplicationStatsDashboard from "@/components/charts/ApplicationStatsDashboard";
import { BarChartMultiple } from "@/components/charts/Bar";
import { Component } from "@/components/charts/Chart";
import { PieCharts } from "@/components/charts/Pie";
import ProjectStatsDashboard from "@/components/charts/ProjectStatsDashboard";
import { Radial } from "@/components/charts/Radial";
import StatsDashboard from "@/components/charts/Stats";
import { DownloadButton } from "@/components/ui/DownloadReportButton";
import { useContextConsumer } from "@/context/Context";
import {
  useStudentStats,
  useAdminStats,
  useProjectStats,
  useApplicationStats,
} from "@/hooks/apis/useStats";
import { Toaster } from "react-hot-toast";

export default function Dashboard() {
  const { token } = useContextConsumer();

  const { data: studentStats } = useStudentStats(token);
  const { data: adminStats } = useAdminStats(token);
  const { data: projectStats } = useProjectStats(token);
  const { data: applicationStats } = useApplicationStats(token);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <main className="w-full min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
          <section id="students-section">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">
                👨‍🎓 Student Overview
              </h2>
              <DownloadButton
                targetId="students-section"
                fileName="student-overview"
              />
            </div>
            <StatsDashboard studentStats={studentStats?.data} />
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
              <Radial
                title="By Province"
                description="Students grouped by province"
                data={studentStats?.data?.byProvince}
              />
              <Component genderStats={studentStats?.data?.byGender} />
              <Radial
                title="By District"
                description="Students grouped by district"
                data={studentStats?.data?.byDistrict}
              />
            </div>
          </section>

          <section id="admins-section">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">
                🛡️ Admin Overview
              </h2>
              <DownloadButton
                targetId="admins-section"
                fileName="admin-overview"
              />
            </div>
            <AdminStatsDashboard adminStats={adminStats?.data} />
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
              <PieCharts
                title="Admins by Role"
                description="Distribution of admins by their role"
                data={adminStats?.data?.byRole}
              />
              <PieCharts
                title="Admins by Gender"
                description="Distribution of admins by gender"
                data={adminStats?.data?.byGender}
              />
              <Radial
                title="By Province"
                description="Admins grouped by province"
                data={adminStats?.data?.byProvince}
              />
              <Radial
                title="By District"
                description="Admins grouped by district"
                data={adminStats?.data?.byDistrict}
              />
            </div>
          </section>

          <section id="projects-section">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">
                📁 Projects Overview
              </h2>
              <DownloadButton
                targetId="projects-section"
                fileName="project-overview"
              />
            </div>
            <ProjectStatsDashboard total={projectStats?.data?.total} />
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
              <PieCharts
                title="Status"
                description="Project by status"
                data={projectStats?.data?.status}
              />
              <PieCharts
                title="Slot Availability"
                description="Projects by slot status"
                data={projectStats?.data?.slotAvailability}
              />
              <PieCharts
                title="Deadline Status"
                description="Projects by deadline condition"
                data={projectStats?.data?.deadlineStatus}
              />
              <BarChartMultiple
                title="Projects by Trade"
                description="How projects are distributed by trade"
                data={projectStats?.data?.byTrade}
              />
              <Radial
                title="By Province"
                description="Projects grouped by province"
                data={projectStats?.data?.byProvince}
              />
              <Radial
                title="By District"
                description="Projects grouped by district"
                data={projectStats?.data?.byDistrict}
              />
            </div>
          </section>

          <section id="applications-section">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">
                📨 Applications Overview
              </h2>
              <DownloadButton
                targetId="applications-section"
                fileName="application-overview"
              />
            </div>
            <ApplicationStatsDashboard
              stats={{
                totalApplications:
                  applicationStats?.data?.totalApplications ?? 0,
                approvedApplications:
                  applicationStats?.data?.approvedApplications ?? 0,
                rejectedApplications:
                  applicationStats?.data?.rejectedApplications ?? 0,
                pendingApplications:
                  applicationStats?.data?.pendingApplications ?? 0,
              }}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
              <PieCharts
                title="Applications by Gender"
                description="Applications grouped by gender"
                data={applicationStats?.data?.byGender}
              />
              <Radial
                title="By Province"
                description="Applications grouped by province"
                data={applicationStats?.data?.byProvince}
              />
              <Radial
                title="By District"
                description="Applications grouped by district"
                data={applicationStats?.data?.byDistrict}
              />
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
