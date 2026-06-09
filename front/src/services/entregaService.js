import axios from "axios";

const API = "http://localhost:3000/entregas";

export const listarEntregas  = () => axios.get(API);
export const buscarEntrega   = (id) => axios.get(`${API}/${id}`);
export const criarEntrega    = (data) => axios.post(API, data);
export const atualizarEntrega = (id, data) => axios.put(`${API}/${id}`, data);
export const deletarEntrega  = (id) => axios.delete(`${API}/${id}`);
