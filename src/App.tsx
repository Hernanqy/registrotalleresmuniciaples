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

  const [mensaje, setMensaje] = useState("");
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    cargar();
  }, []);

  async function cargar() {
    try {
      const data = await obtenerTalleres();
      setTalleres(data);
    } catch (error) {
      console.error(error);
    }
  }

  function nuevoTaller() {
    setTallerEditando(null);
    setModalAbierto(true);
  }

  function editarTaller(taller: Taller) {
    setTallerEditando(taller);
    setModalAbierto(true);
  }

  function reproducirSonido() {
    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as typeof window & {
          webkitAudioContext?: typeof AudioContext;
        }).webkitAudioContext;

      if (!AudioContextClass) return;

      const ctx = new AudioContextClass();
      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();

      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(880, ctx.currentTime);
      oscillator.frequency.setValueAtTime(1175, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.0001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.15, ctx.currentTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.22);

      oscillator.connect(gain);
      gain.connect(ctx.destination);

      oscillator.start();
      oscillator.stop(ctx.currentTime + 0.24);
    } catch (error) {
      console.error("No se pudo reproducir el sonido", error);
    }
  }

  function mostrarGuardado() {
    setMensaje("Guardado correctamente");
    reproducirSonido();

    setTimeout(() => {
      setMensaje("");
    }, 2600);
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
    if (guardando) return;

    try {
      setGuardando(true);

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

        setTalleres((actuales) => [
          ...actuales,
          nuevo,
        ]);
      }

      setModalAbierto(false);
      setTallerEditando(null);

      mostrarGuardado();

    } catch (error) {
      console.error(error);

      setMensaje("Error al guardar");

      setTimeout(() => {
        setMensaje("");
      }, 3000);

    } finally {
      setGuardando(false);
    }
  }

  async function eliminar(id: string) {
    if (!window.confirm("¿Eliminar este taller?")) return;

    try {
      await eliminarTaller(id);

      setTalleres((actuales) =>
        actuales.filter((t) => t.id !== id)
      );
    } catch (error) {
      console.error(error);
    }
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

      {mensaje && (
        <div
          className={`toast ${
            mensaje.startsWith("Error")
              ? "toast-error"
              : "toast-success"
          }`}
        >
          {mensaje}
        </div>
      )}

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
        titulo={
          tallerEditando
            ? "Editar taller"
            : "Nuevo taller"
        }
        onCerrar={() => {
          if (!guardando) {
            setModalAbierto(false);
          }
        }}
      >
        <TallerForm
          taller={tallerEditando}
          onGuardar={guardar}
          onCancelar={() => {
            if (!guardando) {
              setModalAbierto(false);
            }
          }}
          guardando={guardando}
        />
      </Modal>
    </>
  );
}

export default App;
