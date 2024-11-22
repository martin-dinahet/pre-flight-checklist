"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash } from "lucide-react";
import { cn } from "@/lib/utils";

export const ChecklistEditForm = ({ id, title: initialTitle, items: initialItems }) => {
  const [title, setTitle] = useState(initialTitle);
  const [items, setItems] = useState(initialItems);
  const router = useRouter();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleItemChange = (id, field, value) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, [field]: field === "checked" ? !!value : value } : item
      )
    );
  };

  const handleAddItem = () => {
    setItems([...items, { id: Date.now().toString(), text: "", checked: false }]);
  };

  const handleRemoveItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you would typically send the updated checklist to your API
    console.log("Submitting updated checklist:", { id, title, items });
    // After successful update, redirect to the main page
    router.push("/");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input type="text" id="title" value={title} onChange={handleTitleChange} />
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
        <Button type="submit">Save Changes</Button>
      </div>
    </form>
  );
};
