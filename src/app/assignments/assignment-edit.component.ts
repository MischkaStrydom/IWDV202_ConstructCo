import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { Assignment } from './assignment';
import { Project } from './../projects/project';
import { Employee } from './../employees/employee';
import { Job } from './../jobs/job';

@Component({
  selector: 'app-assignment-edit',
  templateUrl: './assignment-edit.component.html',
  styleUrls: ['./assignment-edit.component.scss']
})
export class AssignmentEditComponent implements OnInit {

  
  title?: string;
  
  form!: FormGroup;
  
  assignment?: Assignment;

  assignmentId?: number;

  public projects: Project[] = [];
  public employees: Employee[] = [];
  public jobs: Job[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: HttpClient) {
  }
  ngOnInit() {
    this.form = new FormGroup({

      //assignmentId: new FormControl('', Validators.required),
      assignDate: new FormControl('', Validators.required),
      projectId: new FormControl('', Validators.required),
      employeeId: new FormControl('', Validators.required),
      assignJobId: new FormControl('', Validators.required),
      assignHourCharge: new FormControl('', Validators.required),
      hours: new FormControl('', Validators.required),
      charge: new FormControl('', Validators.required)
    }, null, this.isDupeAssignment());
    this.loadData();
  }


  loadData() {

    this.loadProjects();
    this.loadEmployees();
    this.loadJobs();
    
    var idParam = this.activatedRoute.snapshot.paramMap.get('assignmentId');

    this.assignmentId = idParam ? +idParam : 0;
    if (this.assignmentId) {
      
      var url = environment.baseUrl + 'api/Assignments/' + this.assignmentId;
      this.http.get<Assignment>(url).subscribe(result => {
        this.assignment = result;
        this.title = "Edit Assignment - " + this.assignment.assignmentId;
        
        this.form.patchValue(this.assignment);
      }, error => console.error(error));
    }
    else {
      
      this.title = "Create a new assignment";
    }
  }

  loadProjects() {
    // fetch all the projects from the server
    var url = environment.baseUrl + 'api/Projects';
    var params = new HttpParams()
      .set("pageIndex", "0")
      .set("pageSize", "9999")
      .set("sortColumn", "name");
    this.http.get<any>(url, { params }).subscribe(result => {
      this.projects = result.data;
      this.projects.sort((a, b) => a.projectId - b.projectId)
    }, error => console.error(error));
  }

  loadEmployees() {
    // fetch all the employees from the server
    var url = environment.baseUrl + 'api/Employees';
    var params = new HttpParams()
      .set("pageIndex", "0")
      .set("pageSize", "9999")
      .set("sortColumn", "firstName");
    this.http.get<any>(url, { params }).subscribe(result => {
      this.employees = result.data;
      this.employees.sort((a, b) => a.employeeId - b.employeeId)
    }, error => console.error(error));
  }

  loadJobs() {
    // fetch all the jobs from the server
    var url = environment.baseUrl + 'api/Jobs';
    var params = new HttpParams()
      .set("pageIndex", "0")
      .set("pageSize", "9999")
      .set("sortColumn", "description");
    this.http.get<any>(url, { params }).subscribe(result => {
      this.jobs = result.data;
      this.jobs.sort((a, b) => a.jobId - b.jobId)
    }, error => console.error(error));
  }

  onSubmit() {
    var assignment = (this.assignmentId) ? this.assignment : <Assignment>{};
    
    if (assignment) {
     // assignment.assignmentId = this.form.controls['assignmentId'].value;
      assignment.assignDate = this.form.controls['assignDate'].value;
      assignment.projectId = +this.form.controls['projectId'].value;
      assignment.employeeId = +this.form.controls['employeeId'].value;
      assignment.assignJobId = +this.form.controls['assignJobId'].value;
      assignment.assignHourCharge = +this.form.controls['assignHourCharge'].value;
      assignment.hours = +this.form.controls['hours'].value;
      assignment.charge = +this.form.controls['charge'].value;

      if (this.assignmentId) {
        // EDIT mode
        var url = environment.baseUrl + 'api/Assignments/' + assignment.assignmentId;
        this.http
          .put<Assignment>(url, assignment)
          .subscribe(result => {
            console.log("Assignment " + assignment!.assignDate + " has been updated.");
            
            this.router.navigate(['/assignments']);
          }, error => console.error(error));
      }
      else {
        // ADD NEW mode
        var url = environment.baseUrl + 'api/Assignments';
        this.http
          .post<Assignment>(url, assignment)
          .subscribe(result => {
            console.log("Assignment " + result.assignmentId + " has been created.");
            
            this.router.navigate(['/assignments']);
          }, error => console.error(error));
      }
    }
  }

  isDupeAssignment(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any } |
      null> => {
      var assignment = <Assignment>{};
      
      assignment.assignmentId = (this.assignmentId) ? this.assignmentId : 0;
      assignment.assignDate = this.form.controls['assignDate'].value;
      assignment.projectId = +this.form.controls['projectId'].value;
      assignment.employeeId = +this.form.controls['employeeId'].value;
      assignment.assignJobId = +this.form.controls['assignJobId'].value;
      assignment.assignHourCharge = +this.form.controls['assignHourCharge'].value;
      assignment.hours = +this.form.controls['hours'].value;
      assignment.charge = +this.form.controls['charge'].value;
      var url = environment.baseUrl + 'api/Assignments/IsDupeAssignment';

      return this.http.post<boolean>(url, assignment).pipe(map(result => {
        return (result ? { isDupeAssignment: true } : null);
      }));
    }
  }

}

