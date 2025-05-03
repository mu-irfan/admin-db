"use client";
import React, { useEffect, useRef, useState } from "react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { usePathname, useRouter } from "next/navigation";
import { SidebarTrigger } from "../ui/sidebar";
import { Separator } from "../ui/separator";
import { Breadcrumbs } from "../breadcrumbs";
import { UserNav } from "./user-nav";
import { Button } from "../ui/button";
import AddProjectModal from "../ui/SearchForm/AddProject";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const driverRef = useRef<any>(null);
  const [isSearchOpen, setSearchOpen] = useState<boolean>(false);

  useEffect(() => {
    driverRef.current = driver({
      popoverClass: "driverjs-theme",
      showButtons: ["next", "close"],
      animate: true,
      nextBtnText: "Add Project",
      doneBtnText: "Add Project",
      onNextClick: () => {
        router.push("/dashboard/overiew");
        setSearchOpen(true);
        driverRef.current?.destroy();
      },
      steps: [
        {
          element: "#add_project",
          popover: {
            title: "Add Project",
            description:
              "Add project by clicking it and then filling provided form.",
          },
        },
      ],
    });
    driverRef.current.drive();
    return () => driverRef.current?.destroy();
  }, []);

  const handleAddProject = () => {
    setSearchOpen((prev) => !prev);
    driverRef.current?.destroy();
  };

  return (
    <>
      <header className="flex h-16 shrink-0 items-center justify-between gap-2 bg-gray-100">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumbs />
          {pathname === "/dashboard/overiew" && (
            <Button
              className="text-gray-700 text-sm md:ml-6 border border-gray-400 bg-transparent shadow-md hover:text-white hover:bg-primary/80"
              type="button"
              id="add_project"
              size="sm"
              onClick={handleAddProject}
            >
              Add Project
            </Button>
          )}
        </div>
        <div className="flex items-center gap-3 px-4">
          <UserNav />
        </div>
      </header>
      <AddProjectModal open={isSearchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
