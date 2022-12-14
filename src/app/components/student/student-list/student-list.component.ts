import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from 'src/app/models/student.model';
import { StudentService } from 'src/app/services/student.service';
import { ConfirmationModalComponent } from 'src/app/shared/confirmation-modal/confirmation-modal.component';
import { MessageModalComponent } from 'src/app/shared/message-modal/message-modal.component';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {

  @ViewChild('messageModal')
  private messageModal!: MessageModalComponent;

  @ViewChild('confirmationModal')
  private confirmationModal!: ConfirmationModalComponent;

  modalStyle: string = 'modal-style-primary';
  modalTitle: string = '';
  modalBody: string = '';
  modalButtonColor: string = 'btn-outline-primary';

  students?: Student[];
  currentStudent: Student = {};
  currentIndex = -1;
  lastName = '';

  constructor(private studentService: StudentService,
    private router: Router) { }

  ngOnInit(): void {
    this.retrieveStudents();
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

  retrieveStudents(): void {
    this.studentService.getAll()
      .subscribe({
        next: (data) => {
          this.students = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveStudents();
    this.currentStudent = {};
    this.currentIndex = -1;
  }

  setActiveStudent(student: Student, index: number): void {
    this.currentStudent = student;
    this.currentIndex = index;
  }

  addStudent(): void {
    this.router.navigateByUrl('addstudent');
  }

  deleteRow(index: number): void {
    this.currentIndex = index
    this.modalStyle = 'modal-style-danger';
    this.modalTitle = 'Delete student';
    this.modalBody = 'Are you sure to delete this student?';
    this.openConfirmationModal();
  }

  getConfirmationValue(value: any) {
    if (value == 'Save click') {
      this.confirmedDeleteRow(this.currentIndex);
    }
  }

  confirmedDeleteRow(index: number): void {
    this.currentIndex = -1;
    this.studentService.delete(index)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => {
          console.error(e)
          this.modalStyle = 'modal-style-danger';
          this.modalTitle = 'Student not deleted';
          this.modalBody = e.error.message.toString();
          this.openMessageModal();
        }
      });
  }

  editRow(index: number): void {
    this.currentIndex = index;
    this.router.navigateByUrl('editstudent/' + index);
  }

  searchLastName(): void {
    this.currentStudent = {};
    this.currentIndex = -1;
    this.studentService.findByLastName(this.lastName)
      .subscribe({
        next: (data) => {
          this.students = data;
          console.log(data);
        },
        error: (e) => {
          console.error(e);
          this.students = [];
        }
      });
  }

}
