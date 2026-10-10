import { useEffect, useState } from "react";
import type { Taller } from "../types/taller";

type FormData = {
  escuela: string;
  nombre: string;
  horario: string;
  cupo: number;
  docente: string;
  lugar: string;
  direccion: string;
};

const initialState: FormData = {
  escuela: "",
  nombre: "",
  horario: "",
  cupo: 0,
  docente: "",
  lugar: "",
  direccion: "",
};

type Props = {
  taller?: Taller | null;
  onGuardar: (data: FormData) => void;
  onCancelar: () => void;
};

export default function TallerForm({
  taller,
  onGuardar,
  onCancelar,
}: Props) {
  const [form, setForm] = useState<FormData>(initialState);

  useEffect(() => {
    if (taller) {
      setForm({
        escuela: taller.escuela,
        nombre: taller.nombre,
        horario: taller.horario,
        cupo: taller.cupo,
        docente: taller.docente,
        lugar: taller.lugar,
        direccion: taller.direccion,
      });
    } else {
      setForm(initialState);
    }
  }, [taller]);

  function cambiarCampo(
    campo: keyof FormData,
    valor: string | number
  ) {
    setForm((prev) => ({
      ...prev,
      [campo]: valor,
    }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();

    if (
      !form.escuela.trim() ||
      !form.nombre.trim() ||
      !form.horario.trim() ||
      !form.docente.trim() ||
      !form.lugar.trim()
    ) {
      return;
    }

    onGuardar(form);
  }

  return (
    <form className="taller-form" onSubmit={submit}>
      <div className="form-group full">
        <input
          value={form.escuela}
          onChange={(e) => cambiarCampo("escuela", e.target.value)}
          placeholder="Escuela"
          required
        />
      </div>

      <div className="form-group full">
        <input
          value={form.nombre}
          onChange={(e) => cambiarCampo("nombre", e.target.value)}
          placeholder="Nombre del taller"
          required
        />
      </div>

      <div className="form-group">
        <input
          value={form.horario}
          onChange={(e) => cambiarCampo("horario", e.target.value)}
          placeholder="Horario"
          required
        />
      </div>

      <div className="form-group">
        <input
          type="number"
          min="0"
          value={form.cupo || ""}
          onChange={(e) => cambiarCampo("cupo", Number(e.target.value))}
          placeholder="Cupo"
        />
      </div>

      <div className="form-group full">
        <input
          value={form.docente}
          onChange={(e) => cambiarCampo("docente", e.target.value)}
          placeholder="Docente"
          required
        />
      </div>

      <div className="form-group full">
        <input
          value={form.lugar}
          onChange={(e) => cambiarCampo("lugar", e.target.value)}
          placeholder="Lugar"
          required
        />
      </div>

      <div className="form-group full">
        <input
          value={form.direccion}
          onChange={(e) => cambiarCampo("direccion", e.target.value)}
          placeholder="Dirección"
        />
      </div>

      <div className="form-actions">
        <button
          type="button"
          className="secondary-button"
          onClick={onCancelar}
        >
          Cancelar
        </button>

        <button type="submit" className="primary-button">
          Guardar
        </button>
      </div>
    </form>
  );
}
