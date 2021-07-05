import { Component, Input, OnInit, Output } from '@angular/core';
import { Lista } from 'src/app/models/lista';
import { StatesService } from 'src/app/services/states.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @Input() listas: Lista[] = [];
  //@Output() listaSelecionada: Lista = { id: 1, title: '' };

  listSelected: Lista = { id: 1, title: '' };

  constructor(private statesService: StatesService) {}

  ngOnInit(): void {
    this.statesService
      .getListSelected()
      .subscribe((data) => (this.listSelected = data));
  }

  setList(obj: Lista) {
    this.statesService.setListSelected(obj);
    // this.filterTasks();
  }
}
