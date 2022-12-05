import { Injectable } from '@angular/core';

import * as DEVCONF   from '../environments/environment.dev';
import * as QACONF    from '../environments/environment.qa';
import * as PRODCONF  from '../environments/environment.prod';
import { environment } from '../environments/environment.qa';

const enum environments {
  DEV,
  QA,
  PROD
};

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  REMOTE_APPS = [
    {
      domainRegExp  : new RegExp('localhost'),
      remoteEnv     : environments.DEV,
    },
    {
      domainRegExp  : new RegExp('^qa\\.tucomanda.com'),
      remoteEnv     : environments.QA,
    },
    {
      domainRegExp  : new RegExp('^www\\.tucomanda.com'),
      remoteEnv     : environments.PROD,
    },
  ];

  getRemoteAppEnv = () => {
    const host    = window.location.host;
    let   DevEnv  = null;

    this.REMOTE_APPS.forEach((env) => {
      if(!DevEnv && env.domainRegExp.test(host)){
        DevEnv = env.remoteEnv;
      }
    });

    return DevEnv;
  }

  config = () => {
    let   conf;
    const devEnv = this.getRemoteAppEnv();
    switch(devEnv){
      case environments.DEV:
        conf = DEVCONF;
        break;
      case environments.QA:
        conf = QACONF;
        break;
      case environments.PROD:
        conf = PRODCONF;
        break;
      default:
        break;
    }

    return conf.environment;
  }
}
