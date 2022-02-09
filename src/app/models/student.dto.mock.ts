import { StudentDto } from "./student.dto";

export class StudentDtoMock {
  static dto(): StudentDto {
    return {
      studentId: 1,
      firstName: 'Jan',
      lastName: 'Kowalski',
      email: 'demoUser@polsl.pl'
    }
  }
}
