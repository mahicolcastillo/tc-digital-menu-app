import { Component, OnInit } from '@angular/core';
import { v4 as uuid } from 'uuid';

import { ConfigService } from '../../../config/remoteEnvironment';
import { GetTokenService } from '../../services/token/get-token.service';

@Component({
  selector: 'app-digital-menu',
  templateUrl: './digital-menu.component.html',
  styleUrls: ['./digital-menu.component.scss']
})
export class DigitalMenuComponent implements OnInit {
  public env;
  public token;

  constructor(private _configService: ConfigService,
              private _getTokenService: GetTokenService) { }

  ngOnInit(): void {
    this.env      = this._configService.config();
    sessionStorage.setItem("sessionCode", uuid());
    this.loadToken();
  }

  loadToken(): void {
    this._getTokenService.getPublicToken().subscribe( res => {
      sessionStorage.setItem("token", res.publicToken);
    });
  }

}
