import { Search } from "lucide-react";

type Props = {
  busqueda: string;
  onBusqueda: (valor: string) => void;
};

export default function Filtros({ busqueda, onBusqueda }: Props) {
  return (
    <div className="filters">
      <div className="search-box">
        <Search size={18} />

        <input
          value={busqueda}
          onChange={(e) => onBusqueda(e.target.value)}
          placeholder="Buscar taller, escuela o docente"
        />
      </div>
    </div>
  );
}
