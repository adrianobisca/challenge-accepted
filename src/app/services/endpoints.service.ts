import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';

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
}
