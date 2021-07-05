import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Lista } from '../models/lista';
import { Tarefa } from '../models/tarefa';

@Injectable({
  providedIn: 'root',
})
export class StatesService {
  private taskDefault: Tarefa = {
    id: 1,
    listId: 1,
    title: '',
    isChecked: false,
  };
  private listDefault: Lista = { id: 1, title: '' };
  private taskSelected = new BehaviorSubject(this.taskDefault);
  private listSelected = new BehaviorSubject(this.listDefault);
  private filteredTasks = new Subject();

  task = this.taskSelected.asObservable();
  list = this.listSelected.asObservable();
  filtered = this.filteredTasks.asObservable();

  constructor() {}

  getTaskSelected() {
    return this.task.pipe(tap(console.log));
  }

  setTaskSelected(obj: Tarefa) {
    this.taskSelected.next(obj);
  }

  getListSelected() {
    return this.list.pipe(tap(console.log));
  }

  setListSelected(obj: Lista) {
    this.listSelected.next(obj);
  }
}
