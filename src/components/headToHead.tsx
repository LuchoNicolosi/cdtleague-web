import { HistoryMatch } from "@/utils";
import Link from "next/link";
import React from "react";
import Fixture from "./fixture";

interface Props {
  playerId: number | undefined;
  rivalId: number | undefined;
  playerName: string | undefined; // e.g., "River Plate"
  rivalName: string | undefined; // e.g., "Boca Juniors"
  stats: HistoryMatch | undefined;
}

const HeadToHead: React.FC<Props> = ({
  playerName,
  rivalName,
  playerId,
  rivalId,
  stats,
}) => {
  return (
    <div className="bg-green-900 text-white p-5 rounded-md shadow-lg h-full">
      <div className="flex justify-center items-center gap-5 mb-5">
        {/* <img src={logo1} alt={`${team1} logo`} className="w-16 h-16" /> */}
        <h1 className="text-xl font-bold">
          {playerName} vs {rivalName}
        </h1>
        {/* <img src={logo2} alt={`${team2} logo`} className="w-16 h-16" /> */}
      </div>
      <div className="flex justify-center gap-5 mb-5">
        <Link href={`/player/${playerId}/match-history`}>
          <button className="bg-[#68a54b] text-white px-4 py-1 rounded-md font-bold hover:bg-yellow-400">
            Historial {playerName}
          </button>
        </Link>
        <Link href={`/player/${rivalId}/match-history`}>
          <button className="bg-[#68a54b] text-white px-4 py-1 rounded-md font-bold hover:bg-yellow-400">
            Historial {rivalName}
          </button>
        </Link>
      </div>
      <div className="mb-5">
        <p className="mt-2">
          Jugaron{" "}
          <span className="text-[#f1ff5f] font-bold">
            {stats?.totalMatches}
          </span>{" "}
          veces
        </p>
        <p>
          <span className="font-semibold">{playerName}</span> ganó{" "}
          <span className="font-bold text-[#f1ff5f]">{stats?.playerWins}</span>{" "}
          veces
        </p>
        <p>
          <span className="font-semibold">{rivalName}</span> ganó{" "}
          <span className="font-bold text-[#f1ff5f]">{stats?.rivalWins}</span>{" "}
          veces
        </p>
        <p>
          Empataron{" "}
          <span className="font-bold text-[#f1ff5f]">{stats?.draws}</span> veces
        </p>
        <p>
          <span className="font-semibold">
            {stats && stats.playerWins > stats?.rivalWins
              ? stats?.playerName
              : stats?.rivalName}
          </span>{" "}
          lleva una diferencia de{" "}
          <span className="font-bold text-[#f1ff5f]">
            {stats && stats.playerWins > stats?.rivalWins
              ? stats?.playerWins
              : stats?.rivalWins}
          </span>{" "}
          partidos
        </p>
      </div>
      <div>
        <Fixture
          title="Ultimos partidos"
          matches={stats && stats.matches}
          playerId={playerId}
          playerName={playerName}
        />
      </div>
    </div>
  );
};

export default HeadToHead;
