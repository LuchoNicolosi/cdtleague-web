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
      <table className="w-full border-collapse">
        <thead>
          <tr className="text-center bg-gray-100">
            <th className="border-b border-gray-300 p-2">Día</th>
            <th className="border-b border-gray-300 p-2">vs Equipo</th>
            <th className="border-b border-gray-300 p-2">Res</th>
            <th className="border-b border-gray-300 p-2">Ficha</th>
          </tr>
        </thead>
        <tbody>
          {matches.map((match, index) => (
            <tr
              key={match.id || index}
              className="text-center odd:bg-gray-50 even:bg-gray-100"
            >
              <td className="border-b border-gray-300 p-2">
                {new Date(match.createdAt).toLocaleDateString("es-ES")}
              </td>
              <td className="border-b border-gray-300 p-2">
                {match.playerTwoName} - {match.playerOneName}
              </td>
              <td className={`border-b border-gray-300 p-2 `}>
                {match.playerTwoScore} - {match.playerOneScore}
              </td>
              <td className="border-b border-gray-300 p-2">
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
