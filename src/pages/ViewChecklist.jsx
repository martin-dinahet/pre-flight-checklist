import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { getChecklist } from "../api/getChecklist";
import { MyButton } from "../components/MyButton";
import { Pen } from "lucide-react";
import { updateChecklist } from "../api/updateChecklist";
import { MyHeader } from "../components/MyHeader";

export default () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  //
  const [data, setData] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const checklist = await getChecklist(id);
      setData(checklist);
      setTodos(checklist.todo);
      setTitle(checklist.title);
      setDescription(checklist.description);
    };
    fetchData();
  }, [id]);

  const updateTodo = (index, field, value) => {
    const newTodos = [...todos];
    newTodos[index][field] = value;
    setTodos(newTodos);
  };

  const handleEdit = () => {
    navigate(`/edit?id=${id}`);
  };

  const handleGoBack = () => {
    navigate("/");
  };

  const handleSave = async (e) => {
    e.preventDefault();
    await updateChecklist(id, title, description, todos);
    navigate("/");
  };

  if (!data) return <div>Loading...</div>;

  return (
    <>
      <div className="">
        <MyHeader />
        <div className="w-screen min-h-screen grid place-items-center">
          <div className="p-4 border rounded-md flex flex-col gap-4 min-w-[20rem] w-fit h-fit">
            <h1 className="text-2xl font-bold">Checklist</h1>
            <h2 className="text-xl font-semibold">{title}</h2>
            <h3 className="font-semibold">{description}</h3>
            <div className="flex flex-col mt-2 p-2 border rounded-md">
              {todos.map((todo, index) => (
                <div className="flex items-center gap-2 justify-center">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    className="group block size-4 rounded-md border"
                    onChange={(e) => updateTodo(index, "completed", e.target.checked)}
                  />
                  <p className="w-full">{todo.description}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <MyButton variant="edit" onClick={handleEdit}>
                <Pen className="w-4" />
                Edit
              </MyButton>
              <MyButton onClick={handleGoBack}>Cancel</MyButton>
              <MyButton onClick={handleSave}>Save changes</MyButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
