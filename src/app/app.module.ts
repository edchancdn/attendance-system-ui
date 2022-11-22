import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http'; 
import { FormsModule } from '@angular/forms'; 
import { ToastrModule } from 'ngx-toastr'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { StudentListComponent } from './components/student/student-list/student-list.component';
import { AddStudentComponent } from './components/student/add-student/add-student.component';
import { EditStudentComponent } from './components/student/edit-student/edit-student.component';
import { CohortListComponent } from './components/cohort/cohort-list/cohort-list.component';
import { AddCohortComponent } from './components/cohort/add-cohort/add-cohort.component';
import { EditCohortComponent } from './components/cohort/edit-cohort/edit-cohort.component';
import { CohortStudentListComponent } from './components/cohortstudent/cohort-student-list/cohort-student-list.component';
import { AddCohortStudentComponent } from './components/cohortstudent/add-cohort-student/add-cohort-student.component'; 

@NgModule({
  declarations: [
    AppComponent,
    AddStudentComponent,
    HomeComponent,
    StudentListComponent,
    EditStudentComponent,
    CohortListComponent,
    AddCohortComponent,
    EditCohortComponent,
    CohortStudentListComponent,
    AddCohortStudentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, 
    FormsModule,
    NgbModule,
    ToastrModule.forRoot(), 
    BrowserAnimationsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
