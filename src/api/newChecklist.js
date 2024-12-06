import axios from "axios";

export const newChecklist = async (title, description) => {
  try {
    const response = await axios.post(
      "https://greenvelvet.alwaysdata.net/pfc/checklist/add",
      {
        title,
        description,
        todo: [
          {
            title: "",
            description: "new task",
          },
        ],
      },
      { headers: { token: "45f4b63622a428dabf65fa04f4c9dd895234ccf5" } }
    );
    return response.data;
  } catch (error) {
    console.error("Erreur :", error);
  }
};
