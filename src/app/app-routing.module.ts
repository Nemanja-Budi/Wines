import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WineListComponent } from './components/wines/wine-list/wine-list.component';
import { WineFormComponent } from './components/wines/wine-form/wine-form.component';

const routes: Routes = [
  
  { path: 'wines', component: WineListComponent },
  { path: 'wines/:id', component: WineFormComponent },
  { path: 'add-wines', component: WineFormComponent },
  { path: '', redirectTo: '/wines', pathMatch: 'prefix' },
  // { path: 'about-us', component: AboutUsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
