"use client";
import { useState } from "react";
import { Match, Player } from "../types";

interface CreateMatchFormProps {
  onCreate: (match: Match) => void;
  players: Player[];
}

const CreateMatchForm: React.FC<CreateMatchFormProps> = ({
  onCreate,
  players,
}) => {
  const [formData, setFormData] = useState<Omit<Match, "id">>({
    player1Id: "",
    player2Id: "",
    playerOneName: "",
    playerTwoName: "",
    playerOneScore: 0,
    playerTwoScore: 0,
    type: "",
    createdAt: new Date(),
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate(formData);
    setFormData({
      player1Id: "",
      player2Id: "",
      playerOneName: "",
      playerTwoName: "",
      playerOneScore: 0,
      playerTwoScore: 0,
      type: "",
      createdAt: new Date(),
    });
  };

  return (
    <div className="match-form  bg-green-700 p-8 rounded-lg shadow-lg max-w-md mx-auto">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <label className="flex flex-col">
          <span className="text-white font-medium">Jugador 1:</span>
          <select
            className="border text-black border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            name="player1Id"
            value={formData.player1Id}
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar...</option>
            {players.map((player) => (
              <option key={player.id} value={player.id}>
                {player.name}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col">
          <span className="text-white font-medium">Jugador 2:</span>
          <select
            className="border text-black border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            name="player2Id"
            value={formData.player2Id}
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar...</option>
            {players.map((player) => (
              <option key={player.id} value={player.id}>
                {player.name}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col">
          <span className="text-white font-medium">Puntuación Jugador 1:</span>
          <input
            className="border text-black border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            type="number"
            name="playerOneScore"
            value={formData.playerOneScore}
            onChange={handleChange}
            min="0"
            required
          />
        </label>
        <label className="flex flex-col">
          <span className="text-white font-medium">Puntuación Jugador 2:</span>
          <input
            className="border text-black border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            type="number"
            name="playerTwoScore"
            value={formData.playerTwoScore}
            onChange={handleChange}
            min="0"
            required
          />
        </label>
        <label className="flex flex-col">
          <span className="text-white font-medium">Tipo:</span>
          <select
            className="border text-black border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar...</option>
            <option value="FRIENDLY">Amistoso</option>
            <option value="TOURNAMENT">Torneo</option>
          </select>
        </label>
        <button
          type="submit"
          className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition"
        >
          Agregar Partido
        </button>
      </form>
    </div>
  );
};

export default CreateMatchForm;
