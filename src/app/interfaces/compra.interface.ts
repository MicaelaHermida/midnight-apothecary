import { ItemCarrito } from "./itemCarrito.interface";

export interface Compra{
    userId: string,
    fecha: string,
    items: ItemCarrito[],
    total: number,
    estado: string,
    idDoc?: string
    //Habría que agregar además del estado, el tipo de envío, si es por encomienda, retiro en el local, etc. 
}