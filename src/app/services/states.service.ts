import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class StatesService {
  private taskSelected = new BehaviorSubject(1);
  private listSelected = new BehaviorSubject(1);
  private filteredTasks = new Subject();

  task = this.taskSelected.asObservable();
  list = this.listSelected.asObservable();
  filtered = this.filteredTasks.asObservable();

  constructor() {}

  getTaskSelected() {
    return this.task.pipe(tap(console.log));
  }

  setTaskSelected(id: number) {
    this.taskSelected.next(id);
  }

  getListSelected() {
    return this.list.pipe(tap(console.log));
  }

  setListSelected(id: number) {
    this.listSelected.next(id);
  }

}
