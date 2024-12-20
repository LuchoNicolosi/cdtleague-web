"use client";
import CreatePlayerForm from "@/components/createPlayerForm";
import { api } from "@/services/api";
import { Player } from "@/types";

const Page = () => {
  const addPlayer = async (player: Omit<Player, "id">) => {
    try {
      console.log("Nuevo jugador:", player);
      const res = await api.createPlayer(player);
      if (res.data.success) {
        alert("Jugador creado!");
      }
    } catch (err) {
      console.error("Error create player:", err);
    }
  };
  return (
    <div>
      <CreatePlayerForm onCreate={addPlayer} />
    </div>
  );
};

export default Page;
