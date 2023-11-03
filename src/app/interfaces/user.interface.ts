import { Carrito } from "./carrito.interface";

export interface User{
    isAdmin: boolean,
    nombre: string,
    apellido: string,
    telefono: string,
    direccion: string,
    ciudad: string,
    provincia: string,
    codigoPostal: string,
    carrito: Carrito[],
    id: number
}