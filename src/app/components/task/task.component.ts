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
export class TaskComponent implements OnInit {
  @Input() tarefas: Tarefa[] = [];
  //@Input() lista: Lista = { id: 1, title: '' };

  listSelected: Lista = { id: 1, title: '' };
  filteredTasks: Tarefa[] = [];

  constructor(
    private statesService: StatesService,
    private endpointsService: EndpointsService
  ) {}

  ngOnInit(): void {
    this.statesService.getListSelected().subscribe((data) => {
      this.listSelected = data;
      this.filterTasks();
    });
  }

  filterTasks() {
    this.filteredTasks = this.tarefas.filter(
      (task: Tarefa) => task.listId === this.listSelected.id
    );
  }

  setTask(tarefa: Tarefa) {
    const id = tarefa.id ? tarefa.id : 0;
    const indexTarefa = this.filteredTasks.findIndex((obj) => obj.id === id);

    this.filteredTasks[indexTarefa].isChecked = !tarefa.isChecked;
    this.endpointsService.patchTasks(id, !tarefa.isChecked).subscribe();
  }

  deleteTask(tarefa: Tarefa) {
    const id = tarefa.id ? tarefa.id : 0;
    const indexTarefa = this.filteredTasks.findIndex((obj) => obj.id === id);

    this.filteredTasks.splice(indexTarefa, 1);
    this.endpointsService.deleteTasks(id).subscribe();
  }
}