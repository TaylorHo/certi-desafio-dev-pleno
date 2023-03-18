import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginPage, RegisterPage } from './contents';

@NgModule({
  declarations: [AuthComponent, LoginPage, RegisterPage],
  imports: [CommonModule, SharedModule, AuthRoutingModule],
})
export class AuthModule {}
