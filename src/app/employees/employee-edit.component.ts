import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { Employee } from './employee';
import { Job } from './../jobs/job';


@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.scss']
})
export class EmployeeEditComponent implements OnInit {


  title?: string;

  form!: FormGroup;

  employee?: Employee;

  employeeId?: number;

  //jobs?: Job[];

  public jobs: Job[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: HttpClient) {
  }
  ngOnInit() {
    this.form = new FormGroup({

     // employeeId: new FormControl('', Validators.required),      
      lastName: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      initials: new FormControl('', Validators.required),
      hiredDate: new FormControl('', Validators.required),
      jobId: new FormControl('', Validators.required),
      yearsOfService: new FormControl('', Validators.required),            
    }, null, this.isDupeEmployee());
    this.loadData();
  }

  loadData() {

    this.loadJobs();


    

    var idParam = this.activatedRoute.snapshot.paramMap.get('employeeId');
    this.employeeId = idParam ? +idParam : 0;
    if (this.employeeId) {
      // EDIT MODE
      // fetch the employee from the server
      var url = environment.baseUrl + 'api/Employees/' + this.employeeId;
      this.http.get<Employee>(url).subscribe(result => {
        this.employee = result;
        this.title = "Edit - " + this.employee.firstName;
        // update the form with the employee value
        this.form.patchValue(this.employee);
      }, error => console.error(error));
    }
    else {
      // ADD NEW MODE
      this.title = "Create a new Employee";
    }
  }

  loadJobs() {
    // fetch all the countries from the server
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
    var employee = (this.employeeId) ? this.employee : <Employee>{};

    if (employee) {
    //  employee.employeeId = this.form.controls['employeeId'].value;      
      employee.lastName = this.form.controls['lastName'].value;
      employee.firstName = this.form.controls['firstName'].value;
      employee.initials = this.form.controls['initials'].value;
      employee.hiredDate = this.form.controls['hiredDate'].value;
      employee.jobId = +this.form.controls['jobId'].value;
      employee.yearsOfService = +this.form.controls['yearsOfService'].value;

      if (this.employeeId) {
        
        var url = environment.baseUrl + 'api/Employees/' + employee.employeeId;
        this.http
          .put<Employee>(url, employee)
          .subscribe(result => {
            console.log("Employee " + employee!.firstName + " has been updated.");
           
            this.router.navigate(['/employees']);
          }, error => console.error(error));
      }
      else {
        
        var url = environment.baseUrl + 'api/Employees';
        this.http
          .post<Employee>(url, employee)
          .subscribe(result => {
            console.log("Employee " + result.firstName + " has been created.");
            
            this.router.navigate(['/employees']);
          }, error => console.error(error));
      }
    }
      
    
  }

  isDupeEmployee(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any } |
      null> => {
      var employee = <Employee>{};

      employee.employeeId = (this.employeeId) ? this.employeeId : 0;
      employee.lastName = this.form.controls['lastName'].value;
      employee.firstName = this.form.controls['firstName'].value;
      employee.initials = this.form.controls['initials'].value;
      employee.hiredDate = this.form.controls['hiredDate'].value;
      employee.jobId = +this.form.controls['jobId'].value;
      employee.yearsOfService = +this.form.controls['yearsOfService'].value;
      var url = environment.baseUrl + 'api/Employees/IsDupeEmployee';
      return this.http.post<boolean>(url, employee).pipe(map(result => {
        return (result ? { isDupeEmployee: true } : null);
      }));
    }
  }

}

