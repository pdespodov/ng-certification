import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ICurrentWeather } from '../models/current-weather.model';
import { OpenWeatherService } from '../open-weather.service';

@Component({
  selector: 'app-five-days-weather',
  templateUrl: './five-days-weather.component.html',
  styleUrls: ['./five-days-weather.component.css']
})
export class FiveDaysWeatherComponent implements OnInit, OnDestroy {
  weatherArray: ICurrentWeather[] = [];
  paramsSubscription: Subscription = new Subscription();
  zipCode: string = "";
  loading: boolean = false;

  constructor(private router: Router, 
    private activatedRoute: ActivatedRoute,
    private openWeatherService: OpenWeatherService) { }

  ngOnInit(): void {
    this.loading = true;

    this.paramsSubscription = this.activatedRoute.params.subscribe(params => {
      this.zipCode = params["zipcode"];

      this.openWeatherService.getFiveDaysForecast(this.zipCode).subscribe(
        (data: ICurrentWeather[]) => {
          this.weatherArray = data;
          this.loading = false;
        },
        (err: HttpErrorResponse) => {
          this.weatherArray = [];
          this.loading = false;
        });
    });
  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }

  back() {
    this.router.navigate(["/forecast"], {relativeTo: this.activatedRoute});
  }

  get displayForecast(): boolean {
    if(this.weatherArray && this.weatherArray.length)
      return true;

    return false;
  }
}
