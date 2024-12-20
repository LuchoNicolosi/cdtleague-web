import { Match, Player } from "@/utils";
import axios from "axios";

const API_URL = "http://localhost:8080/api"; // Reemplaza con tu endpoint real

export const api = {
  // Players CRUD
  getPlayers: () => axios.get(`${API_URL}/player`),
  getPlayer: (id: number) => axios.get(`${API_URL}/player/${id}`),
  createPlayer: (player: Omit<Player, "id">) =>
    axios.post(`${API_URL}/player/create`, player),
  //   updatePlayer: (id: number, player: any) => axios.put(`${API_URL}/players/${id}`, player),
  //   deletePlayer: (id: number) => axios.delete(`${API_URL}/players/${id}`),

  // Matches CRUD
  getMatches: () => axios.get(`${API_URL}/match`),
  getMatchByPlayer: (id: number) => axios.get(`${API_URL}/match/player/${id}`),
  createMatch: (match: Match) => axios.post(`${API_URL}/match/create`, match),
  //   updateMatch: (id: number, match: any) => axios.put(`${API_URL}/matches/${id}`, match),
  //   deleteMatch: (id: number) => axios.delete(`${API_URL}/matches/${id}`),

  //MatchHistory CRUD
  getMatchHistoryByPlayer: (id: number) =>
    axios.get(`${API_URL}/player/${id}/match-history`),
};
