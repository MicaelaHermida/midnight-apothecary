import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { Comentario } from '../interfaces/comentarios.interface';
import { Firestore, addDoc, doc, getFirestore, setDoc, collection } from '@angular/fire/firestore';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {
  url: string = 'http://localhost:4000/comentarios';
  public brujaId: number = 0;

  constructor(
    private router: Router,
    private http: HttpClient,
  ) { }


  //NUEVO

  async postComentario(comentario: string, userId: number): Promise<void> {
    try {
      const db = getFirestore();
      const comentariosCollection = collection(db, "comentarios");
      const data = {
        userId: userId,
        brujaId: this.brujaId,
        comentario: comentario,
        fecha: new Date()
      };

      await addDoc(comentariosCollection, data);
    }catch(error){
      console.error(error); //agregar alerts
    }
  }


  //LISTAR
  getComentarios(): Observable<Comentario[]> {
    return this.http.get<Comentario[]>(this.url)
      .pipe(
        catchError((error: any) => {
          console.error;
          return throwError(() => error);
        })
      )
  }

  //ELIMINAR
  deleteComentario(id: number): Observable<Comentario> {
    return this.http.delete<Comentario>(`${this.url}/${id}`)
      .pipe(
        catchError((error: any) => {
          console.error;
          return throwError(() => error);
        })
      )
  }





}
