import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { StudentListComponent } from './components/student/student-list/student-list.component';
import { AddStudentComponent } from './components/student/add-student/add-student.component';
import { EditStudentComponent } from './components/student/edit-student/edit-student.component';
import { CohortListComponent } from './components/cohort/cohort-list/cohort-list.component';
import { EditCohortComponent } from './components/cohort/edit-cohort/edit-cohort.component';
import { AddCohortComponent } from './components/cohort/add-cohort/add-cohort.component';
import { CohortStudentListComponent } from './components/cohort-student/cohort-student-list/cohort-student-list.component';
import { AddCohortStudentComponent } from './components/cohort-student/add-cohort-student/add-cohort-student.component';
import { SessionListComponent } from './components/session/session-list/session-list.component';
import { EditSessionComponent } from './components/session/edit-session/edit-session.component';
import { AddSessionComponent } from './components/session/add-session/add-session.component';
import { SessionStudentListComponent } from './components/session-student/session-student-list/session-student-list.component';
import { AddSessionStudentComponent } from './components/session-student/add-session-student/add-session-student.component';
import { CohortSessionListComponent } from './components/cohort-session/cohort-session-list/cohort-session-list.component';
import { AddCohortSessionComponent } from './components/cohort-session/add-cohort-session/add-cohort-session.component';


const routes: Routes = [
  // todo: Home/Landing page
  //{ path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '', redirectTo: 'student', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'student', component: StudentListComponent },
  { path: 'addstudent', component: AddStudentComponent },
  { path: 'editstudent/:id', component: EditStudentComponent },
  { path: 'cohort', component: CohortListComponent },
  { path: 'editcohort/:id', component: EditCohortComponent },
  { path: 'addcohort', component: AddCohortComponent },
  { path: 'cohortstudent/:id', component: CohortStudentListComponent },
  { path: 'addcohortstudent/:id', component: AddCohortStudentComponent },
  { path: 'cohortsession/:id', component: CohortSessionListComponent },
  { path: 'addcohortsession/:id', component: AddCohortSessionComponent },
  { path: 'session', component: SessionListComponent },
  { path: 'editsession/:id', component: EditSessionComponent },
  { path: 'addsession', component: AddSessionComponent },
  { path: 'sessionstudent/:id', component: SessionStudentListComponent },
  { path: 'addsessionstudent/:id', component: AddSessionStudentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
