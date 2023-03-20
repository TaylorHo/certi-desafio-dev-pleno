import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPagesComponent } from './error-pages.component';
import { ForbiddenPage, NotfoundPage } from './contents';

const routes: Routes = [
  {
    path: '',
    component: ErrorPagesComponent,
    children: [
      { path: '401', component: ForbiddenPage },
      { path: '404', component: NotfoundPage },
      { path: '', redirectTo: '404', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ErrorPagesRoutingModule {}
