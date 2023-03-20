import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard, NotLoginGuard } from '@core/guards';

/**
 * Rotas gerais da aplicação.
 */
const routes: Routes = [
  {
    path: 'auth',
    canActivate: [NotLoginGuard],
    canLoad: [NotLoginGuard],
    loadChildren: () => import('./pages/auth/auth.module').then((module) => module.AuthModule),
  },
  {
    path: 'error',
    loadChildren: () => import('./pages/error-pages/error-pages.module').then((module) => module.ErrorPagesModule),
  },
  {
    path: '',
    canActivate: [LoginGuard],
    canLoad: [LoginGuard],
    // Carregar o módulo de rotas internas da aplicação.
    loadChildren: () => import('./pages/pages.module').then((module) => module.PagesModule),
  },

  // Página 404
  { path: '**', redirectTo: 'error' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
