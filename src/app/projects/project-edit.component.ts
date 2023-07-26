import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { Project } from './project';
import { Employee } from './../employees/employee';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss']
})
export class ProjectEditComponent implements OnInit {


  title?: string;

  form!: FormGroup;

  project?: Project;

  projectId?: number;

 // projects?: Project[];

  public employees: Employee[] = [];;



  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: HttpClient) {
  }
  ngOnInit() {
    this.form = new FormGroup({

    //  projectId: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required, this.isDupeField("name")),
      value: new FormControl('', Validators.required),
      balance: new FormControl('', Validators.required),
      employeeId: new FormControl('', Validators.required)
    }, null, this.isDupeProject());
    this.loadData();
  }
 

  loadData() {


    this.loadEmployees();

    var idParam = this.activatedRoute.snapshot.paramMap.get('projectId');

    this.projectId = idParam ? +idParam : 0;
    if (this.projectId) {
      
      var url = environment.baseUrl + 'api/Projects/' + this.projectId;
      this.http.get<Project>(url).subscribe(result => {
        this.project = result;
        this.title = "Edit - " + this.project.name;
        // update the form with the city value
        this.form.patchValue(this.project);
      }, error => console.error(error));
    }
    else {
      // ADD NEW MODE
      this.title = "Create a new project";
    }
  }

  loadEmployees() {
    // fetch all the Employees from the server
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

  onSubmit() {
    var project = (this.projectId) ? this.project : <Project>{};

    if (project) {
    //  project.projectId = this.form.controls['projectId'].value;
      project.name = this.form.controls['name'].value;
      project.value = +this.form.controls['value'].value;
      project.balance = +this.form.controls['balance'].value;
      project.employeeId = +this.form.controls['employeeId'].value;

      console.log(project)

      if (this.projectId) {
        
        var url = environment.baseUrl + 'api/Projects/' + project.projectId;
        this.http
          .put<Project>(url, project)
          .subscribe(result => {
            console.log("Project " + project!.name + " has been updated.");
            
            this.router.navigate(['/projects']);
          }, error => console.error(error));
      }
      else {
        
        var url = environment.baseUrl + 'api/Projects';
        this.http
          .post<Project>(url, project)
          .subscribe(result => {
            console.log("Project " + result.name + " has been created.");
            
            this.router.navigate(['/projects']);
          }, error => console.error(error));
      }
      
    }
  }
    
  isDupeProject(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any } |
      null> => {
      var project = <Project>{};
      
      project.projectId = (this.projectId) ? this.projectId : 0;
      project.name = this.form.controls['name'].value;
      project.value = +this.form.controls['value'].value;
      project.balance = +this.form.controls['balance'].value;
      project.employeeId = +this.form.controls['employeeId'].value;

      var url = environment.baseUrl + 'api/Projects/IsDupeProject';
      return this.http.post<boolean>(url, project).pipe(map(result => {
        return (result ? { isDupeProject: true } : null);
      }));
    }
  }

  isDupeField(fieldName: string): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{
      [key: string]: any
    } | null> => {
      var params = new HttpParams()
        .set("projectId", (this.projectId) ? this.projectId.toString() : "0")
        .set("fieldName", fieldName)
        .set("fieldValue", control.value);
      var url = environment.baseUrl + 'api/Projects/IsDupeField';
      return this.http.post<boolean>(url, null, { params })
        .pipe(map(result => {
          return (result ? { isDupeField: true } : null);
        }));
    }
  }

}

