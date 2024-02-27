import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, catchError, filter, findIndex, map, of, switchMap, tap, throwError } from 'rxjs';
import { Wine } from '../models/wine.model';

@Injectable({
  providedIn: 'root'
})
export class WineService {

  http: HttpClient = inject(HttpClient);
  wineSubject: BehaviorSubject<Wine[]> = new BehaviorSubject<Wine[]>([]);
  
  probaSubject: BehaviorSubject<Wine[]> = new BehaviorSubject<Wine[]>([]);

  getAllWines(): Observable<Wine[]> {
    return this.http.get<Wine[]>(`http://localhost:3000/api/wines`).pipe(map((wine) => {
      this.probaSubject.next(wine);
      return wine;
    }));
  }

  getWine(id: number): Observable<Wine> {
    return this.http.get<Wine>(`http://localhost:3000/api/wines/${id}`).pipe(filter((wine) => {
      return wine.id === id;
    }));
  }

  addNewWine(wine: Wine): Observable<Wine> {
    return this.http.post<Wine>(`http://localhost:3000/api/wines`, wine);
  }

  deleteWine(id: number): Observable<any> {
    const url = `http://localhost:3000/api/wines/${id}`;
    return this.http.delete(url).pipe(
      catchError((error) => {
        return throwError(`Greška tokom brisanja proizvoda: ${error}`);
      })
    );
  }

  updateWine(vino: Wine): Observable<Wine> {
    const url = `http://localhost:3000/api/wines/${vino.id}`;  
    return this.http.put(url, vino).pipe(
      switchMap(() => {
        const currentWine = this.wineSubject.value;
        const index = currentWine.findIndex(wine => wine.id === vino.id);
        if (index !== -1) {
          currentWine[index] = vino;
        }
        this.wineSubject.next(currentWine);
        return of(vino);
      }),
      catchError(error => throwError(error))
    );
  }

  
  getSortedWinesByYear(): Observable<Wine[]> {
    return this.http.get<Wine[]>(`http://localhost:3000/api/wines`).pipe(
      map(wines => wines.sort((a, b) => b.year - a.year)),
    );
  }
  
}
