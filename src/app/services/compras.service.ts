import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, getDocs } from '@angular/fire/firestore';
import { Compra } from '../interfaces/compra.interface';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {

  constructor(private firestore: Firestore) {}

  async postCompra(compra: Compra): Promise<void> {
    try {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0'); // +1 porque los meses empiezan en 0
      const day = String(now.getDate()).padStart(2, '0');
      const formattedFecha = `${year}/${month}/${day}`;
      const comprasCollection = collection(this.firestore, "compras");
      const data = {
        userId: compra.userId,
        fecha: formattedFecha,
        items: compra.items,
        total: compra.total,
        estado: compra.estado
      }
      await addDoc(comprasCollection, data);
    } catch (error) {
      console.error(error);
    }
  }

  async getComprasPorUsuario(userId: string): Promise<Compra[]>{
    try{
      const comprasCollection = collection(this.firestore, "compras");
      const comprasSnapshot = await getDocs(comprasCollection);
      const compras : Compra[]= [];
      comprasSnapshot.forEach(doc => {
        const compra = doc.data();
        compra['idDoc'] = doc.id;
        if(compra['userId'] === userId){
          compras.push(compra as Compra);
        }
      });
      return compras;
    }catch(error){
      console.error(error);
      return [] as Compra[];
    }
  }
}


