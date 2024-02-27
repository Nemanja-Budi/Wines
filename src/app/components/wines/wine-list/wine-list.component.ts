import { Component, inject } from '@angular/core';
import { Observable, Subject, of, switchMap, takeUntil } from 'rxjs';
import { Wine } from 'src/app/models/wine.model';
import { WineService } from 'src/app/services/wine.service';

@Component({
  selector: 'app-wine-list',
  templateUrl: './wine-list.component.html',
  styleUrls: ['./wine-list.component.css']
})
export class WineListComponent {
  wineService: WineService = inject(WineService);
  wines$: Observable<Wine[]> = this.wineService.getAllWines();
  private destroy$ = new Subject<void>();

  onDeleteWine(id: number) {
    this.wineService.deleteWine(id)
      .pipe(
        switchMap(() => this.wines$),
        takeUntil(this.destroy$)
      )
      .subscribe(wines => {
        this.wines$ = of(wines.filter(p => p.id !== id));
        alert('Uspesno ste uklonili vino: ' + id);
      });      
  }

}
