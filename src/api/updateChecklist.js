import axios from "axios";

export const updateChecklist = async (id, title, description, todo) => {
  try {
    const response = await axios.post(
      `https://greenvelvet.alwaysdata.net/pfc/checklist/update?id=${id}`,
      {
        id,
        title,
        description,
        todo,
      },
      { headers: { token: "45f4b63622a428dabf65fa04f4c9dd895234ccf5" } }
    );
    console.log(response.data);
  } catch (error) {
    console.error("Erreur :", error);
  }
};
