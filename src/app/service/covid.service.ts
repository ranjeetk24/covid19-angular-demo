import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CovidService {

  constructor(private http: HttpClient) { }

  getCovid19Report() {
    return this.http.get('https://corona.lmao.ninja/v2/countries/');
  }

  getCovid19ReportByCountry(country: string) {
    return this.http.get(`https://corona.lmao.ninja/v2/countries/${country}`);
  }
}
