"use server";

export const getChecklists = async () => {
  // In a real application, you would fetch this data from your API
  return [
    {
      id: "1",
      title: "Daily Tasks",
      items: [
        { id: "1", text: "Check emails", checked: false },
        { id: "2", text: "Review PRs", checked: false },
      ],
    },
    {
      id: "2",
      title: "Weekly Goals",
      items: [
        { id: "1", text: "Team meeting", checked: false },
        { id: "2", text: "Project planning", checked: false },
      ],
    },
  ];
};

export const getChecklist = async (id) => {
  const checklists = await getChecklists();
  return checklists.find((checklist) => checklist.id === id) || null;
};
