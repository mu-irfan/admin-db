import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, CheckCircle2, XOctagon } from "lucide-react";

interface AdminStatsDashboardProps {
  adminStats?: {
    totalAdmins: number;
    verified: number;
    unverified: number;
  };
}

export default function AdminStatsDashboard({
  adminStats,
}: AdminStatsDashboardProps) {
  const stats = [
    {
      title: "Total Admins",
      value: adminStats?.totalAdmins ?? 0,
      icon: <ShieldCheck className="w-6 h-6 text-blue-600" />,
      color: "text-blue-600",
    },
    {
      title: "Verified Admins",
      value: adminStats?.verified ?? 0,
      icon: <CheckCircle2 className="w-6 h-6 text-green-600" />,
      color: "text-green-600",
    },
    {
      title: "Unverified Admins",
      value: adminStats?.unverified ?? 0,
      icon: <XOctagon className="w-6 h-6 text-red-600" />,
      color: "text-red-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {stats.map((stat, index) => (
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
