import { getChecklist } from "@/app/actions/getChecklists";
import { ChecklistEditForm } from "./ChecklistEditForm";
import { cn } from "@/lib/utils";

const EditChecklistPage = async ({ params }) => {
  const checklist = await getChecklist(params.id);

  if (!checklist) {
    return <div>Checklist not found</div>;
  }

  return (
    <div className="w-screen min-h-screen grid place-items-center">
      <div className={cn("border rounded-md p-4")}>
        <h1 className="text-2xl font-bold mb-4">Edit Checklist: {checklist.title}</h1>
        <ChecklistEditForm id={checklist.id} title={checklist.title} items={checklist.items} />
      </div>
    </div>
  );
};

export default EditChecklistPage;
