import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Contacto } from '../interfaces/contacto.interface';

@Injectable({
  providedIn: 'root'
})

export class ContactoService {

  url = 'http://localhost:4000/consultas';

  constructor(
    private http: HttpClient
  ) { }

  guardarContacto(contacto: Contacto): Observable<Contacto> {
    return this.http.post<Contacto>(
      this.url, 
      contacto,
      {headers: {'Content-Type': 'application/json'}}
    ).pipe(
      catchError((error: any) => {
        return throwError(() =>{
          console.log(error);
        });
      })
    )
  } 
}
