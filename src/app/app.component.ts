import { Component, OnInit } from '@angular/core';
import { Observer, Subscription } from 'rxjs';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { EndpointsService } from './services/endpoints.service';
import { StatesService } from './services/states.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  listas: any;
  tarefas: any;
  listSelected: any;
  taskSelected: any;
  filteredTasks: any;

  constructor(
    private endpointsService: EndpointsService,
    private statesService: StatesService
  ) {}

  ngOnInit() {
    this.endpointsService.getLists().subscribe((data) => (this.listas = data));
    this.endpointsService.getTasks().subscribe((data) => {
      this.tarefas = data;
      this.filterTasks();
    });

    this.statesService
      .getTaskSelected()
      .subscribe((data) => (this.taskSelected = data));

    this.statesService
      .getListSelected()
      .subscribe((data) => (this.listSelected = data));
  }

  setTask(id: number) {
    this.statesService.setTaskSelected(id);
  }

  setList(id: number) {
    this.statesService.setListSelected(id);
    this.filterTasks();
  }

  filterTasks() {
    this.filteredTasks = this.tarefas.filter(
      (task: any) => task.listId === this.listSelected
    );
  }
}
