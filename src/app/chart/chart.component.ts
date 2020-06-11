import { Component, OnInit } from '@angular/core';
import { SingleDataSet, Color, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { HttpClient } from '@angular/common/http';
import { ChartDataSets, ChartType, ChartOptions } from 'chart.js';
import { Covid } from 'src/app/model/covid.model';
import { CovidService } from 'src/app/service/covid.service';
import { FormBuilder, Validators } from '@angular/forms';
import { routerTransition } from '../router.animations';

@Component({
  selector: 'app-charts',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
  animations: [routerTransition()]
})
export class ChartComponent implements OnInit {
  constructor(private http: HttpClient, private covidService: CovidService,
              private formBuilder: FormBuilder) {
    // monkeyPatchChartJsTooltip();
    // monkeyPatchChartJsLegend();
  }

  get country() {
    return this.countryForm.get('country');
  }

  COVID_DATA_ARRAY: Covid[];
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
  public pieChartLabels: Label[] = [ 'active',  'recovered', 'deaths'];
  public pieChartData: SingleDataSet;
  public pieChartType: ChartType = 'doughnut';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public pieChartLabels1: Label[] = [ 'oneCasePerPeople',  'oneTestPerPeople'];
  public pieChartData1: SingleDataSet;
  public pieChartType1: ChartType = 'pie';
  public pieChartLegend1 = true;
  public pieChartPlugins1 = [];
  public polarAreaChartData1: number[];
  public polarAreaLegend1: boolean;
  public polarAreaChartType1: string;


  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartOptions1: ChartOptions = {
    responsive: true,
  };

  countryForm = this.formBuilder.group({
    country: [null, Validators.required]
  });

 public polarAreaChartLabels1: string[] = [
  'ActivePerOneMillion',
  'RecoveredPerOneMillion',
];


  public populateData() {
    this.pieChartData = [this.COVID_DATA.active, this.COVID_DATA.recovered, this.COVID_DATA.deaths];
    this.pieChartData1 = [this.COVID_DATA.oneCasePerPeople, this.COVID_DATA.oneTestPerPeople];
    this.polarAreaChartData1 =  [ this.COVID_DATA.activePerOneMillion, this.COVID_DATA.recoveredPerOneMillion];
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

  ngOnInit(): void {
this.countryName = 'India';
this.polarAreaChartType1 = 'polarArea';
this.getCovid19ReportByCountry('India');
this.getCovid19Report();
this.activeCases = this.COVID_DATA.active;
this.recoveredCases =  this.COVID_DATA.recovered;
this.deathCases = this.COVID_DATA.deaths;
 }
 // events
 public chartClicked(e: any): void {
  // console.log(e);
}

public chartHovered(e: any): void {
  // console.log(e);
}



}
