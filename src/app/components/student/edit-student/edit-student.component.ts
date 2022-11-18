import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/models/student.model';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.scss']
})
export class EditStudentComponent implements OnInit {
 
  currentStudent: Student = {
    id: 0,
    lastName: '',
    firstName: ''
  };
  message = '';

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
      this.getStudent(this.route.snapshot.params["id"]);
  }

  getStudent(id: string): void {
    this.studentService.get(id)
      .subscribe({
        next: (data) => {
          this.currentStudent = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  updateStudent(): void {
    this.message = '';

    this.studentService.update(this.currentStudent.id, this.currentStudent)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This student was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  deleteStudent(): void {
    this.studentService.delete(this.currentStudent.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/student']);
        },
        error: (e) => console.error(e)
      });
  }

  cancel(): void {
    this.router.navigateByUrl('student');
  }

}
