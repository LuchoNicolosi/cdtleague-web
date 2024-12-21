"use client";
import Fixture from "@/components/fixture";
import { api } from "@/services/api";
import { Match, Player } from "@/utils";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Players = () => {
  const { id } = useParams();
  const [player, setPlayer] = useState<Player>();
  const [loading, setLoading] = useState<boolean>(true);
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    const fetchPlayer = async () => {
      if (id) {
        try {
          setLoading(true);
          const response = await api.getPlayer(Number(id));
          setPlayer(response.data.data);
          const responseMatches = await api.getMatchByPlayer(Number(id));
          setMatches(responseMatches.data.data);
        } catch (error) {
          console.error("Error fetching player details:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchPlayer();
  }, [id]);

  if (loading) return <p>Cargando...</p>;
  if (!player) return <p>No se encontró el jugador</p>;

  return (
    <div className="p-6 bg-[#00612d] flex flex-col h-full place-content-center rounded-lg shadow-lg">
      <div className="flex flex-col gap-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white">{player.name}</h1>
          <p className="text-white mt-2">
            <span className="font-medium text-[#ff0]">Descripción:</span>{" "}
            {player.description}
          </p>
          <p className="text-white">
            <span className="font-medium text-[#ff0]">Copas ganadas:</span>{" "}
            {player.cups}
          </p>
        </div>
        <div className="text-center flex place-content-center mt-4">
          <Link href={`/player/${player.id}/match-history`}>
            <button className="text-white rounded p-1 bg-[#68a54b] font-semibold hover:underline">
              Historial en CDT League de {player.name}
            </button>
          </Link>
        </div>
      </div>
      <div className="mt-6">
        <Fixture
          title="Fixture"
          matches={matches}
          playerName={player.name}
          playerId={player.id}
        />
      </div>
    </div>
  );
};

export default Players;
