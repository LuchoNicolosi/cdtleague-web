"use client";
import CreateMatchForm from "@/components/createMatchForm";
import { api } from "@/services/api";
import { Match, Player } from "@/types";
import { useEffect, useState } from "react";

const Page = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        setLoading(true);
        const response = await api.getPlayers();
        setPlayers(response.data.data);
      } catch (error) {
        console.error("Error fetching players:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  const addMatch = async (match: Match) => {
    try {
      console.log("Nuevo partido:", match);
      const res = await api.createMatch(match);
      if (res.data.success) {
        alert("Partido creado!");
      }
    } catch (err) {
      console.error("Error create match:", err);
    }
  };

  return (
    <div className="flex flex-col">
      {loading ? (
        <p>Cargando</p>
      ) : players.length > 0 ? (
        <CreateMatchForm onCreate={addMatch} players={players} />
      ) : (
        <div>
          <p>No hay jugadores.</p>
        </div>
      )}
    </div>
  );
};

export default Page;
