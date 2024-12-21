"use client";
import MatchHistoryComponent from "@/components/matchHistory";
import { api } from "@/services/api";
import { HistoryMatch, Match, Player } from "@/utils";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const { id } = useParams();
  const [matchHistory, setMatchHistory] = useState<HistoryMatch[]>([]);
  const [player, setPlayer] = useState<Player>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatchHistory = async () => {
      try {
        setLoading(true);
        const response = await api.getMatchHistoryByPlayer(Number(id));
        setMatchHistory(response.data.data);

        const res = await api.getPlayer(Number(id));
        setPlayer(res.data.data);
      } catch (error) {
        console.error("Error fetching match history:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchMatchHistory();
  }, [id]);

  const getMaxGoals = (matches: Match[], playerId?: number) => {
    return matches
      .filter((match) => {
        // Determinar si el jugador ganó por más de 3 goles
        if (Number(match.player1Id) === playerId) {
          return match.playerOneScore - match.playerTwoScore >= 3;
        } else if (Number(match.player2Id) === playerId) {
          return match.playerTwoScore - match.playerOneScore >= 3;
        }
        return false;
      })
      .map((match) => ({
        ...match,
        goalDifference: Math.abs(match.playerOneScore - match.playerTwoScore), // Calcular la diferencia de goles
      }))
      .sort((a, b) => b.goalDifference - a.goalDifference); // Ordenar por diferencia de goles
  };

  const getMaxDefeats = (matches: Match[], playerId?: number) => {
    return matches
      .filter((match) => {
        // Determinar si el jugador perdió por más de 3 goles
        if (Number(match.player1Id) === playerId) {
          return match.playerTwoScore - match.playerOneScore >= 3;
        } else if (Number(match.player2Id) === playerId) {
          return match.playerOneScore - match.playerTwoScore >= 3;
        }
        return false;
      })
      .map((match) => ({
        ...match,
        goalDifference: Math.abs(match.playerOneScore - match.playerTwoScore), // Calcular la diferencia de goles
      }))
      .sort((a, b) => b.goalDifference - a.goalDifference); // Ordenar por diferencia de goles
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="p-5 bg-[#00612d] h-full rounded-lg shadow-lg">
      {/* Historial General */}
      <div className="overflow-x-auto mb-10">
        <MatchHistoryComponent
          matchHistory={matchHistory}
          playerName={player?.name}
        />
      </div>

      {/* Máximas Goleadas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Goleadas a favor */}
        <div className="bg-white shadow-md rounded p-5">
          <h2 className="text-black text-lg font-bold text-center mb-3">
            Máximas Goleadas A Favor
          </h2>
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead className="bg-gray-700 text-white">
              <tr>
                <th className="border border-gray-400 px-4 py-2">Tipo</th>
                <th className="border border-gray-400 px-4 py-2">Resultado</th>
                <th className="border border-gray-400 px-4 py-2">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {matchHistory.map((matchHistory: HistoryMatch) => {
                return getMaxGoals(matchHistory.matches, player?.id).map(
                  (match) => (
                    <tr
                      key={match.id}
                      className="odd:bg-white text-black even:bg-gray-200"
                    >
                      {/* Torneo */}
                      <td className="border border-gray-400 px-4 py-2">
                        {match.type === "FRIENDLY" ? "Amistoso" : "Torneo"}
                      </td>

                      {/* Resultado */}
                      <td className="border border-gray-400 px-4 py-2">
                        {match.playerOneName} {match.playerOneScore} -{" "}
                        {match.playerTwoScore} {match.playerTwoName}
                      </td>

                      {/* Fecha */}
                      <td className="border border-gray-400 px-4 py-2">
                        {new Date(match.createdAt).toLocaleDateString("es-ES", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </td>
                    </tr>
                  )
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Goleadas en contra */}
        <div className="bg-white shadow-md rounded p-5">
          <h2 className=" text-black text-lg font-bold text-center mb-3">
            Máximas Goleadas En Contra
          </h2>
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead className="bg-gray-700 text-white">
              <tr>
                <th className="border border-gray-400 px-4 py-2">Tipo</th>
                <th className="border border-gray-400 px-4 py-2">Resultado</th>
                <th className="border border-gray-400 px-4 py-2">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {matchHistory.map((matchHistory: HistoryMatch) => {
                return getMaxDefeats(matchHistory.matches, player?.id).map(
                  (match) => (
                    <tr
                      key={match.id}
                      className="odd:bg-white text-black even:bg-gray-200"
                    >
                      {/* Torneo */}
                      <td className="border border-gray-400 px-4 py-2">
                        {match.type === "FRIENDLY" ? "Amistoso" : "Torneo"}
                      </td>

                      {/* Resultado */}
                      <td className="border  border-gray-400 px-4 py-2">
                        {match.playerOneName} {match.playerOneScore} -{" "}
                        {match.playerTwoScore} {match.playerTwoName}
                      </td>

                      {/* Fecha */}
                      <td className="border border-gray-400 px-4 py-2">
                        {new Date(match.createdAt).toLocaleDateString("es-ES", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </td>
                    </tr>
                  )
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Page;
