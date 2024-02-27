import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { WinesComponent } from './components/wines/wines.component';
import { WineListComponent } from './components/wines/wine-list/wine-list.component';
import { WineComponent } from './components/wines/wine-list/wine/wine.component';
import { WineFormComponent } from './components/wines/wine-form/wine-form.component';
import { NavbarComponent } from './components/navbar/navbar.component';


@NgModule({
  declarations: [
    AppComponent,
    WinesComponent,
    WineListComponent,
    WineComponent,
    WineFormComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
