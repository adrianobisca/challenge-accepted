import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, take } from 'rxjs/operators';
import { Lista } from '../models/lista';
import { Tarefa } from '../models/tarefa';

@Injectable({
  providedIn: 'root',
})
export class EndpointsService {
  constructor(private httpClient: HttpClient) {}

  getLists() {
    return this.httpClient
      .get<Lista[]>('http://localhost:3000/lists/')
      .pipe(take(1), delay(2000));
  }

  getTasks() {
    return this.httpClient
      .get<Tarefa[]>('http://localhost:3000/tasks/')
      .pipe(take(1), delay(1000));
  }

  postLists(list: Lista) {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(list);

    return this.httpClient
      .post('http://localhost:3000/lists/', list)
      .pipe(take(1));
  }

  postTasks(task: Tarefa) {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(task);

    return this.httpClient
      .post('http://localhost:3000/tasks', body, { headers: headers })
      .pipe(take(1));
  }

  patchTasks(task: number, taskState: boolean) {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify({
      isChecked: taskState,
    });
    return this.httpClient
      .patch('http://localhost:3000/tasks/' + task, body, {
        headers: headers,
      })
      .pipe(take(1));
  }

  deleteTasks(task: number) {
    return this.httpClient
      .delete('http://localhost:3000/tasks/' + task)
      .pipe(take(1));
  }

  deleteLists(list: number) {
    return this.httpClient
      .delete('http://localhost:3000/lists/' + list)
      .pipe(take(1));
  }
}
