import { Injectable, inject } from '@angular/core';
import { Carrito } from '../interfaces/carrito.interface';
import { AuthenticationService } from './authentication.service';
import { Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private firestore: Firestore = inject(Firestore);

  carrito: Carrito[] = [];

  constructor(private authService: AuthenticationService) { }

  async getCarritoFromUsuario(): Promise<void> {
    try {
      const user = await this.authService.getAllCurrentUserData();
      this.carrito = user.carrito;
    } catch (error) {
      console.error(error);
    }
  }

  getCarrito(): Carrito[] {
    return this.carrito;
  }

  async actualizarCarrito(carrito: Carrito): Promise<void> {
    try {
      const user = await this.authService.getAllCurrentUserData();
      const productoEnCarrito = user.carrito.find((item) => item.id_producto === carrito.id_producto);

      if (productoEnCarrito) {
        // Si el producto ya está en el carrito, suma la cantidad
        productoEnCarrito.cantidad += carrito.cantidad;
      } else {
        // Si el producto no se encuentra en el carrito, lo agrega
        user.carrito.push(carrito);
      }
      const id = this.authService.getCurrentUserId();
      await this.authService.updateUserData(id, user);
      this.carrito = user.carrito;
    } catch (error) {
      console.error(error);
    }
  }

  async deleteProductoCarrito(idProducto: string, cantidad: number): Promise<void> {
    try {
      const user = await this.authService.getAllCurrentUserData();
      if (user) {
        const index = user.carrito.findIndex((item) => item.id_producto === idProducto);

        if (index !== -1) {
          if (user.carrito[index].cantidad >= cantidad) {
            user.carrito[index].cantidad -= cantidad;
          } else {
            user.carrito[index].cantidad = 0;
          }

          if (user.carrito[index].cantidad <= 0) {
            user.carrito.splice(index, 1);
          }

          const id = this.authService.getCurrentUserId();
          await this.authService.updateUserData(id, user);
          this.carrito = user.carrito;
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  async deleteCarrito() {
    try {
      const user = await this.authService.getAllCurrentUserData();
      if (user) {
        user.carrito = [];
        const id = this.authService.getCurrentUserId();
        await this.authService.updateUserData(id, user);
      }
    } catch (error) {
      console.error(error);
    }
  }

  carritoHasItems(): boolean {
    return this.carrito.length > 0;
  }
}
