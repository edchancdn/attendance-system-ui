import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Cohort } from 'src/app/models/cohort.model';
import { Student } from 'src/app/models/student.model';
import { CohortService } from 'src/app/services/cohort.service';
import { CohortStudentService } from 'src/app/services/cohort-student.service';
import { AddCohortStudentComponent } from '../add-cohort-student/add-cohort-student.component';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-cohort-student-list',
  templateUrl: './cohort-student-list.component.html',
  styleUrls: ['./cohort-student-list.component.scss'],
  providers: [DatePipe]
})
export class CohortStudentListComponent implements OnInit {

  currentCohort: Cohort = {};
  message = '';
  students?: Student[];
  currentStudent: Student = {};
  currentStudentIndex = -1;
  addStudentsToCohort: Student[] = [];

  selectedStartDate: NgbDateStruct = {
    year: 0,
    month: 0,
    day: 0
  }
  selectedEndDate: NgbDateStruct = {
    year: 0,
    month: 0,
    day: 0
  }

  constructor(
    private cohortService: CohortService,
    private cohortStudentService: CohortStudentService,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private studentService: StudentService,
    public modalService: NgbModal) { }

  ngOnInit(): void {
    this.getCohort(this.route.snapshot.params["id"]);
  }

  getCohort(id: string): void {
    this.cohortService.get(id)
      .subscribe({
        next: (data) => {
          this.currentCohort = data;
          console.log(data);

          let startDateSt = this.datePipe.transform(this.currentCohort.startDate, 'yyyyMMdd')?.toString();
          this.selectedStartDate.year = Number(startDateSt?.substring(0, 4));
          this.selectedStartDate.month = Number(startDateSt?.substring(4, 6));
          this.selectedStartDate.day = Number(startDateSt?.substring(6));

          let endDateSt = this.datePipe.transform(this.currentCohort.endDate, 'yyyyMMdd')?.toString();
          this.selectedEndDate.year = Number(endDateSt?.substring(0, 4));
          this.selectedEndDate.month = Number(endDateSt?.substring(4, 6));
          this.selectedEndDate.day = Number(endDateSt?.substring(6));

          this.students = this.currentCohort.students;
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.getCohort(this.currentCohort.id);
    this.currentStudent = {};
    this.currentStudentIndex = -1;
  }

  addStudent(): void {
    // Get students
    this.studentService.getAll()
      .subscribe({
        next: (data) => {
          this.addStudentsToCohort = data;
          console.log(data);
          // Open modal form
          const modalRef = this.modalService.open(AddCohortStudentComponent);
          modalRef.componentInstance.students = this.addStudentsToCohort;
          modalRef.result.then((result) => {
            if (result) {
              console.log(result);
              // Get selected students to add
              let add: number[] = result.filter(function (obj: { checked: any; }) {
                return obj.checked;
              }).map(function (obj: { id: any; }) { return obj.id; });
              this.cohortStudentService.addStudents(this.currentCohort.id, add)
                .subscribe({
                  next: (res) => {
                    console.log(res);
                    //this.refreshList();
                    this.currentCohort = res;
                    this.students = this.currentCohort.students;
                  },
                  error: (e) => console.error(e)
                });
            }
          });
        },
        error: (e) => console.error(e)
      });
    // modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
    //   console.log(receivedEntry);
    // })
  }

  deleteStudentRow(index: number): void {
    this.currentStudentIndex = -1;
    let del: number[] = [index];
    this.cohortStudentService.delete(this.currentCohort.id, del)
      .subscribe({
        next: (res) => {
          console.log(res);
          //this.refreshList();
          this.currentCohort = res;
          this.students = this.currentCohort.students;
        },
        error: (e) => console.error(e)
      });
  }

}
