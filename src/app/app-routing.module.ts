import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { AddLocationComponent } from './add-location/add-location.component';
import { FiveDaysWeatherComponent } from './five-days-weather/five-days-weather.component';

const routes: Routes = [
  { path: "forecast", component: AddLocationComponent },
  { path: "forecast/:zipcode", component: FiveDaysWeatherComponent },
  { path: "", redirectTo: "/forecast", pathMatch: "full" },
  { path: "**", redirectTo: "/forecast"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})

export class AppRoutingModule { 
}

