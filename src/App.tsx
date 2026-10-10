import { useEffect, useMemo, useState } from "react";

import ArtBackground from "./components/ArtBackground";
import Header from "./components/Header";
import Filtros from "./components/Filtros";
import Modal from "./components/Modal";
import TallerForm from "./components/TallerForm";
import TallerList from "./components/TallerList";

import {
  actualizarTaller,
  eliminarTaller,
  guardarTaller,
  obtenerTalleres,
} from "./services/api";

import type { Taller } from "./types/taller";

function App() {
  const [talleres, setTalleres] = useState<Taller[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [modalAbierto, setModalAbierto] = useState(false);
  const [tallerEditando, setTallerEditando] = useState<Taller | null>(null);

  useEffect(() => {
    cargar();
  }, []);

  async function cargar() {
    const data = await obtenerTalleres();
    setTalleres(data);
  }

  function nuevoTaller() {
    setTallerEditando(null);
    setModalAbierto(true);
  }

  function editarTaller(taller: Taller) {
    setTallerEditando(taller);
    setModalAbierto(true);
  }

  async function guardar(data: {
    escuela: string;
    nombre: string;
    horario: string;
    cupo: number;
    docente: string;
    lugar: string;
    direccion: string;
  }) {
    if (tallerEditando) {
      const actualizado = await actualizarTaller({
        ...tallerEditando,
        ...data,
      });

      setTalleres((actuales) =>
        actuales.map((t) =>
          t.id === actualizado.id ? actualizado : t
        )
      );
    } else {
      const nuevo = await guardarTaller(data);
      setTalleres((actuales) => [...actuales, nuevo]);
    }

    setModalAbierto(false);
    setTallerEditando(null);
  }

  async function eliminar(id: string) {
    if (!window.confirm("¿Eliminar este taller?")) return;

    await eliminarTaller(id);

    setTalleres((actuales) =>
      actuales.filter((t) => t.id !== id)
    );
  }

  const talleresFiltrados = useMemo(() => {
    const texto = busqueda.toLowerCase().trim();

    if (!texto) return talleres;

    return talleres.filter((taller) =>
      taller.nombre.toLowerCase().includes(texto) ||
      taller.escuela.toLowerCase().includes(texto) ||
      taller.docente.toLowerCase().includes(texto) ||
      taller.lugar.toLowerCase().includes(texto)
    );
  }, [talleres, busqueda]);

  return (
    <>
      <ArtBackground />

      <main className="app-container">
        <Header onNuevo={nuevoTaller} />

        <Filtros
          busqueda={busqueda}
          onBusqueda={setBusqueda}
        />

        <div className="result-count">
          {talleresFiltrados.length} talleres
        </div>

        <TallerList
          talleres={talleresFiltrados}
          onEditar={editarTaller}
          onEliminar={eliminar}
        />
      </main>

      <Modal
        abierto={modalAbierto}
        titulo={tallerEditando ? "Editar taller" : "Nuevo taller"}
        onCerrar={() => setModalAbierto(false)}
      >
        <TallerForm
          taller={tallerEditando}
          onGuardar={guardar}
          onCancelar={() => setModalAbierto(false)}
        />
      </Modal>
    </>
  );
}

export default App;
