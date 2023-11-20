import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, pipe, throwError } from 'rxjs';
import { Planta } from '../interfaces/planta.interface';
import { PlantaInfo } from '../interfaces/planta-info.interface';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class PlantasService {

  private urlList = "https://perenual.com/api/species-list?";
  private urlDetails = "https://perenual.com/api/species/details/";

  constructor(private http: HttpClient) { }

  getPlantDetails(id: number): Observable<PlantaInfo> {
    return this.http.get<PlantaInfo>(this.urlDetails + id + "?" + environment.API_KEY)
      .pipe(
        catchError((error: any) => {
          console.error(error);
          return throwError(() => error)
        })
      );
  }
}