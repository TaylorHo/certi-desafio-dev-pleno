import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorPagesRoutingModule } from './error-pages-routing.module';
import { ErrorPagesComponent } from './error-pages.component';
import { ForbiddenPage, NotfoundPage } from './contents';

@NgModule({
  declarations: [ErrorPagesComponent, ForbiddenPage, NotfoundPage],
  imports: [CommonModule, ErrorPagesRoutingModule],
})
export class ErrorPagesModule {}
