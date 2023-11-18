import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Suscripcion } from '../interfaces/suscripcion.interface';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SuscripcionService {

  url = 'http://localhost:4000/suscriptos';

  constructor(
    private http: HttpClient
  ) { }

  postSuscripcion(suscripcion: Suscripcion): Observable<Suscripcion> {
    return this.http.post<Suscripcion>(
      this.url,
      suscripcion,
      { headers: { 'Content-Type': 'application/json' } }
    ).pipe(
      catchError((error: any) => {
        return throwError(() => {
          console.log(error);
        });
      })
    )
  }
}
