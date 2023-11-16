import { Injectable, inject } from '@angular/core';
import { Producto } from '../interfaces/producto.interface';
import { Firestore, addDoc, collection, deleteDoc, doc, getDoc, setDoc, getDocs, query, orderBy, limit, where, startAt, endAt} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private firestore: Firestore = inject(Firestore);
  
  constructor() { }

  async postProducto(producto: Producto):Promise<void>{
    try{
      console.log(producto);
      const db = this.firestore;
      const productsCollection = collection(db, 'products');
      const data = {
        id_planta: producto.id_planta,
        nombre: producto.nombre,
        imagen: producto.imagen,
        precio: producto.precio,
        stock: producto.stock
      }
      await addDoc(productsCollection, data);
    }catch(error){
      console.error(error);
    }
  }


  async getProductos(filtro: string = ''):Promise<Map<string,Producto>>{
    try{
      const mapa: Map<string, Producto> = new Map() ;
      const db = this.firestore;
      const productsCollection = collection(db, 'products');
      const productsSnapshot = await getDocs(productsCollection);
      productsSnapshot.docs.forEach(doc => {
        const producto = doc.data() as Producto;
        mapa.set(doc.id, producto);
      });
      return mapa;
    }catch(error){
      console.error(error);
    }
    return new Map();
  }

  async getProductosDentroDeRango(min: number, max: number): Promise<Map<string, Producto>>{
    try{
      const mapa: Map<string, Producto> = new Map() ;
      const db = this.firestore;
      const productsCollection = collection(db, 'products');
      const q = query(productsCollection, where('precio', '>=', min), where('precio', '<=', max));
      const productsSnapshot = await getDocs(q);
      productsSnapshot.docs.forEach(doc => {
        const producto = doc.data() as Producto;
        mapa.set(doc.id, producto);
      });
      return mapa;
    }catch(error){
      console.error(error);
    }
    return new Map();
  }

  async getProductosPorNombre(nombre: string): Promise<Map<string, Producto>>{
    try {
      nombre = nombre.toLowerCase();
      const mapa: Map<string, Producto> = new Map();
      const db = this.firestore;
      const productsCollection = collection(db, 'products');
      const productsSnapshot = await getDocs(productsCollection);
      if(nombre === ''){
        productsSnapshot.docs.forEach(doc => {
          const producto = doc.data() as Producto;
          mapa.set(doc.id, producto);
        });
      }
      else{
        productsSnapshot.docs.forEach(doc => {
          const producto = doc.data() as Producto;
          const productoToLower = producto.nombre.toLowerCase();
          if(productoToLower.includes(nombre)){
            mapa.set(doc.id, producto);
          }
        });
      }
  
      return mapa;
    } catch (error) {
      console.error(error);
    }
    return new Map();
  }


  async deleteProducto(id: string):Promise<void>{
    try{
      const db = this.firestore;
      const productsCollection = collection(db, 'products');
      const productoDoc = doc(productsCollection, id);
      const productoSnapshot = await getDoc(productoDoc);
      if(!productoSnapshot.exists()){
        console.error('No existe el producto');
        return;
      }
      await deleteDoc(productoDoc);
      console.log('Producto eliminado');
    }catch(error){
      console.error(error);
    }
  }

  async getProducto(id: string):Promise<Producto>{
    try{
      const db = this.firestore;
      const productsCollection = collection(db, 'products');
      const productoDoc = doc(productsCollection, id);
      const productoSnapshot = await getDoc(productoDoc);
      if(!productoSnapshot.exists()){
        console.error('No existe el producto');
        return undefined as unknown as Producto;
      }
      const producto = productoSnapshot.data() as Producto;
      return producto;
    }catch(error){
      console.error(error);
    }
    return undefined as unknown as Producto;
  }

  async putProducto(idProducto:string, productoData: Producto): Promise<void>{
    try{
      const db = this.firestore;
      const productsCollection = collection(db, 'products');
      const productoDoc = doc(productsCollection, idProducto);
      const productoSnapshot = await getDoc(productoDoc);
      if(!productoSnapshot.exists()){
        console.error('No existe el producto');
        return;
      }
      const data = {
        id_planta: productoData.id_planta,
        nombre: productoData.nombre,
        imagen: productoData.imagen,
        precio: productoData.precio,
        stock: productoData.stock
      }

      await setDoc(productoDoc, data);
      
      console.log('Producto actualizado');
    }catch(error){
      console.error(error);
    }
  }

  async getPrecioProducto(idProducto: string): Promise<number>{
    let precio = 0;
    try{
      const db = this.firestore;
      const productsCollection = collection(db, 'products');
      const productoDoc = doc(productsCollection, idProducto);
      const productoSnapshot = await getDoc(productoDoc);
      if(!productoSnapshot){
        console.error('No existe el producto');
        return 0;
      }
      const docData = productoSnapshot.data();
      if(docData)
        precio = docData['precio'];
    }catch(error){
      console.error(error);
    }
    return precio;
  }

  async getNombreProducto(idProducto: string) : Promise<string>{
    let nombre = "";
    try{
      const db = this.firestore;
      const productsCollection = collection(db, 'products');
      const productoDoc = doc(productsCollection, idProducto);
      const productoSnapshot = await getDoc(productoDoc);
      if(!productoSnapshot){
        console.error('No existe el producto');
        return "";
      }
      const docData = productoSnapshot.data();
      if(docData)
        nombre = docData['nombre'];
    }catch(error){
      console.error(error);
    }
    return nombre;

  }

  async updateStock(idProducto: string, cantidad : number) : Promise <void>{
    try{
      const db = this.firestore;
      const productsCollection = collection(db, 'products');
      const productoDoc = doc(productsCollection, idProducto);
      const productoSnapshot = await getDoc(productoDoc);
      if(!productoSnapshot){
        console.error('No existe el producto');
        return;
      }
      const docData = productoSnapshot.data();
      if(docData){
        const stock : number= docData['stock'];
        const nuevoStock = stock - cantidad;
        await setDoc(productoDoc, {stock: nuevoStock}, {merge: true});
      }
    }catch(error){
      console.error(error);
    }
  }
}
