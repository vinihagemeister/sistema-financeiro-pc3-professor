import { Injectable } from '@angular/core';
import { TokenService } from '../token/token.service';
import * as jtw_decode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './user';
import { Role } from './role';
import { HttpClient } from '@angular/common/http';

const RECURSO = 'http://localhost:3000/aluno';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject = new BehaviorSubject<User>({} as User);
  private userName: string = "";
  private userEmail: string = "";
  private userRole: Role = "" as Role;
  private userId: string = "";

  constructor(
    private tokenService: TokenService,
    protected http: HttpClient
  ){
    tokenService.hasToken() && this.decodeAndNotify();
  }

  setToken(token: any){
    this.tokenService.setToken(token);
    this.decodeAndNotify();
  }

  private decodeAndNotify(){
    const token = this.tokenService.getToken();
    const user = jtw_decode.default(token) as User;
    this.userName = user.nome;
    this.userEmail  = user.email;
    this.userRole = user.role as Role;
    this.userId = user._id;
    this.userSubject.next(user); //emite o objeto usuario
  }

  getUser(): Observable<User>{
    return this.userSubject.asObservable();
  }

  getUserName(){
      return this.userName;
  }

  getUserEmail(){
    return this.userEmail;
  }

  getRole(){
    return this.userRole;
  }

  getId(){
    return this.userId;
  }

  logout(){
    window.localStorage.clear();
  }

  isLogged(){
    return this.tokenService.hasToken();
  }

  checkEmailJahExiste(email: string) : Observable<Boolean> {
    return this.http.get<Boolean>(`${RECURSO}/tememailcadastrado?email=${email}`);
  }

}
