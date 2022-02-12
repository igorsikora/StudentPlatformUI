import { UserDto } from "./user.dto";

export class UserDtoMock {
  static dto(): UserDto {
    return {
      firstName: 'Jan',
      lastName: 'Kowalski',
      email: 'demoUser@polsl.pl',
      userName: 'demoUser'
    }
  }
}
