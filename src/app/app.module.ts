import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from './components/list/list.component';
import { TaskComponent } from './components/task/task.component';
import { TaskFormComponent } from './shared/task-form/task-form.component';
import { ListFormComponent } from './shared/list-form/list-form.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    TaskComponent,
    TaskFormComponent,
    ListFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
