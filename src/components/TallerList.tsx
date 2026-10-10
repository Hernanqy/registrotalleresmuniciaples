import type { Taller } from "../types/taller";
import TallerCard from "./TallerCard";

type Props = {
  talleres: Taller[];
  onEditar: (taller: Taller) => void;
  onEliminar: (id: string) => void;
};

export default function TallerList({
  talleres,
  onEditar,
  onEliminar,
}: Props) {
  if (talleres.length === 0) {
    return <div className="empty-state">No hay talleres registrados.</div>;
  }

  return (
    <div className="taller-grid">
      {talleres.map((taller) => (
        <TallerCard
          key={taller.id}
          taller={taller}
          onEditar={onEditar}
          onEliminar={onEliminar}
        />
      ))}
    </div>
  );
}
