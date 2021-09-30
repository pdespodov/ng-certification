import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICurrentWeather } from '../models/current-weather.model';
import { OpenWeatherService } from '../open-weather.service';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css']
})
export class CurrentWeatherComponent implements OnInit {
  @Input()
  zipCode: string;

  @Output()
  removeLocation: EventEmitter<string> = new EventEmitter();

  currentWeather: ICurrentWeather;
  loading: boolean = false;

  constructor(private openWeatherService: OpenWeatherService) { }

  ngOnInit(): void {
    this.loading = true;
    this.openWeatherService.getCurrentWeather(this.zipCode).subscribe((forecast: ICurrentWeather) => {
      this.currentWeather = forecast;

      this.loading = false;
    }, 
    (err: HttpErrorResponse) => {
      console.log(err);
      this.currentWeather = {
        locationName: "Unknown",
        currentConditions: "Unknown",
        currentTemp: 0,
        minTemp: 0,
        maxTemp: 0
      };

      this.loading = false;
    });
  }

  closeComponent(): void {
    this.removeLocation.emit(this.zipCode);
  }
}
