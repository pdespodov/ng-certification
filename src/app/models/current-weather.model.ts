export interface ICurrentWeather {
    locationName: string;
    currentConditions: string;
    currentTemp: number;
    minTemp: number;
    maxTemp: number;
    icon?: string;
    date?: Date;
}