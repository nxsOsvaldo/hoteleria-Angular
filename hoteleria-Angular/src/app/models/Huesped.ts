export interface HuespedRequest {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  numeroDocumento: string;
  nacionalidad: string;
  tipoDocumento: string;
}

export interface HuespedResponse {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  numeroDocumento: string;
  nacionalidad: string;
  tipoDocumento: string;
}
