import { Injectable } from '@angular/core';
import { Bruja } from '../interfaces/brujas.interface';
import { Firestore, addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export class BrujasService {

  brujasCollection = collection(this.firestore, "brujas_historicas");

  constructor(
    private firestore: Firestore
  ) { }


  //NUEVA
  async postBruja(bruja: Bruja): Promise<void> {
    try {
      const data = {
        nombre: bruja.nombre,
        apellido: bruja.apellido,
        fecha_nacimiento: bruja.fecha_nacimiento,
        fecha_defuncion: bruja.fecha_defuncion,
        tipo_de_muerte: bruja.tipo_de_muerte,
        lugar_de_nacimiento: bruja.lugar_de_nacimiento,
        lugar_de_ejecucion: bruja.lugar_de_ejecucion,
        imagen: bruja.imagen,
        historia: bruja.historia
      };

      await addDoc(this.brujasCollection, data);
    } catch (error) {
      console.error(error);
    }
  }

  //LISTAR
  async getBrujas(): Promise<Map<string, Bruja>> {
    try {
      const mapa: Map<string, Bruja> = new Map();

      const brujasSnapshot = await getDocs(this.brujasCollection);

      brujasSnapshot.docs.forEach(doc => {
        const bruja = doc.data() as Bruja;
        mapa.set(doc.id, bruja);
      })

      return mapa;
    } catch (error) {
      console.log(error);
      return new Map();
    }
  }

  //ELIMINAR 
  async deleteBruja(id: string): Promise<void> {
    try {
      const brujaDoc = doc(this.brujasCollection, id);
      const brujaSnapshot = await getDoc(brujaDoc);

      if (!brujaSnapshot.exists()) throw new Error("No se encontró la bruja");

      await deleteDoc(brujaDoc);
    } catch (error) {
      console.error(error);
    }
  }

  //EDITAR - A
  async getBruja(id: string): Promise<Bruja> {
    try {
      const brujaDoc = doc(this.brujasCollection, id);
      const brujaSnapshot = await getDoc(brujaDoc);

      if (!brujaSnapshot.exists()){
        console.error('No existe la bruja');
        return null as unknown as Bruja;
      }

      const bruja = brujaSnapshot.data() as Bruja;
      return bruja;
    } catch (error) {
      console.log(error);
      return null as unknown as Bruja;
    }
  }

  //EDITAR - B
  async putBruja(id: string, bruja: Bruja): Promise<void> {
    try {
      const brujaDoc = doc(this.brujasCollection, id);
      const brujaSnapshot = await getDoc(brujaDoc);

      if (!brujaSnapshot.exists()) throw new Error("No se encontró la bruja");

      const data = {
        nombre: bruja.nombre,
        apellido: bruja.apellido,
        fecha_nacimiento: bruja.fecha_nacimiento,
        fecha_defuncion: bruja.fecha_defuncion,
        tipo_de_muerte: bruja.tipo_de_muerte,
        lugar_de_nacimiento: bruja.lugar_de_nacimiento,
        lugar_de_ejecucion: bruja.lugar_de_ejecucion,
        imagen: bruja.imagen,
        historia: bruja.historia
      }

      await setDoc(brujaDoc, data);
      console.log('Bruja actualizada');
    } catch (error) {
      console.error(error);
    }
  }

}


  /*  postBruja(bruja: Bruja): Observable<Bruja> {
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
   
     getBrujas(): Observable<Bruja[]> {
      return this.http.get<Bruja[]>(this.url)
        .pipe(
          catchError((error: any) => {
            console.error;
            return throwError(() => error);
          })
        )
    }

     deleteBruja(id: number): Observable<Bruja> {
      return this.http.delete<Bruja>(`${this.url}/${id}`)
        .pipe(
          catchError((error: any) => {
            console.error;
            return throwError(() => error);
          })
        )
    } 

    getBruja(id: number): Observable<Bruja> {
      return this.http.get<Bruja>(`${this.url}/${id}`)
        .pipe(
          catchError((error: any) => {
            console.error;
            return throwError(() => error);
          })
        )
    }

    putBruja(bruja: Bruja): Observable<Bruja> {
      return this.http.put<Bruja>(
        `${this.url}/${bruja.id}`,
        bruja,
        { headers: { 'Content-type': 'application/json' } }
      )
    } 

*/

