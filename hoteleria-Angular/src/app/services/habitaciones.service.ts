import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { HabitacionRequest, HabitacionResponse } from '../models/Habitacion';

@Injectable({
  providedIn: 'root'
})
export class HabitacionesService {

  private apiUrl: string =environment.apiUrl+'habitaciones/';

  constructor(private http:HttpClient) { }

  getHabitaciones(): Observable<HabitacionResponse[]>
    {
      return this.http.get<HabitacionResponse[]>(this.apiUrl).pipe(
      map(habitacion=>habitacion.sort()),
      catchError(error=> {
        console.error('Error al obtener las habitaciones',error);
        return of([]);
      }));
    }

    postHabitacion(habitacion: HabitacionRequest): Observable<HabitacionResponse>{
      return this.http.post<HabitacionResponse>(this.apiUrl,habitacion).pipe(
        catchError(error=>{
          console.log("Error al registrar las habitaciones",error);
          throw error;
        })
      );
          }
    putHabitacion(habitacion: HabitacionRequest, habitacionId: number): Observable<HabitacionResponse>{
      return this.http.put<HabitacionResponse>(`${this.apiUrl}${habitacionId}`,habitacion).pipe(
        catchError(error=>{
          console.log("Error al registrar las habitaciones",error);
          throw error;
        })
      );
      }

      deleteHabitacion(habitacionId: number): Observable<HabitacionResponse>{
      return this.http.delete<HabitacionResponse>(`${this.apiUrl}${habitacionId}`).pipe(
        catchError(error=>{
          console.log("Error al eliminar las habitaciones",error);
          throw error;
        })
      );
      }

    
}
