import { Plus } from "lucide-react";

type Props = {
  onNuevo: () => void;
};

export default function Header({ onNuevo }: Props) {
  return (
    <header className="header">
      <div>
        <h1>Registro Único</h1>
        <span>Escuelas Municipales de Artística</span>
      </div>

      <button className="primary-button" onClick={onNuevo}>
        <Plus size={18} />
        Nuevo taller
      </button>
    </header>
  );
}
