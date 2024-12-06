import axios from "axios";

export const getChecklists = async () => {
  try {
    const response = await axios.get("https://greenvelvet.alwaysdata.net/pfc/checklists", {
      headers: { token: "45f4b63622a428dabf65fa04f4c9dd895234ccf5" },
    });
    return response.data;
  } catch (error) {
    console.error("Erreur :", error);
  }
};
