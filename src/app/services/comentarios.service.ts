import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Comentario } from '../interfaces/comentarios.interface';
import { Firestore, addDoc, doc, getFirestore, setDoc, collection, getDoc } from '@angular/fire/firestore';
import { AuthenticationService } from './authentication.service';
import { deleteDoc, getDocs } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {

  public brujaId: string = "";

  constructor(
    private router: Router,
    private http: HttpClient,
  ) { }


  //NUEVO
  async postComentario(comentario: string, userId: string): Promise<void> {
    try {
      const db = getFirestore();
      const comentariosCollection = collection(db, "comentarios");
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0'); // +1 porque los meses empiezan en 0
      const day = String(now.getDate()).padStart(2, '0');

      const formattedFecha = `${year}/${month}/${day}`;
      const data = {
        userId: userId,
        brujaId: this.brujaId,
        comentario: comentario,
        fecha: formattedFecha
      };

      await addDoc(comentariosCollection, data);
    } catch (error) {
      console.error(error); //agregar alerts
    }
  }


  //LISTAR
  async getComentariosBruja(): Promise<Map<string, Comentario>>{//muestra los comentarios
    try {
      const mapa: Map <string, Comentario> = new Map();

      const db = getFirestore();//obtiene la base de datos
      const comentariosCollection = collection(db, "comentarios");//obtiene la colección de comentarios
      const comentariosSnapshot = await getDocs(comentariosCollection);//obtiene los comentarios
      comentariosSnapshot.docs.forEach(doc => {
        const comentario = doc.data() as Comentario;
        mapa.set(doc.id, comentario);
      })
      
      return mapa; 
    } catch (error) {
      console.error(error);
      return new Map();
    }
  }

  //ELIMINAR 
  async deleteComentario(id: string): Promise<void> {
    try {
      const db = getFirestore();
      const comentariosCollection = collection(db, "comentarios");
      const comentarioDoc = doc(comentariosCollection, id);
      const comentarioSnapshot = await getDoc(comentarioDoc);
      if (!comentarioSnapshot.exists()) throw new Error("No se encontró el comentario");
      await deleteDoc(comentarioDoc);
    } catch (error) {
      console.error(error);
    }
  }


}

//EDITAR
/* async getComentario(id: String): Promise<Comentario> {
  try{
    const db = getFirestore();
    const comentariosCollection = collection(db, "comentarios");
    const comentariosList = comentariosSnapshot.docs.map(doc => doc.data() as Comentario);
    const comentario = comentariosList.find(comentario => comentario.id === id);
    if (!comentario) throw new Error("No se encontró el comentario");

  }
} */

    







