import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user/user.service';
import { environment } from 'src/environments/environment';
import { Autenticavel } from './autenticavel';

const API = environment.apiUrl;
const RECURSO = `${API}/auth/login`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private userService: UserService,
  ) {}

  autentica(autenticavel: Autenticavel){
    this.valida(autenticavel);
    return this.http.post(RECURSO, {senha: autenticavel.senha, email: autenticavel.email})
      .subscribe(token => {
        const authToken = token;
        this.userService.setToken(authToken);
      })
  }

  logout(){
    this.userService.logout();
  }

  private valida(autenticavel: Autenticavel){
    if(!autenticavel) new Error('O autenticavel não pode ser nulo na autenticação');
    if(!autenticavel.email) new Error('O autenticavel precisa ter Email');
    if(!autenticavel.senha) new Error('O autenticavel precisa ter uma senha');
  }

}
