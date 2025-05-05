import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, ShieldCheck, XCircle, Users2 } from "lucide-react";

interface StatsDashboardProps {
  studentStats?: {
    totalStudents: number;
    profileCompleted: number;
  };
}

export default function StatsDashboard({ studentStats }: StatsDashboardProps) {
  const total = studentStats?.totalStudents ?? 0;
  const completed = studentStats?.profileCompleted ?? 0;
  const uncompleted = total - completed;

  const stats = [
    {
      title: "Total Students",
      value: total,
      icon: <GraduationCap className="w-6 h-6 text-blue-600" />,
      color: "text-blue-600",
    },
    {
      title: "Profile Completed",
      value: completed,
      icon: <ShieldCheck className="w-6 h-6 text-green-600" />,
      color: "text-green-600",
    },
    {
      title: "Uncompleted Profiles",
      value: uncompleted,
      icon:
        uncompleted > 0 ? (
          <XCircle className="w-6 h-6 text-red-500" />
        ) : (
          <ShieldCheck className="w-6 h-6 text-green-500" />
        ),
      color: uncompleted > 0 ? "text-red-500" : "text-green-500",
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
