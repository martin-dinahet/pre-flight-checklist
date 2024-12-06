import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getChecklist } from "../api/getChecklist";
import { updateChecklist } from "../api/updateChecklist";
import { useEffect } from "react";
import { MyButton } from "../components/MyButton";
import { MyHeader } from "../components/MyHeader";
import { Fieldset } from "@headlessui/react";
import { Legend } from "@headlessui/react";
import { Field } from "@headlessui/react";
import { Input } from "@headlessui/react";
import { Label } from "@headlessui/react";
import { Textarea } from "@headlessui/react";
import { Trash } from "lucide-react";

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

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const updateTodo = (index, field, value) => {
    const newTodos = [...todos];
    newTodos[index][field] = value;
    setTodos(newTodos);
  };

  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const addTodo = () => {
    const newTodo = { description: "", completed: false };
    setTodos([...todos, newTodo]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateChecklist(id, title, description, todos);
    navigate("/");
  };

  const handleGoBack = () => {
    navigate("/");
  };

  if (!data) return <div>Loading...</div>;

  return (
    <>
      <div className="w-screen min-h-screen">
        <MyHeader />
        <div className="w-screen min-h-screen grid place-items-center">
          <Fieldset className="p-4 border rounded-md flex flex-col gap-4 min-w-[20rem]">
            <Legend className="text-2xl font-bold">Edit checklist</Legend>
            <Field className="flex flex-col mt-2 p-2  border rounded-md">
              <Label className="text-xl font-semibold">Title</Label>
              <Input value={title} onChange={handleTitleChange} className="w-auto" />
            </Field>
            <Field className="flex flex-col mt-2 p-2  border rounded-md">
              <Label className="text-xl font-semibold">Description</Label>
              <Textarea value={description} onChange={handleDescriptionChange} className="w-full" />
            </Field>
            <Field className="flex flex-col mt-2 p-2 border rounded-md">
              <Label className="text-xl font-semibold">Todos</Label>
              {todos.map((todo, index) => (
                <div className="flex items-center gap-2 justify-center" key={index}>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={(e) => updateTodo(index, "completed", e.target.checked)}
                    className="group block size-4 rounded-md border"></input>
                  <Input
                    value={todo.description}
                    onChange={(e) => updateTodo(index, "description", e.target.value)}
                    className="w-full"
                  />
                  <MyButton variant="delete" onClick={() => deleteTodo(index)}>
                    <Trash />
                  </MyButton>
                </div>
              ))}
              <MyButton onClick={addTodo}>Add Todo</MyButton>
            </Field>
            <div className="flex gap-2">
              <MyButton onClick={handleSubmit}>Save Changes</MyButton>
              <MyButton onClick={handleGoBack}>Cancel</MyButton>
            </div>
          </Fieldset>
        </div>
      </div>
    </>
  );
};
