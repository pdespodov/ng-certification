import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICurrentWeather } from './models/current-weather.model';
import { map } from "rxjs/operators"
import { Observable } from 'rxjs';

@Injectable()
export class OpenWeatherService {
  private apiKey: string = "5a4b2d457ecbef9eb2a71e480b947604";
  private currentForecastUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${this.apiKey}&units=metric`;
  private fiveDaysForecastUrl = `https://api.openweathermap.org/data/2.5/forecast/daily?appid=${this.apiKey}&units=metric`;

  constructor(private http: HttpClient) {}

  getCurrentWeather(zipCode: string): Observable<ICurrentWeather> {
    let url = `${this.currentForecastUrl}&zip=${zipCode}`;

    return this.http.get<any>(url).pipe(map(jsonData => {
      return {
        locationName: jsonData["name"],
        currentConditions: jsonData["weather"][0]["main"],
        currentTemp: jsonData["main"]["temp"],
        minTemp: jsonData["main"]["temp_min"],
        maxTemp: jsonData["main"]["temp_max"],
        icon: this.getWeatherIcon(jsonData["weather"][0]["description"])
      };
    }));
  }

  getFiveDaysForecast(zipCode: string): Observable<ICurrentWeather[]> {
    let url = `${this.fiveDaysForecastUrl}&zip=${zipCode}`;

    return this.http.get<any>(url).pipe(map(jsonData => {
      let weatherArray = new Array<ICurrentWeather>();
      let list = jsonData["list"];

      for(let i = 0; i < 5; i ++) {
        let listItem = list[i];

        weatherArray.push({
          date: new Date(listItem["dt"] * 1000),
          locationName: jsonData["city"]["name"],
          currentConditions: listItem["weather"][0]["main"],
          currentTemp: listItem["temp"]["day"],
          minTemp: listItem["temp"]["min"],
          maxTemp: listItem["temp"]["max"],
          icon: this.getWeatherIcon(listItem["weather"][0]["description"])
        });
      }

      return weatherArray;
    }));
  }

  private getWeatherIcon(conditions: string): string {
    if(conditions === "clear sky" || conditions.indexOf("clear") > -1)
      return "https://www.angulartraining.com/images/weather/sun.png";

    if(conditions.indexOf("clouds") > -1)
      return "https://www.angulartraining.com/images/weather/clouds.png";

    if(conditions.indexOf("rain") > -1 
      || conditions.indexOf("storm") > -1
      || conditions === "mist")
      return "https://www.angulartraining.com/images/weather/rain.png";

    if(conditions.indexOf("snow") > -1)
      return "https://www.angulartraining.com/images/weather/snow.png";

    return "";
  }
}
