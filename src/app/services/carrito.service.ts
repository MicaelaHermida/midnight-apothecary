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

  async getCarritoFromUsuario() : Promise<void>{
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

  async actualizarCarrito(carrito: Carrito) : Promise<void>{
    try {
      const user = await this.authService.getAllCurrentUserData();
      user.carrito.push(carrito);
      const id = this.authService.getCurrentUserId();
      await this.authService.updateUserData(id, user);
    } catch (error) {
      console.error(error);
    }
  }

  async deleteProductoCarrito(idProducto: string, cantidad: number) : Promise<void>{
    try {
      const user = await this.authService.getAllCurrentUserData();
      if (user) {
        let i = 0;
        let encontrado = false;
        while (i < user.carrito.length && !encontrado) {
          if (user.carrito[i].id_producto === idProducto) {
            encontrado = true;
            if(user.carrito[i].cantidad >= cantidad){
              user.carrito[i].cantidad -= cantidad;
            }else{
              user.carrito[i].cantidad = 0;
            }
            if (user.carrito[i].cantidad <= 0) {
              user.carrito.splice(i, 1);
            }
          }
          i++;
        }
        if(encontrado){
          const id = this.authService.getCurrentUserId();
          await this.authService.updateUserData(id, user);
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

}
