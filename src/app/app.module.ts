import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { OpenWeatherService } from './open-weather.service';

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpClientModule ],
  declarations: [ AppComponent, HelloComponent, CurrentWeatherComponent ],
  providers:    [ OpenWeatherService ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
