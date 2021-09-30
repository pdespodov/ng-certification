import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { AddLocationComponent } from './add-location/add-location.component';

const routes: Routes = [
  { path: "home", component: AddLocationComponent },
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "**", redirectTo: "/home"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { 
}

