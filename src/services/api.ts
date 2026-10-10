import type { Taller } from "../types/taller";

const API_URL = import.meta.env.VITE_API_URL || "";
const STORAGE_KEY = "registro-unico-escuelas";

function getLocalData(): Taller[] {
  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) return [];

  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function saveLocalData(data: Taller[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export async function obtenerTalleres(): Promise<Taller[]> {
  if (!API_URL) {
    return getLocalData();
  }

  const response = await fetch(`${API_URL}?action=list`);

  if (!response.ok) {
    throw new Error("No se pudieron obtener los talleres");
  }

  const data = await response.json();

  return data.talleres || [];
}

export async function guardarTaller(
  taller: Omit<Taller, "id" | "actualizado">
): Promise<Taller> {
  if (!API_URL) {
    const talleres = getLocalData();

    const nuevo: Taller = {
      ...taller,
      id: crypto.randomUUID(),
      actualizado: new Date().toISOString(),
    };

    saveLocalData([...talleres, nuevo]);

    return nuevo;
  }

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
    body: JSON.stringify({
      action: "create",
      taller,
    }),
  });

  const data = await response.json();

  return data.taller;
}

export async function actualizarTaller(taller: Taller): Promise<Taller> {
  if (!API_URL) {
    const talleres = getLocalData();

    const actualizado = {
      ...taller,
      actualizado: new Date().toISOString(),
    };

    const nuevos = talleres.map((item) =>
      item.id === taller.id ? actualizado : item
    );

    saveLocalData(nuevos);

    return actualizado;
  }

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
    body: JSON.stringify({
      action: "update",
      taller,
    }),
  });

  const data = await response.json();

  return data.taller;
}

export async function eliminarTaller(id: string): Promise<void> {
  if (!API_URL) {
    const talleres = getLocalData();

    saveLocalData(talleres.filter((item) => item.id !== id));

    return;
  }

  await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
    body: JSON.stringify({
      action: "delete",
      id,
    }),
  });
}
