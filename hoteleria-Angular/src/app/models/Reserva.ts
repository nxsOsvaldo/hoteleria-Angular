export interface ReservaRequest {
  huesped_id: number;
  habitacion_id: number;
  fecha_entrada: string; // formato ISO: 'YYYY-MM-DD'
  fecha_salida: string;
  noches: number;
  total: number;
  estado: 'Confirmada' | 'En curso' | 'Finalizada' | 'Cancelada';
}

export interface ReservaResponse {
  id: number;
  huesped_id: number;
  habitacion_id: number;
  fecha_entrada: string;
  fecha_salida: string;
  noches: number;
  total: number;
  estado: 'Confirmada' | 'En curso' | 'Finalizada' | 'Cancelada';
  huespedNombre?: string;
  habitacionNumero?: number;
}
