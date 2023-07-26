import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { Job } from './job';


@Component({
  selector: 'app-job-edit',
  templateUrl: './job-edit.component.html',
  styleUrls: ['./job-edit.component.scss']
})
export class JobEditComponent implements OnInit {


  title?: string;

  form!: FormGroup;

  job?: Job;

  jobId?: number;



  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: HttpClient) {
  }

  ngOnInit() {
    this.form = new FormGroup({

     // jobId: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required,this.isDupeField("description")),
      hourCharge: new FormControl('', Validators.required),
      lastUpdated: new FormControl('', Validators.required)
    }, null, this.isDupeJob());

    this.loadData();
  }


  loadData() {



    var idParam = this.activatedRoute.snapshot.paramMap.get('jobId');
    this.jobId = idParam ? +idParam : 0;

    if (this.jobId) {

      var url = environment.baseUrl + 'api/Jobs/' + this.jobId;

      this.http.get<Job>(url).subscribe(result => {
        this.job = result;
        this.title = "Edit job - " + this.job.description;
        // update the form with the job value
        this.form.patchValue(this.job);
      }, error => console.error(error));
    }
    else {
      // ADD NEW MODE
      this.title = "Create a new Job";
    }

  }


  onSubmit() {
    
    var job = (this.jobId) ? this.job : <Job>{};

    if (job) {
      // job.jobId = this.form.controls['jobId'].value;
      job.description = this.form.controls['description'].value;
      job.hourCharge = +this.form.controls['hourCharge'].value;
      job.lastUpdated = this.form.controls['lastUpdated'].value;

      if (this.jobId) {
        // EDIT mode
        var url = environment.baseUrl + 'api/Jobs/' + job.jobId;
        this.http
          .put<Job>(url, job)
          .subscribe(result => {
            console.log("Job description: " + job!.description + " has been updated.");
            // go back to jobs view
            this.router.navigate(['/jobs']);
          }, error => console.error(error));
      }
      else {
        // ADD NEW mode
        var url = environment.baseUrl + 'api/Jobs';
        this.http
          .post<Job>(url, job)
          .subscribe(result => {
            console.log("Job description: " + result.description + " has been created.");
            // go back to jobs view
            this.router.navigate(['/jobs']);
          }, error => console.error(error));

      }

    }
  }
  isDupeJob(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any } |
      null> => {
      var job = <Job>{};

      job.jobId = (this.jobId) ? this.jobId : 0;
      job.description = this.form.controls['description'].value;
      job.hourCharge = +this.form.controls['hourCharge'].value;
      job.lastUpdated = this.form.controls['lastUpdated'].value;

      var url = environment.baseUrl + 'api/Jobs/IsDupeJob';

      return this.http.post<boolean>(url, job).pipe(map(result => {
        return (result ? { isDupeJob: true } : null);

      

      }));
    }
  }

  isDupeField(fieldName: string): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{
      [key: string]: any
    } | null> => {
      var params = new HttpParams()
        .set("jobId", (this.jobId) ? this.jobId.toString() : "0")
        .set("fieldName", fieldName)
        .set("fieldValue", control.value);
      var url = environment.baseUrl + 'api/Jobs/IsDupeField';
      return this.http.post<boolean>(url, null, { params })
        .pipe(map(result => {
          return (result ? { isDupeField: true } : null);
        }));
    }
  }
}


