import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { Assignment } from './assignment';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.scss']
})



export class AssignmentsComponent implements OnInit {

  public displayedColumns: string[] = ['assignmentId', 'assignDate', 'projectId', 'employeeId', 'assignJobId', 'assignHourCharge', 'hours', 'charge'] 

  
  
  
  public assignments!: MatTableDataSource<Assignment>;

  

  defaultPageIndex: number = 0;
  defaultPageSize: number = 10;
  public defaultSortColumn: string = "assignmentId";
  public defaultSortOrder: "asc" | "desc" = "asc";
  defaultFilterColumn: string = "projectId";
  filterQuery?: string;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  filterTextChanged: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient) {
  }


  ngOnInit(): void {

    this.loadData();
  }

  // debounce filter text changes
  onFilterTextChanged(filterText: string) {
    if (this.filterTextChanged.observers.length === 0) {
      this.filterTextChanged
        .pipe(debounceTime(1000), distinctUntilChanged())

        .subscribe(query => {
          this.loadData(query);
        });
    }
    this.filterTextChanged.next(filterText);
  }

  loadData(query?: string) {
    var pageEvent = new PageEvent();
    pageEvent.pageIndex = this.defaultPageIndex;
    pageEvent.pageSize = this.defaultPageSize;

    
    this.filterQuery = query;
    this.getData(pageEvent);
    
    
  }

  getData(event: PageEvent) {
    var url = environment.baseUrl + 'api/Assignments';
    var params = new HttpParams()
      .set("pageIndex", event.pageIndex.toString())
      .set("pageSize", event.pageSize.toString())
      .set("sortColumn", (this.sort)
      ? this.sort.active
      : this.defaultSortColumn)
      .set("sortOrder", (this.sort)
        ? this.sort.direction
        : this.defaultSortOrder);

    if (this.filterQuery) {

      params = params
        .set("filterColumn", this.defaultFilterColumn)
        .set("filterQuery", this.filterQuery);
    }
    
    this.http.get<any>(url, { params })
      .subscribe(result => {
        this.paginator.length = result.totalCount;

        this.paginator.pageIndex = result.pageIndex;
        this.paginator.pageSize = result.pageSize;
        this.assignments = new MatTableDataSource<Assignment>(result.data);

        this.assignments.data = this.assignments.data.map((el: any) => {
          let date = el['assignDate'];
          date = new Date(date);

          const options: any = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
          el['assignDate'] = date.toLocaleDateString('en-US', options);
          return el
        });

      }, error => console.error(error));
  }



}




