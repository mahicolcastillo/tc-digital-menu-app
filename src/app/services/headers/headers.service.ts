import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { SessionStorage } from '../../interfaces/sessionStorage.interface';

@Injectable({
  providedIn: 'root'
})
export class HeadersService {
  private xTrackId: string = '';
  private data    : SessionStorage;

  constructor() {
    this.data     = this.loadSession();
    this.xTrackId = uuid();
  }

  private loadSession(){
    const sessionCode = sessionStorage.getItem('sessionCode');
    const clientName  = sessionStorage.getItem('clientName') || 'demo'; //TODO: esto debe ser cambiado
    const token       = sessionStorage.getItem('token');

    return {
      token,
      sessionCode,
      clientName,
    }
  }

  getCommonHeaders(exceptionAuthorization: boolean){
    let headers;
    if(exceptionAuthorization){
      headers = new HttpHeaders()
      .set('Content-Type'     , 'application/json')
      .set('SessionCode'      , this.data.sessionCode)
      .set('ApplicationName'  , 'DigitalMenu')
      .set('ApplicationCode'  , 'tc-digital-menu-app')
      .set('xTrackId'         , this.xTrackId)
      .set('Artifact'         , 'tc-digital-menu-app')
      .set('ClientName'       , this.data.clientName)
    }else{
      headers = new HttpHeaders()
      .set('Content-Type'     , 'application/json')
      .set('Authorization'    , this.data.token)
      .set('SessionCode'      , this.data.sessionCode)
      .set('ApplicationName'  , 'DigitalMenu')
      .set('ApplicationCode'  , 'tc-digital-menu-app')
      .set('xTrackId'         , this.xTrackId)
      .set('Artifact'         , 'tc-digital-menu-app')
      .set('ClientName'       , this.data.clientName)
    }


    return headers;
  }
}
