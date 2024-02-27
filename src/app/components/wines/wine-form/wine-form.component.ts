import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Wine } from 'src/app/models/wine.model';
import { WineService } from 'src/app/services/wine.service';

@Component({
  selector: 'app-wine-form',
  templateUrl: './wine-form.component.html',
  styleUrls: ['./wine-form.component.css']
})
export class WineFormComponent implements OnInit, OnDestroy {

  wineForm: FormGroup;
  wineID: string | null = null;
  wines: Wine | undefined;
  editingMode: boolean = false;
  wineSubscription!: Subscription;

  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);
  wineService: WineService = inject(WineService);

  constructor(private formBuilder: FormBuilder) {
    this.wineForm = this.formBuilder.group({
      name: ['', Validators.required],
      year: ['', Validators.required],
      country: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if(!this.wineForm.valid) return;
    if(!this.editingMode) {
      const wineFormValue = this.wineForm.value;
      const newWine = new Wine(wineFormValue);
      this.wineService.addNewWine(newWine).subscribe(() => {
        this.wineForm.reset();
        this.router.navigate(['/wines']);
      });
    }
    else if (this.editingMode) {
      console.log('editing mode');
      const wineFormValue = this.wineForm.value;
      wineFormValue.id = Number(this.wineID);
      console.log(wineFormValue);
      this.wineService.updateWine(wineFormValue).subscribe(() => {
        this.wineForm.reset();
        this.router.navigate(['/wines']);
      });
    }
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param) => {
      this.wineID = param.get('id');
      if(this.wineID !== null) {
        this.editingMode = true;
        this.wineSubscription = this.wineService.getWine(Number(this.wineID)).subscribe((wine) => {
          this.wines = wine;
          if(wine !== undefined) {
            this.wineForm.patchValue(this.wines);
          }
        });
      }
      else {
        console.log(this.wineID + 'u elseu');
      }
    });
  }

  ngOnDestroy(): void {
    if(this.wineSubscription !== undefined) {
      this.wineSubscription.unsubscribe();
    }
  }
}
