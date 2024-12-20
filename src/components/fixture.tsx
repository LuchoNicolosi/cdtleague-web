import { Match } from "@/utils";
import Link from "next/link";
import React from "react";

interface FixtureProps {
  matches: Match[];
  playerName: string | null;
  playerId: number | null;
}

const Fixture: React.FC<FixtureProps> = ({ matches, playerName, playerId }) => {
  const isDraw = (match: Match): boolean => {
    return match.playerOneScore === match.playerTwoScore;
  };
  const randomMatch = (): boolean => {
    return playerId === null;
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
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Fixture</h2>
      <table
        style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}
      >
        <thead>
          <tr className="text-center table-row">
            <th style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
              Día
            </th>
            {randomMatch() ? (
              ""
            ) : (
              <>
                <th style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
                  #F
                </th>
              </>
            )}
            <th style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
              vs Equipo
            </th>
            {randomMatch() ? (
              ""
            ) : (
              <>
                <th style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
                  Res
                </th>
              </>
            )}

            <th style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
              Ficha
            </th>
          </tr>
        </thead>
        <tbody className="text-center">
          {matches.map((match, index) => (
            <tr key={match.id || index}>
              <td style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
                {new Date(match.createdAt).toLocaleDateString("es-ES")}
              </td>
              <td style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
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
              <td style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
                {match.playerTwoName === playerName
                  ? match.playerOneName
                  : match.playerTwoName}
              </td>
              <td
                className={`${
                  randomMatch()
                    ? "bg-white"
                    : playerWin(match)
                    ? "bg-green-600"
                    : isDraw(match)
                    ? "bg-yellow-400"
                    : "bg-red-500"
                }`}
                style={{ borderBottom: "1px solid #ddd", padding: "8px" }}
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
              <td style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
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
