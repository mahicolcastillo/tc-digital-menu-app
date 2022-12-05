import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path        : '',
    redirectTo  : 'digital-menu',
    pathMatch   : 'full',
  },
  {
    path          : 'digital-menu',
    loadChildren  : () => import('./pages/digital-menu/digital-menu.module').then(change => change.DigitalMenuModule)
  },
  {
    path          : 'error-message',
    loadChildren  : () => import('./pages/error-message/error-message.module').then(change => change.ErrorMessageModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
