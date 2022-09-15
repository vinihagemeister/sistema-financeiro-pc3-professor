import { Injectable } from "@angular/core";
import { UserService } from "../user/user.service";
import { Router } from "@angular/router";
import { Role } from "../user/role";

@Injectable({
    providedIn: 'root'
})
export class RedirectRoleService {

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  public redirect() {
    if (this.userService.getRole() == Role.USER) {
      console.log('interceptado autorizado')
      this.router.navigate(['/']);
    }
  }

  public redirectNotAuthorized(){
    console.log('interceptado nao autorizado')
    this.router.navigate(['/login']);
  }

}
