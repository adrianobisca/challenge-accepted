import { Component, DoCheck, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observer, Subscription } from 'rxjs';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Lista } from './models/lista';
import { Tarefa } from './models/tarefa';
import { EndpointsService } from './services/endpoints.service';
import { StatesService } from './services/states.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  listas$!: Observable<Lista[]>;
  tarefas$!: Observable<Tarefa[]>;
  tarefas: Tarefa[] = [];
  listSelected: any;
  taskSelected: any;
  filteredTasks: any;
  submittedTask = false;
  submittedList = false;
  formTask!: FormGroup;
  formList!: FormGroup;

  constructor(
    private endpointsService: EndpointsService,
    private statesService: StatesService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.formTask = this.formBuilder.group({
      title: [null, [Validators.required, Validators.minLength(1)]],
    });

    this.formList = this.formBuilder.group({
      title: [null, [Validators.required, Validators.minLength(1)]],
    });

    this.statesService
      .getTaskSelected()
      .subscribe((data) => (this.taskSelected = data));

    this.statesService
      .getListSelected()
      .subscribe((data) => (this.listSelected = data));

    this.loadList();
    this.loadTask();
  }

  loadList() {
    this.listas$ = this.endpointsService.getLists();
  }

  loadTask() {
    this.tarefas$ = this.endpointsService.getTasks();
    //this.endpointsService.getTasks().subscribe((data) => {
    //  this.tarefas = data;
    //  this.filterTasks();
   // });
  }

  setTask(id: number, isChecked: boolean) {
    console.log(id, id);
    this.endpointsService.patchTasks(id, isChecked).subscribe();
    this.loadTask();
  }

  deleteTask(id: number) {
    console.log(id, id, id);
    this.endpointsService.deleteTasks(id).subscribe();
    this.loadTask();
  }

  setList(obj: Lista) {
    this.statesService.setListSelected(obj);
    this.filterTasks();
  }

  filterTasks() {
    this.filteredTasks = this.tarefas.filter(
      (task: any) => task.listId === this.listSelected.id
    );
  }

  onSubmitList() {
    this.submittedList = true;
    console.log(this.formList.value);
    if (this.formList.valid) {
      console.log('submit');

      this.endpointsService
        .postLists({
          title: this.formList.value.title,
        })
        .subscribe(() => {
          console.log();
          this.loadList();
        });
    }
  }

  onSubmitTask() {
    this.submittedTask = true;
    console.log(this.formTask.value);
    if (this.formTask.valid) {
      console.log('submit');

      this.endpointsService
        .postTasks({
          listId: this.listSelected.id,
          title: this.formTask.value.title,
          isChecked: false,
        })
        .subscribe(() => {
          console.log();
          this.loadTask();
        });
    }
  }

  hasErrorTask(field: string) {
    return this.formTask.get(field)?.errors;
  }

  hasErrorList(field: string) {
    return this.formList.get(field)?.errors;
  }
}
