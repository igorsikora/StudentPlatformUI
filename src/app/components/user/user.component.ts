import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StudentDto } from 'src/app/models/student.dto';
import { StudentDtoMock } from 'src/app/models/student.dto.mock';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private service: StudentService, private snackBar: MatSnackBar) { }
  userForm!: FormGroup;
  studentDto!: StudentDto;
  ngOnInit(): void {
    this.service.getStudent(1).subscribe((result :StudentDto) => {
      this.studentDto = result
      this.userForm = this.formBuilder.group({
        firstName: [this.studentDto.firstName, Validators.required],
        lastName: [this.studentDto.lastName, Validators.required],
        email: [this.studentDto.email, [Validators.required, Validators.email]]
   });
    });


  }

  onFormSubmit(): void {
    this.studentDto = {
      ...this.studentDto,
      email: this.userForm.get('email')!.value,
      firstName : this.userForm.get('firstName')!.value,
      lastName :  this.userForm.get('lastName')!.value,
    }
    this.service.updateStudent(this.studentDto).subscribe(
      () => {
        let snackBarRef = this.snackBar.open('User updated', undefined,  {
          duration: 2000
        });
      }
    );
}
}
