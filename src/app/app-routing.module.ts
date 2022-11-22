import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { StudentListComponent } from './components/student/student-list/student-list.component';
import { AddStudentComponent } from './components/student/add-student/add-student.component';
import { EditStudentComponent } from './components/student/edit-student/edit-student.component';
import { CohortListComponent } from './components/cohort/cohort-list/cohort-list.component';
import { EditCohortComponent } from './components/cohort/edit-cohort/edit-cohort.component';
import { AddCohortComponent } from './components/cohort/add-cohort/add-cohort.component';
import { CohortStudentListComponent } from './components/cohortstudent/cohort-student-list/cohort-student-list.component';
import { AddCohortStudentComponent } from './components/cohortstudent/add-cohort-student/add-cohort-student.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'student', component: StudentListComponent },
  { path: 'addstudent', component: AddStudentComponent },
  { path: 'editstudent/:id', component: EditStudentComponent },
  { path: 'cohort', component: CohortListComponent },
  { path: 'editcohort/:id', component: EditCohortComponent },
  { path: 'addcohort', component: AddCohortComponent },
  { path: 'cohortstudent/:id', component: CohortStudentListComponent },
  { path: 'addcohortstudent/:id', component: AddCohortStudentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
