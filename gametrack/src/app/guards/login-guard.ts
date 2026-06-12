import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { inject } from '@angular/core';

export const loginGuard: CanActivateFn = (route, state) => {
  const routes = inject(Router);
  const login = inject(LoginService);

  if(login.usuarioLogado()){
    return true;
  } else {
    routes.navigate(['']);
  }
  return false;
};
