import { useState } from "react";
import { Player } from "../types";

interface CreatePlayerFormProps {
  onCreate: (player: Omit<Player, "id">) => void;
}

const CreatePlayerForm: React.FC<CreatePlayerFormProps> = ({ onCreate }) => {
  const [formData, setFormData] = useState<Omit<Player, "id">>({
    name: "",
    description: "",
    cups: 0,
    avatar: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate(formData);
    setFormData({ name: "", description: "", cups: 0, avatar: "" });
  };

  return (
    <div className="player-form">
      <h2>Crear Jugador</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Descripción:
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </label>
        <label>
          Cups:
          <input
            type="number"
            name="cups"
            value={formData.cups}
            onChange={handleChange}
            min="0"
          />
        </label>
        <label>
          Avatar (URL):
          <input
            type="url"
            name="avatar"
            value={formData.avatar}
            onChange={handleChange}
            placeholder="https://example.com/avatar.jpg"
          />
        </label>
        <button type="submit">Agregar Jugador</button>
      </form>
    </div>
  );
};

export default CreatePlayerForm;
