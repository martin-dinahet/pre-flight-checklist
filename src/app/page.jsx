import { cn } from "@/lib/utils";
import { Header } from "@/components/punpun/Header";
import { ChecklistCard } from "@/components/punpun/ChecklistCard";

const Index = () => {
  const checklists = [
    {
      title: "Checklist title",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet quaerat alias natus fugit sit sequi?",
      status: "In progress",
    },
    {
      title: "Checklist title",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet quaerat alias natus fugit sit sequi?",
      status: "In progress",
    },
    {
      title: "Checklist title",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet quaerat alias natus fugit sit sequi?",
      status: "In progress",
    },
  ];

  return (
    <>
      <div className={cn("w-screen min-h-screen ")}>
        <Header />
        <div className={cn("w-full", "p-4", "flex flex-wrap gap-4")}>
          {checklists.map((checklist, key) => (
            <ChecklistCard
              key={key}
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
