"use client";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import { Match } from "@/types";
// import Fixture from "@/components/fixture";
import FixtureRoot from "@/components/fixtureRoot";
// import Image from "next/image";

const Home = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setLoading(true);
        const response = await api.getMatches();

        setMatches(response.data.data);
      } catch (error) {
        console.error("Error fetching matches:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);
  console.log(matches);
  return (
    <div>
      <div className="h-full">
        {loading ? (
          <p>Cargando...</p>
        ) : matches.length > 0 ? (
          <>
            {<FixtureRoot matches={matches} />}

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
            <p>No hay partidos aún.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
