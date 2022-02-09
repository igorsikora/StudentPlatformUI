import { StudentTaskListDto } from "./student-task-list.dto";

export class StudentTaskListDtoMock {
  static toDo(): StudentTaskListDto[] {
    return [
      {
        id: 1,
        title: 'Get to work',

        studentId: 1,
statusId: 1
      },
      {
        id: 2,
        title: 'Pick up groceries',

        studentId: 1,
statusId: 1
      },
      {
        id: 3,
        title: 'Go home',

        studentId: 1,
statusId: 1
      },
      {
        id: 4,
        title: 'Fall asleep',

        studentId: 1,
statusId: 1
      },
      {
        id: 5,
        title: 'Finish project',

        studentId: 1,
statusId: 1
      },
      {
        id: 6,
        title: 'Listen to music',

        studentId: 1,
statusId: 1
      },
    ]
  }

  static inProgress(): StudentTaskListDto[] {
    return [
      {
        id: 7,
        title: 'Get off Work',

        studentId: 1,
statusId: 1
      },
      {
        id: 8,
        title: 'Pick up ladies',

        studentId: 1,
statusId: 1
      },
      {
        id: 9,
        title: 'Go skydiving',

        studentId: 1,
statusId: 1
      },
      {
        id: 10,
        title: 'play some games',

        studentId: 1,
statusId: 1
      },
    ]
  }

  static done(): StudentTaskListDto[] {
    return [
      {
        id: 11,
        title: 'Get up',

        studentId: 1,
statusId: 1
      },
      {
        id: 12,
        title: 'Brush teeth',

        studentId: 1,
statusId: 1
      },
      {
        id: 13,
        title: 'Take a shower',

        studentId: 1,
statusId: 1
      },
      {
        id: 14,
        title: 'Check e-mail',

        studentId: 1,
statusId: 1
      },
      {
        id: 15,
        title: 'Walk dog',

        studentId: 1,
statusId: 1
      },
    ]
  }
}
