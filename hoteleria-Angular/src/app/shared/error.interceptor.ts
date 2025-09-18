import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import Swal from "sweetalert2";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((err: HttpErrorResponse) => {
                const mensaje = err.error?.mensaje || 'Ocurrio un error inesperado';
                const estatus = err.status;
                if(req.url.includes('login')){
                    Swal.fire({
                        icon: 'error',
                        title: 'Error de autenticacion',
                        text: 'Las claves ingresadas son incorrectas, verificalas e intenta nuevamente',
                    });
                }else{
                    switch(estatus){
                        case 400:
                            Swal.fire({
                                icon: 'error',
                                title: 'Solicitud incorrecta',
                                text: mensaje,
                            });
                            break;
                        case 401:
                            Swal.fire({
                                icon: 'warning',
                                title: 'No autenticado',
                                text: 'Tu sesion ha expirado o no estas autenticado, inicia sesion nuevamente',
                            });
                            break;
                        case 403:
                            Swal.fire({
                                icon: 'error',
                                title: 'Acceso denegado',
                                text: 'No tienes permisos para realizar esta accion',
                            });
                            break;
                        case 404:
                            Swal.fire({
                                icon: 'info',
                                title: 'No encontrado',
                                text: mensaje || 'El recurso solicitado no fue encontrado',
                            });
                            break;
                        case 409:
                            Swal.fire({
                                icon: 'warning',
                                title: 'Conflicto',
                                text: mensaje,
                            });
                            break;
                        case 500:
                            Swal.fire({
                                icon: 'error',
                                title: 'Error interno del servidor',
                                text: mensaje || 'Se produjo un error interno, intenta nuevamente mas tarde',
                            });
                            break;
                        case 0:
                            Swal.fire({
                                icon: 'error',
                                title: 'Sin conexion',
                                text: 'No se pudo conectar con el servidor, verifica tu conexion',
                            });
                            break;
                        default:
                            Swal.fire({
                                icon: 'error',
                                title: `Error ${estatus}`,
                                text: mensaje,
                            });
                            break;
                    }
                } return throwError(() => err);
            })
        );
    }
}
