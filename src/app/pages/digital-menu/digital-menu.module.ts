import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { DigitalMenuRoutingModule } from './digital-menu-routing.module';
import { DigitalMenuComponent } from './digital-menu.component'
import { HttpErrorInterceptor } from '../../interceptors/error-handler-interceptor';
import { GetTokenService } from '../../services/token/get-token.service';

@NgModule({
  declarations: [DigitalMenuComponent],
  imports: [
    CommonModule,
    DigitalMenuRoutingModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    GetTokenService
  ]
})
export class DigitalMenuModule { }
