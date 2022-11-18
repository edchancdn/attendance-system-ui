import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from 'src/app/models/student.model';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent {

  student: Student = {
    lastName: '',
    firstName: ''
  };
  submitted = false;

  constructor(private studentService: StudentService,
    private router: Router) { }

  saveStudent(): void {
    const data = {
      lastName: this.student.lastName,
      firstName: this.student.firstName
    };

    this.studentService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }

  newStudent(): void {
    this.submitted = false;
    this.student = {
      lastName: '',
      firstName: ''
    };
  }

  cancel(): void {
    this.router.navigateByUrl('student');
  }

}
