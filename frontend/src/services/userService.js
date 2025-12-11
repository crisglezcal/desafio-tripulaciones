import api from "../apiClient";

export const login = async (email, password) => {
  const { data } = await api.post("/auth/login", { email, password });
    console.log("Login response:", data); // <--- aquí ves todo lo que devuelve


  // Guardamos el token
  if (data.token) {
    localStorage.setItem("token", data.token);
  }

  // Guardamos también el usuario en localStorage
  if (data.user) {
    localStorage.setItem("user", JSON.stringify(data.user));
  }

  return data; // data debe incluir { token, user }
};
export const register = async (name, email, password) => {
  const { data } = await api.post("/auth/register", { name, email, password });
  return data;
};

export const getProfile = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No hay token");

  const storedUser = JSON.parse(localStorage.getItem("user"));
  if (!storedUser) throw new Error("No hay usuario en localStorage");

  const userId = storedUser.id_user; // <-- aquí usamos el campo correcto
  if (!userId) throw new Error("No hay id_user del usuario");

  const { data } = await api.get(`/users/${userId}`);
  return data;
};

export const updateUser = async (id, updatedData) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No hay token");

  const { data } = await api.put(`/users/${id}`, updatedData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // Actualizamos el localStorage con los nuevos datos
  localStorage.setItem("user", JSON.stringify(data));

  return data;
};


export const logout = () => {
  localStorage.removeItem("token");
};
