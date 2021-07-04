import { Component, OnInit } from '@angular/core';
import { EndpointsService } from './services/endpoints.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  listas: any;
  tarefas: any;

  constructor(private endpointsService: EndpointsService) {}

  ngOnInit() {
    this.endpointsService.getLists().subscribe((data) => (this.listas = data));
    this.endpointsService.getTasks().subscribe((data) => (this.tarefas = data));
  }
}
