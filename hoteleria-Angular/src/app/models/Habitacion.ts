export interface HabitacionRequest {
  numero: number;
  tipo: 'Individual' | 'Doble' | 'Suite';
  descripcion?: string;
  precio: number;
  capacidad: number;
  estado: 'Disponible' | 'Ocupada' | 'Limpieza' | 'Mantenimiento';
}

export interface HabitacionResponse {
  id: number;
  numero: number;
  tipo: 'Individual' | 'Doble' | 'Suite';
  descripcion?: string;
  precio: number;
  capacidad: number;
  estado: 'Disponible' | 'Ocupada' | 'Limpieza' | 'Mantenimiento';
}
