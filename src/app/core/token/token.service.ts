import { Injectable } from '@angular/core';

const KEY = 'tokenKeySF';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  hasToken(): boolean {
    return !!this.getToken();
  }

  getToken() {
    let objectString = window.localStorage.getItem(KEY);
    let token = null;
    if(!!objectString) token = JSON.parse(objectString as string);
    return token && token.token_acesso?token.token_acesso:null;
  }

  setToken(token: any) {
    window.localStorage.setItem(KEY, JSON.stringify(token));
  }

  removeToken() {
    window.localStorage.removeItem(KEY);
  }

}
