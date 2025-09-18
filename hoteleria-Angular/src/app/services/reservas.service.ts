import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { ReservaRequest, ReservaResponse } from '../models/Reserva';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {

  private apiUrl: string = environment.apiUrl + 'reservas/';

  constructor(private http: HttpClient) {}

  getReservas(): Observable<ReservaResponse[]> {
    return this.http.get<ReservaResponse[]>(this.apiUrl).pipe(
      map(reservas => reservas.sort((a, b) => new Date(b.fecha_entrada).getTime() - new Date(a.fecha_entrada).getTime())),
      catchError(error => {
        console.error('Error al obtener las reservas', error);
        return of([]);
      })
    );
  }

  postReserva(reserva: ReservaRequest): Observable<ReservaResponse> {
    return this.http.post<ReservaResponse>(this.apiUrl, reserva).pipe(
      catchError(error => {
        console.error('Error al registrar la reserva', error);
        throw error;
      })
    );
  }

  putReserva(reserva: ReservaRequest, reservaId: number): Observable<ReservaResponse> {
    return this.http.put<ReservaResponse>(`${this.apiUrl}${reservaId}`, reserva).pipe(
      catchError(error => {
        console.error('Error al actualizar la reserva', error);
        throw error;
      })
    );
  }

  deleteReserva(reservaId: number): Observable<ReservaResponse> {
    return this.http.delete<ReservaResponse>(`${this.apiUrl}${reservaId}`).pipe(
      catchError(error => {
        console.error('Error al eliminar la reserva', error);
        throw error;
      })
    );
  }
}