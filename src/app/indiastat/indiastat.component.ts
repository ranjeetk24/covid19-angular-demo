import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CovidService } from '../service/covid.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Covid } from '../model/covid.model';
import { Label, SingleDataSet } from 'ng2-charts';
import { ChartType, ChartOptions } from 'chart.js';
import { routerTransition } from '../router.animations';
import { StatesData } from '../model/statesdata.model';
import { Regional } from '../model/regional.model';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-indiastat',
  templateUrl: './indiastat.component.html',
  styleUrls: ['./indiastat.component.css'],
  animations: [routerTransition()]
})
export class IndiastatComponent implements OnInit {

  constructor(private http: HttpClient, private covidService: CovidService,
              private formBuilder: FormBuilder) {
}

get country() {
return this.countryForm.get('country');
}

COVID_DATA_ARRAY: Covid[];
COVID_DATA_STATES_ARRAY: StatesData;
COVID_DATA: Covid;
totalCases: number;
activeCases: number;
recoveredCases: number;
deathCases: number;
countryName: string;
todayCases: number;
recoveryRate: string;
fatalityRate: string;
criticalCasesRate: string;
regionalData: Regional[];
datasource = new MatTableDataSource<Regional>(this.regionalData);
displayedColumns: string[] = ['loc', 'totalConfirmed', 'confirmedCasesIndian', 'confirmedCasesForeign', 'discharged' , 'deaths'];


countryForm = this.formBuilder.group({
country: [null, Validators.required]
});



public populateData() {

this.totalCases = this.COVID_DATA.cases;
this.activeCases = this.COVID_DATA.active;
this.recoveredCases = this.COVID_DATA.recovered;
this.deathCases = this.COVID_DATA.deaths;
this.countryName = this.COVID_DATA.country;
this.todayCases = this.COVID_DATA.todayCases;
const recRate = (this.COVID_DATA.recovered / this.COVID_DATA.cases * 100);
this.recoveryRate = parseFloat(recRate.toString()).toFixed(2);
const fatRate =  (this.COVID_DATA.deaths / this.COVID_DATA.cases * 100);
this.fatalityRate = parseFloat(fatRate.toString()).toFixed(2);
const critCasesRate =  (this.COVID_DATA.critical / this.COVID_DATA.cases * 100);
this.criticalCasesRate = parseFloat(critCasesRate.toString()).toFixed(2);
}
public getCovid19ReportByCountry(country: string) {
const data = this.covidService.getCovid19ReportByCountry(country).subscribe((response) => {
this.COVID_DATA = response as Covid;
console.log(this.COVID_DATA.country);
this.populateData();
});
}

onCountryChange() {
console.log(this.country.value.country);
this. getCovid19ReportByCountry(this.country.value.country);

}
onFormSubmit() {

}
public getCovid19Report() {
const data = this.covidService.getCovid19Report().subscribe((response) => {
this.COVID_DATA_ARRAY = response as Covid[];
});
}

public getCovid19IndianStatesReport() {
  const data = this.covidService.getCovid19IndianStatesReport().subscribe((response) => {
  this.COVID_DATA_STATES_ARRAY = response as StatesData;
  this.regionalData = this.COVID_DATA_STATES_ARRAY.data.regional;
  this.datasource.data = this.regionalData;
  });
  }

ngOnInit(): void {
this.countryName = 'India';
this.getCovid19ReportByCountry('India');
this.getCovid19Report();
this.getCovid19IndianStatesReport();
this.activeCases = this.COVID_DATA.active;
this.recoveredCases =  this.COVID_DATA.recovered;
this.deathCases = this.COVID_DATA.deaths;
}

}
