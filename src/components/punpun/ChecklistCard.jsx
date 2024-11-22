"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export const ChecklistCard = ({ title, description, status, className = "", ...props }) => {
  return (
    <>
      <div
        className={cn("flex flex-col", "p-4", "max-w-[20rem]", "border rounded-md", className)}
        {...props}>
        <div>
          <h2 className={cn("font-bold text-xl")}>{title}</h2>
          <p className={cn("mt-2")}>{description}</p>
        </div>
        <div className={cn("flex justify-between items-center", "mt-6")}>
          <p>{status}</p>
          <div className={cn("flex gap-2")}>
            <Button>Edit</Button>
            <Button>Delete</Button>
          </div>
        </div>
      </div>
    </>
  );
};
