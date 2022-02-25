import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


import { Location } from '../Location';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements AfterViewInit {

  location: Location[] = [];
  displayedColumns = ['position', 'ste', 'nam', 'ads', 'lat'];
  dataSource = new MatTableDataSource(this.location)
  
  constructor(
    private api: ApiService,
    private _liveAnnouncer: LiveAnnouncer
  ) { }


  ngOnInit(): void {
    this.getLocation();
  }

  
  getLocation() : void{
    this.api.getLocation()
    .subscribe((locator) => {
      console.log(locator.lis)
      this.location= locator.lis;
    })
  }

  @ViewChild(MatSort)
  sort!: MatSort;

  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
  }
  
  applyFilter(event:Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  } 
}
