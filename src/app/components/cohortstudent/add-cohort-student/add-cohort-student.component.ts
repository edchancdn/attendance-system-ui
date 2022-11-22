import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Cohort } from 'src/app/models/cohort.model';
import { Student } from 'src/app/models/student.model';

@Component({
  selector: 'app-add-cohort-student',
  templateUrl: './add-cohort-student.component.html',
  styleUrls: ['./add-cohort-student.component.scss']
})
export class AddCohortStudentComponent implements OnInit {

  @Input() public students: Student[] = [];
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  constructor( public activeModal: NgbActiveModal ) { }

  ngOnInit(): void {
  }

  passBack() {
    this.passEntry.emit(this.students);
    this.activeModal.close(this.students);
  }

}
