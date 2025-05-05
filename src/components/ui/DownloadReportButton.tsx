// components/DownloadButton.tsx
"use client";

import { Download } from "lucide-react";
import { toPng } from "html-to-image";
import download from "downloadjs";

interface Props {
  targetId: string;
  fileName: string;
}

export function DownloadButton({ targetId, fileName }: Props) {
  const handleDownload = async () => {
    const node = document.getElementById(targetId);
    if (!node) return;

    try {
      const dataUrl = await toPng(node);
      download(dataUrl, `${fileName}.png`);
    } catch (error) {
      console.error("Download failed", error);
    }
  };

  return (
    <button
      onClick={handleDownload}
      className="ml-auto mb-4 inline-flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 text-sm font-medium"
    >
      <Download className="w-4 h-4" />
      Download
    </button>
  );
}
