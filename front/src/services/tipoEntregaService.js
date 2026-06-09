import axios from "axios";

const API = "http://localhost:3000/tipos-entrega";

export const listarTipos = () => axios.get(API);
export const buscarTipo  = (id) => axios.get(`${API}/${id}`);
export const criarTipo   = (data) => axios.post(API, data);
export const atualizarTipo = (id, data) => axios.put(`${API}/${id}`, data);
export const deletarTipo = (id) => axios.delete(`${API}/${id}`);
