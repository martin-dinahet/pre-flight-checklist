import { useState } from "react";
import { useEffect } from "react";
import { getChecklists } from "../api/getChecklists";
import { deleteChecklist } from "../api/deleteChecklist";
import { MyButton } from "../components/MyButton";
import { MyHeader } from "../components/MyHeader";
import { Pen } from "lucide-react";
import { Trash } from "lucide-react";
import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default () => {
  const navigate = useNavigate();
  const [checklists, setChecklists] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setChecklists(await getChecklists());
    };
    fetchData();
  }, []);
  console.log(checklists);

  const handleEdit = (id) => {
    navigate(`/edit?id=${id}`);
  };

  const handleView = (id) => {
    navigate(`/view?id=${id}`);
  };

  const handleDelete = (id) => {
    const performDelete = async () => {
      if (window.confirm("Are you sure you want to delete the checklist?")) {
        await deleteChecklist(id);
        setChecklists((prevChecklists) => ({
          response: prevChecklists.response.filter((checklist) => checklist.id !== id),
        }));
      }
    };
    performDelete();
  };

  if (!checklists) return <div>Loading...</div>;

  return (
    <>
      <div className="w-screen min-h-screen">
        <MyHeader />
        <div className="p-4 flex flex-wrap gap-4 w-screen min-h-screen mt-[6rem]">
          {checklists.response.map((checklist) => (
            <div
              key={checklist.id}
              className="p-4 border flex flex-col gap-2 rounded-md w-fit min-w-[20rem] h-fit">
              <h2 className="text-xl font-semibold">{checklist.title}</h2>
              <p>{checklist.description}</p>
              <div className="flex gap-2">
                <MyButton onClick={() => handleView(checklist.id)}>
                  <Eye />
                  View
                </MyButton>
                <MyButton variant="edit" onClick={() => handleEdit(checklist.id)}>
                  <Pen className="w-4"></Pen>
                  Edit
                </MyButton>
                <MyButton onClick={() => handleDelete(checklist.id)} variant="delete">
                  <Trash className="w-4"></Trash>
                  Delete
                </MyButton>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
