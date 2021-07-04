import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EndpointsService {
  constructor(private httpClient: HttpClient) {}

  getLists() {
    return this.httpClient
      .get('http://localhost:3000/lists/')
      .pipe(tap(console.log));
  }

  getTasks() {
    return this.httpClient
      .get('http://localhost:3000/tasks/')
      .pipe(tap(console.log));
  }

  postLists(list: any) {
    return this.httpClient
      .post('http://localhost:3000/lists/', list)
      .pipe(tap(console.log));
  }

  postTasks(task: any) {
    return this.httpClient
      .post('http://localhost:3000/tasks/', task)
      .pipe(tap(console.log));
  }
}
