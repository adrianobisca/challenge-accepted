import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Lista } from 'src/app/models/lista';
import { EndpointsService } from 'src/app/services/endpoints.service';
import { StatesService } from 'src/app/services/states.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent implements OnInit {
  @Input() listSelected: Lista = { id: 1, title: '' };
  @Output() submitTaskEmitted = new EventEmitter<string>();

  formTask: FormGroup = this.formBuilder.group({});
  submittedTask: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private endpointsService: EndpointsService
  ) {}

  ngOnInit(): void {
    this.formTask = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  ngOnChanges() {}

  onSubmitTask() {
    this.submittedTask = true;
    if (this.formTask.valid && this.listSelected) {
      this.endpointsService
        .postTasks({
          listId: this.listSelected.id ? this.listSelected.id : 0,
          title: this.formTask.value.title,
          isChecked: false,
        })
        .subscribe(() => {
          this.submittedTask = false;
          this.formTask.reset();
          this.submitTaskEmitted.emit('');
        });
    }
  }

  hasErrorTask(field: string) {
    return this.formTask.get(field)?.errors;
  }
}
