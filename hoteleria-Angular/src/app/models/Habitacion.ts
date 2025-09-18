export interface HabitacionRequest {
  numero: number;
  tipo: 'Individual' | 'Doble' | 'Suite';
  descripcion?: string;
  precio: number;
  capacidad: number;
  estado: 'DISPONIBLE' | 'OCUPADA' | 'LIMPIEZA' | 'MANTENIMIENTO';
}

export interface HabitacionResponse {
  id: number;
  numero: number;
  tipo: 'Individual' | 'Doble' | 'Suite';
  descripcion?: string;
  precio: number;
  capacidad: number;
  estado: 'DISPONIBLE' | 'OCUPADA' | 'LIMPIEZA' | 'MANTENIMIENTO';
}
