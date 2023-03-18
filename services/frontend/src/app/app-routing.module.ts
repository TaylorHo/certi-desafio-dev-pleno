import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// ROUTER GUARDS
import { LoginGuard, NotLoginGuard } from '@core/guards';

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
    loadChildren: () => import('./pages/pages.module').then((module) => module.PagesModule),
  },

  // WRONG URL REDIRECT TO 404 PAGE
  { path: '**', redirectTo: 'error' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
