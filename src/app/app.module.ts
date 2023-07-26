import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularMaterialModule } from './angular-material.module';

import { AssignmentsComponent } from './assignments/assignments.component';
import { JobsComponent } from './jobs/jobs.component';
import { EmployeesComponent } from './employees/employees.component';
import { ProjectsComponent } from './projects/projects.component';
import { JobEditComponent } from './jobs/job-edit.component';
import { ProjectEditComponent } from './projects/project-edit.component';
import { EmployeeEditComponent } from './employees/employee-edit.component';
import { AssignmentEditComponent } from './assignments/assignment-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavMenuComponent,
    AssignmentsComponent,
    JobsComponent,
    EmployeesComponent,
    ProjectsComponent,
    JobEditComponent,
    ProjectEditComponent,
    EmployeeEditComponent,
    AssignmentEditComponent,
    
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    AngularMaterialModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
