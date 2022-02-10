import { TaskDto } from "./task.dto"

export class TaskDtoMock {
  static toDo(): TaskDto[] {
    return [
      {
        id: 1,
        title: 'Get to work',
        statusId: 1
      },
      {
        id: 2,
        title: 'Pick up groceries',
statusId: 1
      },
      {
        id: 3,
        title: 'Go home',
statusId: 1
      },
      {
        id: 4,
        title: 'Fall asleep',
statusId: 1
      },
      {
        id: 5,
        title: 'Finish project',
statusId: 1
      },
      {
        id: 6,
        title: 'Listen to music',
statusId: 1
      },
    ]
  }

  static inProgress(): TaskDto[] {
    return [
      {
        id: 7,
        title: 'Get off Work',

statusId: 1
      },
      {
        id: 8,
        title: 'Pick up ladies',

statusId: 1
      },
      {
        id: 9,
        title: 'Go skydiving',

statusId: 1
      },
      {
        id: 10,
        title: 'play some games',

statusId: 1
      },
    ]
  }

  static done(): TaskDto[] {
    return [
      {
        id: 11,
        title: 'Get up',

statusId: 1
      },
      {
        id: 12,
        title: 'Brush teeth',

statusId: 1
      },
      {
        id: 13,
        title: 'Take a shower',

statusId: 1
      },
      {
        id: 14,
        title: 'Check e-mail',

statusId: 1
      },
      {
        id: 15,
        title: 'Walk dog',

statusId: 1
      },
    ]
  }
}
