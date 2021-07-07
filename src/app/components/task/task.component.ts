import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Lista } from 'src/app/models/lista';
import { Tarefa } from 'src/app/models/tarefa';
import { EndpointsService } from 'src/app/services/endpoints.service';
import { StatesService } from 'src/app/services/states.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit, OnChanges {
  @Input() tarefas: Tarefa[] = [];
  @Input() listSelected: Lista = { id: 1, title: '' };
  @Input() receivedSubmitTask: string = '';

  filteredTasks: Tarefa[] = [];

  constructor(private endpointsService: EndpointsService) {}

  ngOnInit(): void {}

  ngOnChanges() {
    this.filterTasks();
  }

  filterTasks() {
    this.filteredTasks = this.tarefas.filter(
      (task: Tarefa) => task.listId === this.listSelected.id
    );
  }

  setTask(tarefa: Tarefa) {
    const id = tarefa.id ? tarefa.id : 0;
    const indexTarefa = this.filteredTasks.findIndex((obj) => obj.id === id);

    this.endpointsService.patchTasks(id, !tarefa.isChecked).subscribe();
    this.filteredTasks[indexTarefa].isChecked = !tarefa.isChecked;
  }

  deleteTask(tarefa: Tarefa) {
    const id = tarefa.id ? tarefa.id : 0;
    const indexTarefa = this.filteredTasks.findIndex((obj) => obj.id === id);

    this.filteredTasks.splice(indexTarefa, 1);
    this.endpointsService.deleteTasks(id).subscribe();
  }
}
