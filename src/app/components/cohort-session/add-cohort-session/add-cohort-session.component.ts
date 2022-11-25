import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Session } from 'src/app/models/session.model';

@Component({
  selector: 'app-add-cohort-session',
  templateUrl: './add-cohort-session.component.html',
  styleUrls: ['./add-cohort-session.component.scss']
})
export class AddCohortSessionComponent implements OnInit {

  @Input() public sessions: Session[] = [];
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  constructor( public activeModal: NgbActiveModal ) { }

  ngOnInit(): void {
  }

  passBack() {
    this.passEntry.emit(this.sessions);
    this.activeModal.close(this.sessions);
  }

  checkAllCheckBox(ev: any) {
		this.sessions.forEach(x => x.checked = ev.target.checked)
	}

	isAllCheckBoxChecked() {
		return this.sessions.every(p => p.checked);
	}
}
