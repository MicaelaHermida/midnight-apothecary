import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { Bruja } from '../interfaces/brujas.interface';

@Injectable({
  providedIn: 'root'
})

export class BrujasService {

  url: string = 'http://localhost:4000/brujas_historicas';

  constructor(private router: Router,
    private http: HttpClient) { }

  //NUEVA
  postBruja(bruja: Bruja): Observable<Bruja> {
    return this.http.post<Bruja>(
      this.url,
      bruja,
      { headers: { 'Content-type': 'application/json' } }
    ).pipe(
      catchError((error: any) => {
        console.error;
        return throwError(() => error);
      })
    )
  }

  //LISTAR
  getBrujas(): Observable<Bruja[]> {
    return this.http.get<Bruja[]>(this.url)
      .pipe(
        catchError((error: any) => {
          console.error;
          return throwError(() => error);
        })
      )
  }

  //ELIMINAR 
  deleteBruja(id: number): Observable<Bruja> {
    return this.http.delete<Bruja>(`${this.url}/${id}`)
      .pipe(
        catchError((error: any) => {
          console.error;
          return throwError(() => error);
        })
      )
  }

  //EDITAR - A
  getBruja(id: number): Observable<Bruja> {
    return this.http.get<Bruja>(`${this.url}/${id}`)
      .pipe(
        catchError((error: any) => {
          console.error;
          return throwError(() => error);
        })
      )
  }

  //EDITAR - B
  putBruja(bruja: Bruja): Observable<Bruja> {
    return this.http.put<Bruja>(
      `${this.url}/${bruja.id}`,
      bruja,
      { headers: { 'Content-type': 'application/json' } }
    )
  }








}
