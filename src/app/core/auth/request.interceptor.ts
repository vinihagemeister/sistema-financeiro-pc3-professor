import { HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpProgressEvent, HttpResponse, HttpUserEvent, HttpHeaderResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RedirectRoleService } from '../redirect-role/redirect-role.service';
import { TokenService } from '../token/token.service';
import { AuthService } from './auth.service';

export const InterceptorSkipHeader = '';

@Injectable()
export class RequestInterceptor implements HttpInterceptor{

    constructor(
        // private tokenService: TokenService,
        private redirectRoleService: RedirectRoleService,
        // private authService: AuthService
        ){
    }

    /**
     *
     * @param req
     * @param next
     */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent
    | HttpHeaderResponse |HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>>{

        // if(this.tokenService.hasToken()){
        //     const token = this.tokenService.getToken();
        //     req = req.clone({
        //         setHeaders:{
        //             'Authorization': `Bearer ${token}`
        //         }
        //     })
        // }


        if (req.headers.has(InterceptorSkipHeader)) {
          console.log("teste do interceptor sem alterar header");
          const headers = req.headers.delete(InterceptorSkipHeader);
          return next.handle(req.clone({ headers }));
        }

        console.log("teste do interceptor");

        return next.handle(req)
            // .pipe(
            //     tap(event=>{},error=>{
            //     if (error instanceof HttpErrorResponse && error.status == 401){
            //         // this.authService.logout();
            //         this.redirectRoleService.redirectNotAuthorized();
            //     }
            // }))
    }
}
