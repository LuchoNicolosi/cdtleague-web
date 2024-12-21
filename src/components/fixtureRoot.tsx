import { Match } from "@/utils";
import Link from "next/link";
import React from "react";

interface FixtureProps {
  matches: Match[];
}

const FixtureRoot: React.FC<FixtureProps> = ({ matches }) => {
  return (
    <div className="bg-white text-black font-semibold rounded-lg shadow-md p-6 max-w-4xl mx-auto my-6">
      <h2 className="text-center text-2xl font-bold mb-4">Partidos</h2>
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead className="bg-black text-white">
          <tr>
            <th className="border border-gray-400 px-4 py-2">Día</th>
            <th className="border border-gray-400 px-4 py-2">vs Equipo</th>
            <th className="border border-gray-400 px-4 py-2">Res</th>
            <th className="border border-gray-400 px-4 py-2">Ficha</th>
          </tr>
        </thead>
        <tbody>
          {matches.map((match, index) => (
            <tr
              key={match.id || index}
              className="text-black font-bold odd:bg-white even:bg-gray-200"
            >
              <td className="border border-gray-400 px-4 py-2">
                {new Date(match.createdAt).toLocaleDateString("es-ES")}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                {match.playerTwoName} - {match.playerOneName}
              </td>
              <td className={`border border-gray-400 px-4 py-2 `}>
                {match.playerTwoScore} - {match.playerOneScore}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                <Link href={`/match/${match.id}`}>
                  <button
                    disabled
                    className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded"
                  >
                    Ver
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FixtureRoot;
