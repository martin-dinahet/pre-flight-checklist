import { MyButton } from "./MyButton";
import { newChecklist } from "../api/newChecklist";
import { Link, useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

export const MyHeader = () => {
  const navigate = useNavigate();

  const handleNewChecklist = async () => {
    const defaultTitle = "New Checklist";
    const defaultDescription = "Description";

    try {
      const createdChecklist = await newChecklist(defaultTitle, defaultDescription);
      navigate(`/edit?id=${createdChecklist.id}`);
    } catch (error) {
      console.error("Failed to create new checklist", error);
    }
  };

  return (
    <>
      <div>
        <header className="w-full flex justify-between items-center p-4 fixed top-0 bg-white border-b">
          <Link to="/" className="text-2xl font-bold text-[#26547C]">
            Pre-flight checklist
          </Link>
          <MyButton onClick={handleNewChecklist}>
            <Plus></Plus>
            <span>New Checklist</span>
          </MyButton>
        </header>
      </div>
    </>
  );
};
