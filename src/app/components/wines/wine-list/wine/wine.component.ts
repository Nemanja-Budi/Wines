import { Component, EventEmitter, Input, OnDestroy, Output, inject } from '@angular/core';
import { Observable, Subject, of, switchMap, takeUntil } from 'rxjs';
import { Wine } from 'src/app/models/wine.model';
import { WineService } from 'src/app/services/wine.service';

@Component({
  selector: 'app-wine',
  templateUrl: './wine.component.html',
  styleUrls: ['./wine.component.css']
})
export class WineComponent {
  @Input() wine!: Wine;
  @Output() vinaEvent: EventEmitter<number> = new EventEmitter();

  onEmitWineID(id: number): void {
    this.vinaEvent.emit(id);
  }

}
