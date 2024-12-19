import { Match, Player } from "@/types";
import axios from "axios";

const API_URL = "http://localhost:8080/api"; // Reemplaza con tu endpoint real

export const api = {
  // Players CRUD
  getPlayers: () => axios.get(`${API_URL}/player`),
  createPlayer: (player: Player) => axios.post(`${API_URL}/player`, player),
//   updatePlayer: (id: number, player: any) => axios.put(`${API_URL}/players/${id}`, player),
//   deletePlayer: (id: number) => axios.delete(`${API_URL}/players/${id}`),

  // Matches CRUD
  getMatches: () => axios.get(`${API_URL}/match`),
  createMatch: (match: Match) => axios.post(`${API_URL}/match`, match),
//   updateMatch: (id: number, match: any) => axios.put(`${API_URL}/matches/${id}`, match),
//   deleteMatch: (id: number) => axios.delete(`${API_URL}/matches/${id}`),
};
