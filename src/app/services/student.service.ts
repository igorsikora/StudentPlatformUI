import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { StudentDto } from '../models/student.dto';

@Injectable({providedIn: 'root'})
export class StudentService {
  private controllerUrl = 'api/Students';
  constructor(private http: HttpClient) { }

  getStudent(id:number) {
    return this.http.get<StudentDto>(environment.apiUrl + this.controllerUrl + "/student/" + id);
  }
  updateStudent(dto: StudentDto) {
    return this.http.put(environment.apiUrl + this.controllerUrl, dto);
  }
}
