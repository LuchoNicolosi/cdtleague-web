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
  const [formData, setFormData] = useState<Match>({
    player1: "",
    player2: "",
    score1: 0,
    score2: 0,
    type: "",
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
      player1: "",
      player2: "",
      score1: 0,
      score2: 0,
      type: "",
    });
  };

  return (
    <div className="match-form">
      <h2>Crear Partido</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Jugador 1:
          <select
            name="player1"
            value={formData.player1}
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar...</option>
            {players.map((player) => (
              <option key={player.id} value={player.name}>
                {player.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Jugador 2:
          <select
            name="player2"
            value={formData.player2}
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar...</option>
            {players.map((player) => (
              <option key={player.id} value={player.name}>
                {player.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Puntuación Jugador 1:
          <input
            type="number"
            name="score1"
            value={formData.score1}
            onChange={handleChange}
            min="0"
            required
          />
        </label>
        <label>
          Puntuación Jugador 2:
          <input
            type="number"
            name="score2"
            value={formData.score2}
            onChange={handleChange}
            min="0"
            required
          />
        </label>
        <label>
          Tipo:
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Agregar Partido</button>
      </form>
    </div>
  );
};

export default CreateMatchForm;
