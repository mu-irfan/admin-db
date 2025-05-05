import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileCheck2, FileClock, FileX2 } from "lucide-react";

interface ApplicationStatsDashboardProps {
  stats?: {
    totalApplications: number;
    approvedApplications: number;
    rejectedApplications: number;
    pendingApplications: number;
  };
}

export default function ApplicationStatsDashboard({
  stats,
}: ApplicationStatsDashboardProps) {
  const tiles = [
    {
      title: "Total Applications",
      value: stats?.totalApplications ?? 0,
      icon: <FileCheck2 className="w-6 h-6 text-indigo-600" />,
      color: "text-indigo-600",
    },
    {
      title: "Approved",
      value: stats?.approvedApplications ?? 0,
      icon: <FileCheck2 className="w-6 h-6 text-green-600" />,
      color: "text-green-600",
    },
    {
      title: "Pending",
      value: stats?.pendingApplications ?? 0,
      icon: <FileClock className="w-6 h-6 text-yellow-600" />,
      color: "text-yellow-600",
    },
    {
      title: "Rejected",
      value: stats?.rejectedApplications ?? 0,
      icon: <FileX2 className="w-6 h-6 text-red-600" />,
      color: "text-red-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {tiles.map((stat, index) => (
        <div
          key={index}
          className="rounded-xl p-4 border hover:shadow-md transition-all duration-200"
        >
          <CardHeader className="flex flex-row items-center justify-between p-0 mb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <div className="p-2 rounded-md bg-gray-50">{stat.icon}</div>
          </CardHeader>
          <CardContent className="p-0">
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-gray-400 mt-1">Updated just now</p>
          </CardContent>
        </div>
      ))}
    </div>
  );
}
