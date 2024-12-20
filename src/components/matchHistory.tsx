import { HistoryMatch } from "@/utils";
import React from "react";

interface MatchHistoryProps {
  matchHistory: HistoryMatch[];
  playerName: string | undefined;
}

const MatchHistoryComponent: React.FC<MatchHistoryProps> = ({
  matchHistory,
  playerName,
}) => {
  const winsDiff = (match: HistoryMatch): number => {
    return match.playerWins - match.rivalWins;
  };
  return (
    <>
      <h1 className="text-2xl font-semibold  text-center mb-5">
        Historial de {playerName}
      </h1>
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead className="bg-black text-white">
          <tr>
            <th className="border border-gray-400 px-4 py-2">Rival</th>
            <th className="border border-gray-400 px-4 py-2">DIF</th>
            <th className="border border-gray-400 px-4 py-2">PJ</th>
            <th className="border border-gray-400 px-4 py-2">PG</th>
            <th className="border border-gray-400 px-4 py-2">PE</th>
            <th className="border border-gray-400 px-4 py-2">PP</th>
            <th className="border border-gray-400 px-4 py-2">Ficha</th>
          </tr>
        </thead>
        <tbody>
          {matchHistory.map((match) => {
            console.log(match);
            const diff = winsDiff(match);
            return (
              <tr
                key={match.id}
                className="text-black font-bold odd:bg-white even:bg-gray-200"
              >
                <td className="border border-gray-400 px-4 py-2">
                  VS {match.rivalName}
                </td>
                <td
                  className={`${
                    diff > 0
                      ? "bg-green-600"
                      : diff === 0
                      ? "bg-yellow-400"
                      : "bg-red-600"
                  } border border-gray-400 px-4 py-2`}
                >
                  {diff > 0 ? "+" + diff : diff}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {match.totalMatches}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {match.playerWins}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {match.draws}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {match.rivalWins}
                </td>
                <td className="border border-gray-400 px-4 py-2 text-center">
                  <button className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-700">
                    +
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default MatchHistoryComponent;
