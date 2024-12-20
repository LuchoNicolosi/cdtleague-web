"use client";
import { api } from "@/services/api";
import { Player } from "@/utils";
import Link from "next/link";
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

  return (
    <div className="min-h-screen  text-white flex flex-col items-center py-10">
      <div className="w-full flex justify-center mb-8">
        <Link href="/player/create">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow">
            Crear Nuevo Jugador
          </button>
        </Link>
      </div>

      {loading ? (
        <p className="text-lg">Cargando jugadores...</p>
      ) : players.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {players.map((player) => (
            <div
              key={player.id}
              className="bg-green-700 hover:bg-green-800 p-4 rounded shadow flex flex-col items-center"
            >
              <p className="text-lg font-semibold">{player.name}</p>
              <Link
                href={`/player/${player.id}`}
                className="mt-2 text-blue-400 hover:underline"
              >
                Ver
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-lg">No hay jugadores aún.</p>
      )}
    </div>
  );
};

export default Page;
