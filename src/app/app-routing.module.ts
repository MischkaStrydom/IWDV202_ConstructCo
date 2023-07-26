import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

import { AssignmentsComponent } from './assignments/assignments.component';
import { AssignmentEditComponent } from './assignments/assignment-edit.component';

import { EmployeesComponent } from './employees/employees.component';
import { EmployeeEditComponent } from './employees/employee-edit.component';

import { JobsComponent } from './jobs/jobs.component';
import { JobEditComponent } from './jobs/job-edit.component';

import { ProjectsComponent } from './projects/projects.component';
import { ProjectEditComponent } from './projects/project-edit.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'assignments', component: AssignmentsComponent },
  { path: 'assignment/:assignmentId', component: AssignmentEditComponent },
  { path: 'assignment', component: AssignmentEditComponent },

  { path: 'employees', component: EmployeesComponent },
  { path: 'employee/:employeeId', component: EmployeeEditComponent },
  { path: 'employee', component: EmployeeEditComponent },

  { path: 'jobs', component: JobsComponent },
  { path: 'job/:jobId', component: JobEditComponent },
  { path: 'job', component: JobEditComponent },

  { path: 'projects', component: ProjectsComponent },
  { path: 'project/:projectId', component: ProjectEditComponent },
  { path: 'project', component: ProjectEditComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
