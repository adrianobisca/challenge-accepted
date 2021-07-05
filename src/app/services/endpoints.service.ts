import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { take, tap } from 'rxjs/operators';
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
      .pipe(tap(console.log),take(1));
  }

  getTasks() {
    return this.httpClient
      .get<Tarefa[]>('http://localhost:3000/tasks/')
      .pipe(tap(console.log),take(1));
  }

  postLists(list: Lista) {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(list);

    console.log(body);
    return this.httpClient
      .post('http://localhost:3000/lists/', list)
      .pipe(take(1));
  }

  postTasks(task: Tarefa) {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(task);

    console.log(body);
    return this.httpClient
      .post('http://localhost:3000/tasks', body, { headers: headers })
      .pipe(take(1));
  }

  patchTasks(task: number, taskState: boolean) {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify({
      isChecked: taskState,
    });
    console.log(body);
    return this.httpClient.patch('http://localhost:3000/tasks/' + task, body, {
      headers: headers,
    }).pipe(take(1));
  }

  deleteTasks(task: number) {
    return this.httpClient
      .delete('http://localhost:3000/tasks/' + task)
      .pipe(take(1));
  }
}
