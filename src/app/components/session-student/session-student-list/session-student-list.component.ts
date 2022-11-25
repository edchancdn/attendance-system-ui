import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbDateStruct, NgbModal, NgbTimepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { Session } from 'src/app/models/session.model';
import { Student } from 'src/app/models/student.model';
import { SessionStudentService } from 'src/app/services/session-student.service';
import { SessionService } from 'src/app/services/session.service';
import { StudentService } from 'src/app/services/student.service';
import { AddSessionStudentComponent } from '../add-session-student/add-session-student.component';

@Component({
  selector: 'app-session-student-list',
  templateUrl: './session-student-list.component.html',
  styleUrls: ['./session-student-list.component.scss'],
  providers: [DatePipe, NgbTimepickerConfig]
})
export class SessionStudentListComponent implements OnInit {

  currentSession: Session = {};
  message = '';
  meridian = true;
  students?: Student[];
  currentStudent: Student = {};
  currentStudentIndex = -1;
  addStudentsToSession: Student[] = [];

  selectedSessionDate: NgbDateStruct = {
    year: 0,
    month: 0,
    day: 0
  }

  selectedStartTime: any = {
    hour: 0,
    minute: 0
  }

  selectedEndTime: any = {
    hour: 0,
    minute: 0
  }

  constructor(
    private sessionService: SessionService,
    private sessionStudentService: SessionStudentService,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private studentService: StudentService,
    public modalService: NgbModal,
    timeConfig: NgbTimepickerConfig) { 
      timeConfig.spinners = false;
    }

  ngOnInit(): void {
    this.getSession(this.route.snapshot.params["id"]);
  }

  getSession(id: string): void {
    this.sessionService.get(id)
      .subscribe({
        next: (data) => {
          this.currentSession = data;
          console.log(data);

          let sessionDateSt = this.datePipe.transform(this.currentSession.sessionDate, 'yyyyMMdd', 'UTC-0')?.toString();
          this.selectedSessionDate.year = Number(sessionDateSt?.substring(0, 4));
          this.selectedSessionDate.month = Number(sessionDateSt?.substring(4, 6));
          this.selectedSessionDate.day = Number(sessionDateSt?.substring(6));

          this.selectedStartTime.hour = Number(this.currentSession.startTime?.substring(0, 2));
          this.selectedStartTime.minute = Number(this.currentSession.startTime?.substring(3, 5));

          this.selectedEndTime.hour = Number(this.currentSession.endTime?.substring(0, 2));
          this.selectedEndTime.minute = Number(this.currentSession.endTime?.substring(3, 5));

          this.students = this.currentSession.attendedStudents;
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.getSession(this.currentSession.id);
    this.currentStudent = {};
    this.currentStudentIndex = -1;
  }

  addStudent(): void {
    // Get students
    this.studentService.getAll()
      .subscribe({
        next: (data) => {
          this.addStudentsToSession = data;
          console.log(data);
          // Open modal form
          const modalRef = this.modalService.open(AddSessionStudentComponent, { size: 'lg', backdrop: 'static' });
          modalRef.componentInstance.students = this.addStudentsToSession;
          modalRef.result.then((result) => {
            if (result) {
              console.log(result);
              // Get selected students to add
              let add: number[] = result.filter(function (obj: { checked: any; }) {
                return obj.checked;
              }).map(function (obj: { id: any; }) { return obj.id; });
              this.sessionStudentService.addStudents(this.currentSession.id, add)
                .subscribe({
                  next: (res) => {
                    console.log(res);
                    //this.refreshList();
                    this.currentSession = res;
                    this.students = this.currentSession.attendedStudents;
                  },
                  error: (e) => console.error(e)
                });
            }
          }, (reason) => {
            console.log(reason);
          });
        },
        error: (e) => console.error(e)
      });
  }

  deleteStudentRow(index: number): void {
    this.currentStudentIndex = -1;
    let del: number[] = [index];
    this.sessionStudentService.delete(this.currentSession.id, del)
      .subscribe({
        next: (res) => {
          console.log(res);
          //this.refreshList();
          this.currentSession = res;
          this.students = this.currentSession.attendedStudents;
        },
        error: (e) => console.error(e)
      });
  }

}
