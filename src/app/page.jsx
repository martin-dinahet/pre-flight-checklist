"use server";

import { cn } from "@/lib/utils";
import { Header } from "@/components/punpun/Header";
import { ChecklistCard } from "@/components/punpun/ChecklistCard";
import { getChecklists } from "@/app/actions/getChecklists";

const Index = async () => {
  const checklists = await getChecklists();

  return (
    <>
      <div className={cn("w-screen min-h-screen ")}>
        <Header />
        <div className={cn("w-full", "p-4", "flex flex-wrap gap-4")}>
          {checklists.map((checklist, key) => (
            <ChecklistCard
              key={checklist.id}
              id={checklist.id}
              title={checklist.title}
              description={checklist.description}
              status={checklist.status}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Index;
