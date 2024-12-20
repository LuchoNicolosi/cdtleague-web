import { useState } from "react";
import { Player } from "../utils";

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
    <div className="player-form  bg-green-700 p-8 rounded-lg shadow-lg max-w-md mx-auto">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <label className="flex flex-col">
          <span className="text-white font-medium">Nombre:</span>
          <input
            type="text"
            className="border text-black border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label className="flex flex-col">
          <span className="text-white font-medium">Descripción:</span>
          <input
            type="text"
            className="border text-black border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </label>
        <label className="flex flex-col">
          <span className="text-white font-medium">Cups:</span>
          <input
            type="number"
            className="border text-black border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            name="cups"
            value={formData.cups}
            onChange={handleChange}
            min="0"
          />
        </label>
        <label className="flex flex-col">
          <span className="text-white font-medium">Avatar (OPCIONAL):</span>
          <input
            type="url"
            className="border text-black border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            name="avatar"
            value={formData.avatar}
            onChange={handleChange}
            placeholder="https://example.com/avatar.jpg"
          />
        </label>
        <button
          type="submit"
          className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition"
        >
          Agregar Jugador
        </button>
      </form>
    </div>
  );
};

export default CreatePlayerForm;
