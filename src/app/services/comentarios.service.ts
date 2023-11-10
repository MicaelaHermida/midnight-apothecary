import { Injectable } from '@angular/core';
import { Comentario } from '../interfaces/comentarios.interface';
import { Firestore, addDoc, doc, getFirestore, setDoc, collection, getDoc, deleteDoc, getDocs } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})

export class ComentariosService {

  public brujaId: string = "";
  comentariosCollection = collection(this.firestore, "comentarios");

  constructor(
    private firestore: Firestore
  ) { }


  //NUEVO
  async postComentario(comentario: string, userId: string): Promise<void> {
    try {
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

      await addDoc(this.comentariosCollection, data);
    } catch (error) {
      console.error(error); //agregar alerts
    }
  }


  //LISTAR
  async getComentariosBruja(): Promise<Map<string, Comentario>> {//muestra los comentarios
    try {
      const mapa: Map<string, Comentario> = new Map();
      const comentariosSnapshot = await getDocs(this.comentariosCollection);//obtiene los comentarios

      comentariosSnapshot.forEach(doc => {
        const comentario = doc.data() as Comentario;
        if (comentario.brujaId === this.brujaId) {
          mapa.set(doc.id, comentario);
        }
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
      console.log(id);
      const comentarioDoc = doc(this.comentariosCollection, id);
      const comentarioSnapshot = await getDoc(comentarioDoc);

      if (!comentarioSnapshot.exists()) {
        console.error('No existe el comentario');
        return;
      }

      await deleteDoc(comentarioDoc);
    } catch (error) {
      console.error(error);
    }
  }

  //EDITAR - A
  async getComentario(id: string): Promise<Comentario> {
    try {
      const comentarioDoc = doc(this.comentariosCollection, id);
      const comentarioSnapshot = await getDoc(comentarioDoc);

      if (!comentarioSnapshot.exists()) {
        console.error('No existe el comentario');
        return null as unknown as Comentario;
      }

      const comentario = comentarioSnapshot.data() as Comentario;
      return comentario;
    } catch (error) {
      console.log(error);
      return null as unknown as Comentario;
    }
  }

  //EDITAR - B
  async putComentario(id: string, comentario: string): Promise<void> {
    try {
      const comentarioDoc = doc(this.comentariosCollection, id);
      const comentarioSnapshot = await getDoc(comentarioDoc);

      if (!comentarioSnapshot.exists()) throw new Error("No se encontró el comentario");

      const data = {
        comentario: comentario
      }
      await setDoc(comentarioDoc, data);
      console.log("Comentario actualizado");
    } catch (error) {
      console.log(error);
    }
  }


}









