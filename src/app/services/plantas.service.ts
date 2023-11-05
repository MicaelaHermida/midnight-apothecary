import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, pipe, throwError } from 'rxjs';
import { Planta } from '../interfaces/planta.interface';
import { PlantaInfo } from '../interfaces/planta-info.interface';

@Injectable({
  providedIn: 'root'
})
export class PlantasService {

  private urlList = "https://perenual.com/api/species-list?";
  private urlDetails = "https://perenual.com/api/species/details/";
  private key = "key=sk-zolU65401db307c4f2770";

  constructor(private http: HttpClient) { }

  getEdiblePlantList(): Observable<Planta[]> {
    return this.http.get<any>(this.urlList + this.key + "&edible=1")
    .pipe(
      map(response => response.data));
    // TODO: Obtener unicamente los atributos necesarios en lugar de todos.
    /*return this.http.get<Planta[]>(this.urlList + this.key + "&edible=1").pipe(
      map(data => {
        return data.map(item => {
          return {
            common_name: item.common_name,
            image: item.image,
            id: item.id
          };
        })
      }),
      catchError(error => {
        console.error('Error en la solicitud HTTP:', error);
        return [];
      }));*/

  }

  getPoisonousPlantList(): Observable<Planta[]> {
    return this.http.get<any>(this.urlList + this.key + "&poisonous=1")
    .pipe(
      map(response => response.data));
  }

  getPlantDetails(id: number): Observable<PlantaInfo> {
    return this.http.get<PlantaInfo>(this.urlDetails + id + "?" + this.key)
      .pipe(
        catchError((error: any) => {
          console.error(error);
          return throwError(() => error)
        })
      );
  }
}
/*getClientes2(): Observable<clientesI[]> {
    return this.http.get<clientesI[]>(this.url).pipe(
      // Operador 1: map
      map(data => {
        // Realiza una transformación en los datos
        return data.map(item => {
          return {
            apellido: item.apellido,
            nombre: item.nombre.toUpperCase(),
            dni: item.dni,
            fechaInicio: item.fechaInicio,
            id: item.id,
          };
        });
      }),
      // Operador 2: catchError
      catchError(error => {
        // Manejo de errores
        console.error('Error en la solicitud HTTP:', error);
        // Puedes retornar un valor por defecto o lanzar otro observable de error
        return [];
      })
    );
  }*/