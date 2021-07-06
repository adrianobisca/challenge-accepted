import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Lista } from './models/lista';
import { Tarefa } from './models/tarefa';
import { EndpointsService } from './services/endpoints.service';
import { StatesService } from './services/states.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  listas$!: Observable<Lista[]>;
  tarefas$!: Observable<Tarefa[]>;
  listSelected: Lista = { id: 1, title: '' };
  receivedSubmitTask: string = '';
  receivedSubmitList: string = '';

  constructor(
    private endpointsService: EndpointsService,
    private statesService: StatesService
  ) {}

  ngOnInit() {
    this.statesService
      .getListSelected()
      .subscribe((data) => (this.listSelected = data));

    this.loadList();
    this.loadTask();
  }

  receiveSubmitTask(taskFlag: string) {
    this.receivedSubmitTask = taskFlag;
    this.loadTask();
  }
  receiveSubmitList(listFlag: string) {
    this.receivedSubmitList = listFlag;
    this.loadList();
  }

  loadList() {
    this.listas$ = this.endpointsService.getLists();
  }

  loadTask() {
    this.tarefas$ = this.endpointsService.getTasks();
  }
}
