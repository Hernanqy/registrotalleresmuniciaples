import {
  CalendarClock,
  MapPin,
  Pencil,
  Trash2,
  User,
  Users,
} from "lucide-react";

import type { Taller } from "../types/taller";

type Props = {
  taller: Taller;
  onEditar: (taller: Taller) => void;
  onEliminar: (id: string) => void;
};

export default function TallerCard({
  taller,
  onEditar,
  onEliminar,
}: Props) {
  return (
    <article className="taller-card">
      <div className="card-top">
        <div>
          <div className="school-label">{taller.escuela}</div>
          <h2>{taller.nombre}</h2>
        </div>

        <div className="card-actions">
          <button
            className="icon-button"
            onClick={() => onEditar(taller)}
            title="Editar"
          >
            <Pencil size={18} />
          </button>

          <button
            className="icon-button danger"
            onClick={() => onEliminar(taller.id)}
            title="Eliminar"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <div className="card-data">
        <div>
          <CalendarClock size={18} />
          <span>{taller.horario}</span>
        </div>

        <div>
          <Users size={18} />
          <span>Cupo: {taller.cupo}</span>
        </div>

        <div>
          <User size={18} />
          <span>{taller.docente}</span>
        </div>

        <div>
          <MapPin size={18} />
          <span>
            {taller.lugar}
            {taller.direccion ? ` · ${taller.direccion}` : ""}
          </span>
        </div>
      </div>
    </article>
  );
}
