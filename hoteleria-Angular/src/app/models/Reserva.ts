export interface ReservaRequest {
  huespedId: number;
  habitacionId: number;
  fechaEntrada: string; // formato ISO: 'YYYY-MM-DD'
  fechaSalida: string;
  noches: number;
  total: number;
  estado: 'Confirmada' | 'En curso' | 'Finalizada' | 'Cancelada';
}

export interface ReservaResponse {
  id: number;
  huespedId: number;
  habitacionId: number;
  fechaEntrada: string;
  fechaSalida: string;
  noches: number;
  total: number;
  estado: 'Confirmada' | 'En curso' | 'Finalizada' | 'Cancelada';
  huespedNombre?: string;
  habitacionNumero?: number;
}
