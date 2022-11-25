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
import { CohortStudentListComponent } from './components/cohort-student/cohort-student-list/cohort-student-list.component';
import { AddCohortStudentComponent } from './components/cohort-student/add-cohort-student/add-cohort-student.component';
import { SessionListComponent } from './components/session/session-list/session-list.component';
import { EditSessionComponent } from './components/session/edit-session/edit-session.component';
import { AddSessionComponent } from './components/session/add-session/add-session.component';
import { ToTwelveHoursBasePipe } from './pipes/to-twelve-hours-base.pipe';
import { SessionStudentListComponent } from './components/session-student/session-student-list/session-student-list.component';
import { AddSessionStudentComponent } from './components/session-student/add-session-student/add-session-student.component';
import { CohortSessionListComponent } from './components/cohort-session/cohort-session-list/cohort-session-list.component';
import { AddCohortSessionComponent } from './components/cohort-session/add-cohort-session/add-cohort-session.component';
import { SharedModule } from './shared/shared.module';


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
    AddCohortStudentComponent,
    SessionListComponent,
    EditSessionComponent,
    AddSessionComponent,
    ToTwelveHoursBasePipe,
    SessionStudentListComponent,
    AddSessionStudentComponent,
    CohortSessionListComponent,
    AddCohortSessionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, 
    FormsModule,
    NgbModule,
    ToastrModule.forRoot(), 
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
