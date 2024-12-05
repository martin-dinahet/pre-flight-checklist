"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import axios from "axios";

export function NewChecklistButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setIsSubmitting(true);

  //   try {
  //     console.log("Sending request to create checklist:", { title, description });
  //     const response = await fetch("https://greenvelvet.alwaysdata.net/pfc/checklist/add", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Token: process.env.TOKEN,
  //       },
  //       body: JSON.stringify({
  //         title,
  //         description,
  //         todo: [],
  //       }),
  //     });

  //     console.log("Response status:", response.status);
  //     console.log("Response headers:", Object.fromEntries(response.headers));

  //     const responseText = await response.text();
  //     console.log("Raw response:", responseText);

  //     let data;
  //     try {
  //       data = JSON.parse(responseText);
  //     } catch (parseError) {
  //       console.error("Error parsing JSON:", parseError);
  //       throw new Error(`Invalid JSON response: ${responseText}`);
  //     }

  //     console.log("Parsed response data:", data);

  //     if (response.ok && data.status === "success") {
  //       toast({
  //         title: "Success",
  //         description: "New checklist created successfully",
  //       });
  //       setIsOpen(false);
  //       setTitle("");
  //       setDescription("");
  //       router.refresh();
  //     } else {
  //       throw new Error(data.message || "Failed to create checklist");
  //     }
  //   } catch (error) {
  //     console.error("Error creating checklist:", error);
  //     toast({
  //       title: "Error",
  //       description: `Failed to create checklist: ${error.message}`,
  //       variant: "destructive",
  //     });
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  const handlePostRequest = async () => {
    try {
      const response = await axios.post(
        "https://greenvelvet.alwaysdata.net/pfc/checklist/add",
        {
          title,
          description,
          todo: [],
        },
        { headers: { Token: process.env.TOKEN } }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Erreur :", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">New Checklist</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Checklist</DialogTitle>
        </DialogHeader>
        <form onSubmit={handlePostRequest} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Checklist"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
