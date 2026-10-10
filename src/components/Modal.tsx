import type { ReactNode } from "react";
import { X } from "lucide-react";

type Props = {
  abierto: boolean;
  titulo: string;
  onCerrar: () => void;
  children: ReactNode;
};

export default function Modal({
  abierto,
  titulo,
  onCerrar,
  children,
}: Props) {
  if (!abierto) return null;

  return (
    <div className="modal-backdrop" onMouseDown={onCerrar}>
      <div
        className="modal"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2>{titulo}</h2>

          <button className="icon-button" onClick={onCerrar}>
            <X size={20} />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}
