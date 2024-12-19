"use client";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import { Match, MatchType } from "@/types";
// import Image from "next/image";

const Home = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setLoading(true);
        const response = await api.getMatches();
        setMatches(response.data);
      } catch (error) {
        console.error("Error fetching matches:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  return (
    <div className="flex flex-col text-center my-10">
      <h1>CDT LEAGUE</h1>

      <div className="gap-5 mt-5">
        <h1>Jugadores</h1>
        <h1>Crear partido</h1>
      </div>

      <div className="mt-5">
        {loading ? (
          <p>Cargando...</p>
        ) : matches.length > 0 ? (
          <>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {matches.map((match) => (
                <li key={match.id}>
                  <div>
                    {match.type == MatchType.FRIENDLY ? "Amistoso" : "Torneo"}
                  </div>
                  <div>
                    {match.playerOneName} {`[${match.playerOneScore}]`} -{" "}
                    {`[${match.playerTwoScore}]`} {match.playerTwoName}
                  </div>
                </li>
              ))}
            </ul>

            {/* <div style={{ marginTop: "20px" }}>
              <button onClick={() => setPage(page - 1)} disabled={page === 1}>
                Anterior
              </button>
              <span style={{ margin: "0 10px" }}>Página {page}</span>
              <button onClick={() => setPage(page + 1)}>Siguiente</button>
            </div> */}
          </>
        ) : (
          <div>
            <p>No existen participantes aún.</p>
            <button
              onClick={() => alert("Abrir modal para crear participante")}
              style={{
                backgroundColor: "#28a745",
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Crear Participante
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
