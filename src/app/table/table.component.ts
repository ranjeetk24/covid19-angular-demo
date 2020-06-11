import { Component, OnInit, ViewChild } from '@angular/core';
import { Covid } from '../model/covid.model';
import { MatTableDataSource} from '@angular/material/table';

import {MatTableModule} from '@angular/material/table';
import { CovidService } from '../service/covid.service';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  COVID_DATA: Covid[];
  displayedColumns: string[] = ['country', 'cases', 'recovered' , 'deaths'];
  datasource = new MatTableDataSource<Covid>(this.COVID_DATA);
  @ViewChild(MatSort) sort: MatSort;
  constructor(private service: CovidService) { }

  ngOnInit(): void {
    this.getCovidReport();
    this.datasource.sort = this.sort;
  }

  public getCovidReport() {
    const data = this.service.getCovid19Report();
    data.subscribe(report => this.datasource.data = report as Covid[]);
  }

}
