import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { ConfigService } from "../../config/remoteEnvironment";
import { paths } from '../utils/paths';

const exceptionPaths: string[] = [];

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  public  env;

  constructor(private _router: Router, private _configService: ConfigService) {
    this.env = this._configService.config();
  }

  public intercept( req: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
    const url = req.url;
    console.log('entrando a interceptor');
    if(url.includes("bff/tc-digital-menu-bff/") && this.checkExcludes(url)){
      return next
        .handle(req)
        .pipe(catchError((error: HttpErrorResponse) => this.processError(error)));
    }
  }

  private processError(httpError: HttpErrorResponse) {
    if(httpError.status === 500){
      this.navigateToErrorPage();
    }else if(httpError.status === 403){
      this.navigateToErrorPage();
    }else if(httpError.status === 400){
      this.navigateToErrorPage();
    }

    return throwError(httpError);
  }

  private goURL(url: string){
    location.href = url;
  }

  private navigateToErrorPage(): void {
    this._router.navigate([paths.messageError]);
  }

  private checkExcludes(path: string): boolean {
    const result = exceptionPaths.find( excPath => path.includes(excPath));
    return result ? false : true;
  }
}
