"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export function DeleteChecklist({ id }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(
        `https://greenvelvet.alwaysdata.net/pfc/checklist/delete?id=${id}`,
        {
          method: "GET",
          headers: {
            Token: process.env.TOKEN,
          },
        }
      );

      const data = await response.json();

      if (data.done) {
        toast({
          title: "Success",
          description: "Checklist deleted successfully",
        });
        router.refresh();
      } else {
        throw new Error("Failed to delete checklist");
      }
    } catch (error) {
      console.error("Error deleting checklist:", error);
      toast({
        title: "Error",
        description: "Failed to delete checklist. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Button variant="destructive" size="icon" onClick={handleDelete} disabled={isDeleting}>
      <Trash className="h-4 w-4" />
    </Button>
  );
}
