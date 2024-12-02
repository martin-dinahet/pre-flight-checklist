"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export const ChecklistEditForm = ({
  id,
  title: initialTitle,
  items: initialItems,
  description: initialDescription,
}) => {
  const { toast } = useToast();
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription || "");
  const [items, setItems] = useState(initialItems);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleItemChange = (id, field, value) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, [field]: field === "checked" ? !!value : value } : item
      )
    );
  };

  const handleAddItem = () => {
    setItems([...items, { id: Date.now().toString(), title: "", description: "", status: 0 }]);
  };

  const handleRemoveItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://greenvelvet.alwaysdata.net/pfc/checklist/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Token: process.env.TOKEN,
        },
        body: JSON.stringify({
          id,
          title,
          description,
          todo: items.map((item) => ({
            title: item.text,
            description: item.description || "",
            status: item.checked ? 1 : 0,
          })),
        }),
      });

      const data = await response.json();

      if (data.done) {
        toast({
          title: "Success",
          description: "Checklist updated successfully",
        });
        router.push("/");
      } else {
        throw new Error("Failed to update checklist");
      }
    } catch (error) {
      console.error("Error updating checklist:", error);
      toast({
        title: "Error",
        description: "Failed to update checklist. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input type="text" id="title" value={title} onChange={handleTitleChange} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Input
          type="text"
          id="description"
          value={description}
          onChange={handleDescriptionChange}
        />
      </div>
      <div className="space-y-2">
        <Label>Items</Label>
        {items.map((item) => (
          <div key={item.id} className="flex items-center space-x-2">
            <Checkbox
              checked={item.checked}
              onCheckedChange={(checked) => handleItemChange(item.id, "checked", checked)}
            />
            <Input
              value={item.text}
              onChange={(e) => handleItemChange(item.id, "text", e.target.value)}
              className="flex-grow"
              placeholder="Item title"
              required
            />
            <Input
              value={item.description || ""}
              onChange={(e) => handleItemChange(item.id, "description", e.target.value)}
              className="flex-grow"
              placeholder="Item description"
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              onClick={() => handleRemoveItem(item.id)}>
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
      <div className={cn("flex gap-2 justify-end")}>
        <Button type="button" onClick={handleAddItem} variant="outline">
          Add Item
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
};
