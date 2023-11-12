import { ItemCarrito } from "./itemCarrito.interface";

export interface Compra{
    userId: string,
    fecha: string,
    items: ItemCarrito[],
    total: number,
    estado: string,
    idDoc?: string
}