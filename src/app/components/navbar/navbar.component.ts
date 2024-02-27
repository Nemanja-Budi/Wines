import { Component, OnInit, inject } from '@angular/core';
import { Observable} from 'rxjs';
import { Wine } from 'src/app/models/wine.model';
import { WineService } from 'src/app/services/wine.service';
import { toSignal } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  wineService: WineService = inject(WineService);
  // wine: Observable<Wine[]> = this.wineService.getSortedWinesByYear();
  // wineSignal = toSignal(this.wine);
  wines: Wine [] = [];

  sortAsc(): void {
    this.wines.sort((a,b) => a.year - b.year);
  }

  sortDesc(): void {
    this.wines.sort((a,b) => b.year - a.year);
  }

 ngOnInit(): void {
   this.wineService.probaSubject.subscribe((value) => {
    this.wines = [...value];
   });
  // this.wineService.getAllWines().subscribe((value) => {
  //   this.wines = value;
  //   this.wines.sort((a,b) => b.year - a.year);
  // });
  
 }
  
}
