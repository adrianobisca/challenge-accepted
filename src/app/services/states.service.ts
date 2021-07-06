import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Lista } from '../models/lista';

@Injectable({
  providedIn: 'root',
})
export class StatesService {
  private listDefault: Lista = { id: 1, title: '' };
  private listSelected = new BehaviorSubject(this.listDefault);

  list = this.listSelected.asObservable();

  constructor() {}

  getListSelected() {
    return this.list.pipe(tap(console.log));
  }

  setListSelected(obj: Lista) {
    this.listSelected.next(obj);
  }
}
