import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Jogos } from './pages/jogos/jogos';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { loginGuard } from './guards/login-guard';

export const routes: Routes = [
        {
        path: '',
        component: Login
    },
    {
        path: 'cadastrar',
        component: Register
    },
    {
        path: 'home',
        component: Home,
        canActivate: [loginGuard]
    },
    {
        path: 'novo-jogo',
        component: Jogos,
        canActivate: [loginGuard]
    },
    {
        path: 'home/editar/:id',
        component: Jogos,
        canActivate: [loginGuard]
    },
];
