import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.css']
})
export class AddLocationComponent implements OnInit {

  constructor() { }

  currentZipCode: string = "";
  zipCodesArray: string[] = [];

  ngOnInit(): void {
    if(localStorage.getItem("weather_forecast_zip_codes")) 
      this.zipCodesArray = JSON.parse(localStorage.getItem("weather_forecast_zip_codes"));
  }

  onAddLocation(): void {
    if(this.zipCodesArray.indexOf(this.currentZipCode) < 0)
      this.zipCodesArray.push(this.currentZipCode);
    
    this.saveToLocalStorage();
    
    this.currentZipCode = "";
  }

  onRemoveLocation(zipCode: string): void {
    let index = this.zipCodesArray.indexOf(zipCode);

    if(index > -1) {
      this.zipCodesArray.splice(index, 1);

      this.saveToLocalStorage();
    }
  }

  private saveToLocalStorage(): void {
    localStorage.setItem("weather_forecast_zip_codes", JSON.stringify(this.zipCodesArray));
  }

}
