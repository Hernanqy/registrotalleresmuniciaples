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
  guardando?: boolean;
};

export default function TallerForm({
  taller,
  onGuardar,
  onCancelar,
  guardando = false,
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

  function enfocarCampo(e: React.FocusEvent<HTMLElement>) {
    setTimeout(() => {
      e.currentTarget.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 250);
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
        <select
          value={form.escuela}
          onChange={(e) =>
            cambiarCampo("escuela", e.target.value)
          }
          onFocus={enfocarCampo}
          required
        >
          <option value="">Seleccionar escuela</option>

          <option value="Escuela Municipal de Ajedrez">
            Escuela Municipal de Ajedrez
          </option>

          <option value="Escuela Municipal de Artes Plásticas Leopoldo Bocazzi">
            Escuela Municipal de Artes Plásticas Leopoldo Bocazzi
          </option>

          <option value="Escuela Municipal de Cerámica Víctor Portarrieu">
            Escuela Municipal de Cerámica Víctor Portarrieu
          </option>

          <option value="Taller de Historietas VEO">
            Taller de Historietas VEO
          </option>

          <option value="Escuela Municipal de Artes Plásticas Sierras Bayas">
            Escuela Municipal de Artes Plásticas Sierras Bayas
          </option>

          <option value="Escuela Municipal de Danzas">
            Escuela Municipal de Danzas
          </option>

          <option value="Escuela Municipal de Cerámica Sierras Bayas">
            Escuela Municipal de Cerámica Sierras Bayas
          </option>

          <option value="Escuela Municipal de Teatro">
            Escuela Municipal de Teatro
          </option>

          <option value="Escuela Municipal de Música Hermanos Rossi">
            Escuela Municipal de Música Hermanos Rossi
          </option>

          <option value="Escuela Literaria Municipal Alfonsina">
            Escuela Literaria Municipal Alfonsina
          </option>

          <option value="Escuela Municipal de Orfebrería y Artesanías Tradicionales Armando Ferreira">
            Escuela Municipal de Orfebrería y Artesanías Tradicionales Armando Ferreira
          </option>

          <option value="Escuela de Artística Integrada">
            Escuela de Artística Integrada
          </option>
        </select>
      </div>

      <div className="form-group full">
        <input
          value={form.nombre}
          onChange={(e) =>
            cambiarCampo("nombre", e.target.value)
          }
          onFocus={enfocarCampo}
          placeholder="Nombre del taller"
          required
        />
      </div>

      <div className="form-group">
        <input
          value={form.horario}
          onChange={(e) =>
            cambiarCampo("horario", e.target.value)
          }
          onFocus={enfocarCampo}
          placeholder="Horario"
          required
        />
      </div>

      <div className="form-group">
        <input
          type="number"
          min="0"
          inputMode="numeric"
          value={form.cupo || ""}
          onChange={(e) =>
            cambiarCampo("cupo", Number(e.target.value))
          }
          onFocus={enfocarCampo}
          placeholder="Cupo"
        />
      </div>

      <div className="form-group full">
        <input
          value={form.docente}
          onChange={(e) =>
            cambiarCampo("docente", e.target.value)
          }
          onFocus={enfocarCampo}
          placeholder="Docente"
          required
        />
      </div>

      <div className="form-group full">
        <input
          value={form.lugar}
          onChange={(e) =>
            cambiarCampo("lugar", e.target.value)
          }
          onFocus={enfocarCampo}
          placeholder="Lugar"
          required
        />
      </div>

      <div className="form-group full direccion-group">
        <input
          value={form.direccion}
          onChange={(e) =>
            cambiarCampo("direccion", e.target.value)
          }
          onFocus={enfocarCampo}
          placeholder="Dirección"
          autoComplete="street-address"
        />
      </div>

      <div className="form-actions">
        <button
          type="button"
          className="secondary-button"
          onClick={onCancelar}
          disabled={guardando}
        >
          Cancelar
        </button>

        <button
          type="submit"
          className="primary-button"
          disabled={guardando}
        >
          {guardando ? "Guardando..." : "Guardar"}
        </button>
      </div>
    </form>
  );
}
