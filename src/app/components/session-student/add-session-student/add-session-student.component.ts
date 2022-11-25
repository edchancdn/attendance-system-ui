import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Student } from 'src/app/models/student.model';

@Component({
  selector: 'app-add-session-student',
  templateUrl: './add-session-student.component.html',
  styleUrls: ['./add-session-student.component.scss']
})
export class AddSessionStudentComponent implements OnInit {

  @Input() public students: Student[] = [];
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  constructor( public activeModal: NgbActiveModal ) { }

  ngOnInit(): void {
  }

  passBack() {
    this.passEntry.emit(this.students);
    this.activeModal.close(this.students);
  }

  checkAllCheckBox(ev: any) {
		this.students.forEach(x => x.checked = ev.target.checked)
	}

	isAllCheckBoxChecked() {
		return this.students.every(p => p.checked);
	}

}
