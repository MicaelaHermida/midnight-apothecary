import { Carrito } from "./carrito.interface";

export interface User{
    rol: string,
    nombre: string,
    apellido: string,
    telefono: string,
    direccion: string,
    depto: string,
    ciudad: string,
    provincia: string,
    codigoPostal: string,
    carrito: Carrito[],
    dni: string
}