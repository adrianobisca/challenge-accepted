import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EndpointsService } from 'src/app/services/endpoints.service';

@Component({
  selector: 'app-list-form',
  templateUrl: './list-form.component.html',
  styleUrls: ['./list-form.component.scss'],
})
export class ListFormComponent implements OnInit {
  @Output() submitListEmitted = new EventEmitter<string>();

  formList: FormGroup = this.formBuilder.group({});
  submittedList: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private endpointsService: EndpointsService
  ) {}
  ngOnInit(): void {
    this.formList = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  onSubmitList() {
    this.submittedList = true;
    if (this.formList.valid) {
      this.endpointsService
        .postLists({
          title: this.formList.value.title,
        })
        .subscribe(() => {
          this.submittedList = false;
          this.formList.reset();
          this.submitListEmitted.emit('');
        });
    }
  }

  hasErrorList(field: string) {
    return this.formList.get(field)?.errors;
  }
}
