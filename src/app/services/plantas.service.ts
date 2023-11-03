import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, pipe, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlantasService {

  private urlList = "https://perenual.com/api/species-list?";
  private urlDetails = "https://perenual.com/api/species/details/";
  private key = "key=sk-zolU65401db307c4f2770";

  constructor(private http: HttpClient) { }

  getEdiblePlantList() :Observable<any>{
    return this.http.get<any>(this.urlList + this.key + "&edible=1")
    .pipe(
      catchError((error: any)=> {
        console.error(error);
        return throwError(()=>error)
      })
    );
  }
  getPoisonousPlantList() :Observable<any>{
    return this.http.get<any>(this.urlList + this.key + "&poisonous=1")
    .pipe(
      catchError((error: any)=> {
        console.error(error);
        return throwError(()=>error)
      })
    );
  }

  getPlantDetails(id: string) :Observable<any>{
    return this.http.get<any>(this.urlDetails + id + "?" + this.key)
    .pipe(
      catchError((error: any)=> {
        console.error(error);
        return throwError(()=>error)
      })
    );
  }
}
