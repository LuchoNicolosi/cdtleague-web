"use client";
import HeadToHead from "@/components/headToHead";
import { api } from "@/services/api";
import { HistoryMatch } from "@/utils";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  //id: playerId - rivalId: matchHistoryId
  const { id, rivalId } = useParams();
  const [matchHistory, setMatchHistory] = useState<HistoryMatch>();
  // const [player, setPlayer] = useState<Player>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatchHistory = async () => {
      try {
        setLoading(true);

        const response = await api.getMatchHistoryById(
          Number(id),
          Number(rivalId)
        );
        setMatchHistory(response.data.data);
        console.log(response);

        // const res = await api.getPlayer(Number(id));
        // setPlayer(res.data.data);
      } catch (error) {
        console.error("Error fetching match history:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id && rivalId) fetchMatchHistory();
  }, [id, rivalId]);
  if (loading) return <p>Cargando...</p>;

  return (
    <HeadToHead
      playerName={matchHistory?.playerName}
      playerId={matchHistory?.playerId}
      rivalId={matchHistory?.rivalId}
      rivalName={matchHistory?.rivalName}
      stats={matchHistory}
    />
  );
};
export default Page;
