import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { OpenWeatherService } from './open-weather.service';
import { AppRoutingModule } from './app-routing.module';
import { AddLocationComponent } from './add-location/add-location.component';
import { APP_BASE_HREF } from '@angular/common';

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpClientModule, AppRoutingModule ],
  declarations: [ AppComponent, HelloComponent, CurrentWeatherComponent, AddLocationComponent ],
  providers:    [ OpenWeatherService, {provide: APP_BASE_HREF, useValue : "/" } ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
