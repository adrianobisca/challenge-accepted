import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Lista } from 'src/app/models/lista';
import { StatesService } from 'src/app/services/states.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @Input() listas: Lista[] = [];
  listSelected: Lista = { id: 1, title: '' };

  constructor(private statesService: StatesService) {}

  ngOnInit(): void {
    this.statesService.setListSelected(this.listas[0]);
  }

  setList(obj: Lista) {
    this.statesService.setListSelected(obj);
    this.listSelected = obj;
  }
}
