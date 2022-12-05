import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorMessageComponent } from './error-message.component';

const routes: Routes = [
  {
    path      : '',
    component : ErrorMessageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorMessageRoutingModule { }
