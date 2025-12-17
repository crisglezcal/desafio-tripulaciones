import api from "./api_chat";

export const sendChatMessage = async (message) => {
  try {
    const body = {
      message,
    };

    const response = await api.post("", body);

    return response.data;
  } catch (error) {
    throw error.response?.data || {
      mensaje: "Error conectando con la API",
    };
  }
};
