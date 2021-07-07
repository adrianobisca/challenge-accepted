import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Lista } from 'src/app/models/lista';
import { EndpointsService } from 'src/app/services/endpoints.service';
import { StatesService } from 'src/app/services/states.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @Input() listas: Lista[] = [];
  listSelected: Lista = { id: 1, title: '' };

  constructor(
    private statesService: StatesService,
    private endpointsService: EndpointsService
  ) {}

  ngOnInit(): void {
    this.setList(this.listas[0]);
  }

  setList(obj: Lista) {
    this.statesService.setListSelected(obj);
    this.listSelected = obj;
  }

  deleteList(lista: Lista) {
    const idDelete = lista.id ? lista.id : 0;
    const idSelected = this.listSelected.id;
    const indexLista = this.listas.findIndex((obj) => obj.id === idDelete);

    if (idDelete === idSelected) {
      this.setList(this.listas[0]);
    }
    if (indexLista === 0) {
      this.setList(this.listas[1]);
    }

    this.listas.splice(indexLista, 1);
    this.endpointsService.deleteLists(idDelete).subscribe();
  }
}
