import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Session } from 'src/app/models/session.model';
import { SessionService } from 'src/app/services/session.service';
import { ConfirmationModalComponent } from 'src/app/shared/confirmation-modal/confirmation-modal.component';
import { MessageModalComponent } from 'src/app/shared/message-modal/message-modal.component';

@Component({
  selector: 'app-session-list',
  templateUrl: './session-list.component.html',
  styleUrls: ['./session-list.component.scss']
})
export class SessionListComponent implements OnInit {

  @ViewChild('messageModal')
  private messageModal!: MessageModalComponent;

  @ViewChild('confirmationModal')
  private confirmationModal!: ConfirmationModalComponent;

  modalStyle: string = 'modal-style-primary';
  modalTitle: string = '';
  modalBody: string = '';
  modalButtonColor: string = 'btn-outline-primary';

  sessions?: Session[];
  currentSession: Session = {};
  currentIndex = -1;
  sessionDate: NgbDateStruct = {
    year: 0,
    month: 0,
    day: 0
  }

  constructor(
    private sessionService: SessionService,
    private router: Router) { }

  ngOnInit(): void {
    this.retrieveSessions();
  }

  async openMessageModal() {
    return await this.messageModal.open();
  }

  async openConfirmationModal() {
    return await this.confirmationModal.open();
  }

  getMessageValue(value: any) {
    if (value == 'Ok click') {
      //console.log(value);
    }
  }

  retrieveSessions(): void {
    this.sessionService.getAll()
      .subscribe({
        next: (data) => {
          this.sessions = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveSessions();
    this.currentSession = {};
    this.currentIndex = -1;
  }

  setActiveSession(session: Session, index: number): void {
    this.currentSession = session;
    this.currentIndex = index;
  }

  addSession(): void {
    this.router.navigateByUrl('addsession');
  }

  deleteRow(index: number): void {
    this.currentIndex = index
    this.modalStyle = 'modal-style-danger';
    this.modalTitle = 'Delete session';
    this.modalBody = 'Are you sure to delete this session?';
    this.openConfirmationModal();
  }

  getConfirmationValue(value: any) {
    if (value == 'Save click') {
      this.confirmedDeleteRow(this.currentIndex);
    }
  }

  confirmedDeleteRow(index: number): void {
    this.currentIndex = -1;
    this.sessionService.delete(index)
      .subscribe({
        next: (res) => {
          //console.log(res);
          this.refreshList();
        },
        error: (e) => {
          //console.error(e)
          this.modalStyle = 'modal-style-danger';
          this.modalTitle = 'Cannot delete session';
          this.modalBody = e.error.message.toString();
          this.openMessageModal();
        }
      });
  }

  editRow(index: number): void {
    this.currentIndex = index;
    this.router.navigateByUrl('editsession/' + index);
  }

  viewSessionStudentRow(index: number): void {
    this.currentIndex = index;
    this.router.navigateByUrl('sessionstudent/' + index);
  }


  searchSessionDate(): void {
    this.currentSession = {};
    this.currentIndex = -1;
    let sessionDt = this.sessionDate?.year.toString() + '-'
      + this.sessionDate?.month.toString() + '-'
      + this.sessionDate?.day.toString();
    this.sessionService.findByDate(sessionDt)
      .subscribe({
        next: (data) => {
          this.sessions = data;
          console.log(data);
        },
        error: (e) => {
          console.error(e);
          this.sessions = [];
        }
      });
  }

}
