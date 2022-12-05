import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DigitalMenuComponent } from './digital-menu.component';

const routes: Routes = [
  {
    path      : '',
    component : DigitalMenuComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DigitalMenuRoutingModule { }
