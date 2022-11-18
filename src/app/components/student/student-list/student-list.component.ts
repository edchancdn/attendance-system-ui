import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from 'src/app/models/student.model';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {

  students?: Student[];
  currentStudent: Student = {};
  currentIndex = -1;
  lastName = '';

  constructor(private studentService: StudentService,
    private router: Router) { }

  ngOnInit(): void {
    this.retrieveStudents();
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
    this.currentIndex = -1;
    this.studentService.delete(index)
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
