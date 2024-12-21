import { Match } from "@/utils";
import Link from "next/link";
import React from "react";

interface FixtureProps {
  matches: Match[] | undefined;
  playerName: string | undefined;
  playerId: number | undefined;
  title: string;
}

const Fixture: React.FC<FixtureProps> = ({
  matches,
  playerName,
  playerId,
  title,
}) => {
  const isDraw = (match: Match): boolean => {
    return match.playerOneScore === match.playerTwoScore;
  };
  const randomMatch = (): boolean => {
    return playerId === undefined;
  };
  const playerWin = (match: Match): boolean => {
    if (Number(match.player1Id) === playerId) {
      return match.playerOneScore > match.playerTwoScore;
    } else if (Number(match.player2Id) === playerId) {
      return match.playerOneScore < match.playerTwoScore;
    } else {
      return randomMatch();
    }
  };

  return (
    <div
      className="text-black font-semibold "
      style={{
        padding: "20px",
        backgroundColor: "#fff",
        borderRadius: "8px",
        margin: "20px auto",
        maxWidth: "800px",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>{title}</h2>
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead className="bg-black text-white">
          <tr className="text-center table-row">
            <th className="border border-gray-400 px-4 py-2">Día</th>
            {randomMatch() ? (
              ""
            ) : (
              <>
                <th className="border border-gray-400 px-4 py-2">#F</th>
              </>
            )}
            <th className="border border-gray-400 px-4 py-2">vs Equipo</th>
            {randomMatch() ? (
              ""
            ) : (
              <>
                <th className="border border-gray-400 px-4 py-2">Res</th>
              </>
            )}

            <th className="border border-gray-400 px-4 py-2">Ficha</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {matches &&
            matches.map((match, index) => (
              <tr key={match.id || index}>
                <td className="border border-gray-400 px-4 py-2">
                  {new Date(match.createdAt).toLocaleDateString("es-ES")}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {randomMatch() ? (
                    <>
                      {match.playerOneName === playerName
                        ? match.playerTwoName
                        : match.playerOneName}
                    </>
                  ) : (
                    index + 1
                  )}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {match.playerTwoName === playerName
                    ? match.playerOneName
                    : match.playerTwoName}
                </td>
                <td
                  className={`${
                    randomMatch()
                      ? "bg-white"
                      : playerWin(match)
                      ? "bg-green-400"
                      : isDraw(match)
                      ? "bg-yellow-400"
                      : "bg-red-400"
                  }
                  border border-gray-400 px-4 py-2
                  `}
                >
                  {playerId === Number(match.player1Id) ? (
                    <>
                      {match.playerOneScore} - {match.playerTwoScore}
                    </>
                  ) : (
                    <>
                      {match.playerTwoScore} - {match.playerOneScore}
                    </>
                  )}
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

export default Fixture;
