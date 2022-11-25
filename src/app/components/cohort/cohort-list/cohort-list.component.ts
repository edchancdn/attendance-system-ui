import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Cohort } from 'src/app/models/cohort.model';
import { CohortService } from 'src/app/services/cohort.service';
import { ConfirmationModalComponent } from 'src/app/shared/confirmation-modal/confirmation-modal.component';
import { MessageModalComponent } from 'src/app/shared/message-modal/message-modal.component';

@Component({
  selector: 'app-cohort-list',
  templateUrl: './cohort-list.component.html',
  styleUrls: ['./cohort-list.component.scss']
})
export class CohortListComponent implements OnInit {

  @ViewChild('messageModal')
  private messageModal!: MessageModalComponent;

  @ViewChild('confirmationModal')
  private confirmationModal!: ConfirmationModalComponent;

  modalStyle: string = 'modal-style-primary';
  modalTitle: string = '';
  modalBody: string = '';
  modalButtonColor: string = 'btn-outline-primary';

  cohorts?: Cohort[];
  currentCohort: Cohort = {};
  currentIndex = -1;
  lastName = '';

  constructor(private cohortService: CohortService,
    private router: Router) { }

  ngOnInit(): void {
    this.retrieveCohorts();
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

  retrieveCohorts(): void {
    this.cohortService.getAll()
      .subscribe({
        next: (data) => {
          this.cohorts = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveCohorts();
    this.currentCohort = {};
    this.currentIndex = -1;
  }

  setActiveCohort(cohort: Cohort, index: number): void {
    this.currentCohort = cohort;
    this.currentIndex = index;
  }

  addCohort(): void {
    this.router.navigateByUrl('addcohort');
  }

  deleteRow(index: number): void {
    this.currentIndex = index
    this.modalStyle = 'modal-style-danger';
    this.modalTitle = 'Delete cohort';
    this.modalBody = 'Are you sure to delete this cohort?';
    this.openConfirmationModal();
  }

  getConfirmationValue(value: any) {
    if (value == 'Save click') {
      this.confirmedDeleteRow(this.currentIndex);
    }
  }

  confirmedDeleteRow(index: number): void {
    this.currentIndex = -1;
    this.cohortService.delete(index)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }

  editRow(index: number): void {
    this.currentIndex = index;
    this.router.navigateByUrl('editcohort/' + index);
  }

  viewCohortStudentRow(index: number): void {
    this.currentIndex = index;
    this.router.navigateByUrl('cohortstudent/' + index);
  }

  viewCohortSessionRow(index: number): void {
    this.currentIndex = index;
    this.router.navigateByUrl('cohortsession/' + index);
  }

  searchName(): void {
    this.currentCohort = {};
    this.currentIndex = -1;
    this.cohortService.findByName(this.lastName)
      .subscribe({
        next: (data) => {
          this.cohorts = data;
          console.log(data);
        },
        error: (e) => {
          console.error(e);
          this.cohorts = [];
        }
      });
  }

}
