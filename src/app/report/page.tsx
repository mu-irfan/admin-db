"use client";
import DownloadReport from "@/components/Report/DownloadReport";
import dynamic from "next/dynamic";
const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  { ssr: false }
);

import React from "react";

const Report = () => {
  return (
    <PDFViewer className="w-screen h-screen">
      <DownloadReport />
    </PDFViewer>
  );
};

export default Report;
