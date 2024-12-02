"use server";

export async function getChecklists() {
  try {
    const response = await fetch("https://greenvelvet.alwaysdata.net/pfc/checklists", {
      method: "GET",
      headers: {
        Token: process.env.TOKEN,
      },
    });

    console.log(process.env.TOKEN);
    console.log("API Response Status:", response.status);

    const data = await response.json();
    console.log("API Response Data:", JSON.stringify(data, null, 2));

    if (!response.ok) {
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${data.message || "Unknown error"}`
      );
    }

    if (data.status === "error") {
      throw new Error(data.message || "Failed to fetch checklists");
    }

    return data.response || [];
  } catch (error) {
    console.error("Error fetching checklists:", error);
    throw error;
  }
}

export async function getChecklist(id) {
  try {
    const response = await fetch(`https://greenvelvet.alwaysdata.net/pfc/checklist?id=${id}`, {
      method: "GET",
      headers: {
        Token: process.env.TOKEN,
      },
    });

    console.log("API Response Status:", response.status);

    const data = await response.json();
    console.log("API Response Data:", JSON.stringify(data, null, 2));

    if (!response.ok) {
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${data.message || "Unknown error"}`
      );
    }

    if (data.status === "error") {
      throw new Error(data.message || "Failed to fetch checklist");
    }

    return data.response || null;
  } catch (error) {
    console.error("Error fetching checklist:", error);
    throw error;
  }
}
