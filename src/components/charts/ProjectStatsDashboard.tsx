import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderKanban } from "lucide-react";

interface ProjectStatsDashboardProps {
  total?: number;
}

export default function ProjectStatsDashboard({
  total,
}: ProjectStatsDashboardProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="rounded-xl p-4 border hover:shadow-md transition-all duration-200">
        <CardHeader className="flex flex-row items-center justify-between p-0 mb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Projects
          </CardTitle>
          <div className="p-2 rounded-md bg-gray-50">
            <FolderKanban className="w-6 h-6 text-indigo-600" />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <p className="text-2xl font-bold text-indigo-600">{total ?? 0}</p>
          <p className="text-xs text-gray-400 mt-1">Updated just now</p>
        </CardContent>
      </div>
    </div>
  );
}
