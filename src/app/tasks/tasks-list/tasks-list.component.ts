import { Component, computed, inject, signal } from '@angular/core';

import { TaskItemComponent } from './task-item/task-item.component';
import { TasksService } from '../tasks.service';
import { TASK_STATUS_OPTIONS, TaskStatusOptions, taskStatusOptionsProvider } from '../task.model';
// "open">Open</option>
//       <option value="in-progress">In-Progress</option>
//       <option value="done">Completed</option>
@Component({
  selector: 'app-tasks-list',
  standalone: true,
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
  imports: [TaskItemComponent],
  providers:[taskStatusOptionsProvider]
})
export class TasksListComponent {
  private tasksService = inject(TasksService);
  private selectedFilter = signal<string>('all');
  //tasks = this.tasksService.allTasks;
  taskStatueOptions = inject(TASK_STATUS_OPTIONS)
  tasks = computed(()=>{
    switch(this.selectedFilter()){
      case 'all':
        return this.tasksService.allTasks();
      case 'Open':
        return this.tasksService.allTasks().filter((task)=>task.status ==='OPEN' ); 
      case 'in-progress':
        return this.tasksService.allTasks().filter((task)=>task.status ==='IN_PROGRESS' );
      case 'done':
        return this.tasksService.allTasks().filter((task)=>task.status ==='DONE' );
      default:
        return this.tasksService.allTasks();
    }
  });//return computed signal depenence on other signals

  onChangeTasksFilter(filter: string) {
    this.selectedFilter.set(filter);
  }


}
