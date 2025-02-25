import React from "react";

const MyLands = () => {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl bg-muted/90" />
        <div className="aspect-video rounded-xl bg-muted/90" />
        <div className="aspect-video rounded-xl bg-muted/90" />
      </div>
    </div>
  );
};

export default MyLands;
