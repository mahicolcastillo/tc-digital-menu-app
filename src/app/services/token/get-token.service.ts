import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { ConfigService } from '../../../config/remoteEnvironment';
import { BffResponse } from '../../interfaces/bffResponse.interface';
import { PublicToken } from '../../interfaces/publicToken.interface';
import { HeadersService } from '../headers/headers.service';

@Injectable({
  providedIn: 'root'
})
export class GetTokenService {
  private env     : { BFF_URL: string; };
  private urlBff  : string;

  constructor(private _httpClient: HttpClient,
              private _configService: ConfigService,
              private _headersService: HeadersService) {
    this.env    = this._configService.config();
    this.urlBff = this.env.BFF_URL;
  }

  getPublicToken(){
    const headers = this._headersService.getCommonHeaders(true);
    const uri     = `${this.urlBff}getPublicToken`;
    return this._httpClient.get<BffResponse<PublicToken>>(uri, { headers })
    .pipe(map( res => res.payload ));
  }
}
