import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from '@shared/shared.module';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { Navbar } from '@shared/components';
import { UserTable, UserModal, UserForm } from './user-list/components';
import { LogTable, LogModal } from './log-list/components';
import { HomeComponent as HomePage } from './home/home.component';
import { UserListComponent as UserListPage } from './user-list/user-list.component';
import { LogListComponent as LogListPage } from './log-list/log-list.component';

@NgModule({
  declarations: [
    PagesComponent,
    Navbar,
    HomePage,
    UserListPage,
    UserTable,
    UserModal,
    UserForm,
    LogListPage,
    LogTable,
    LogModal,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatDialogModule,
    MatMenuModule,
    MatSelectModule,
    MatToolbarModule,
    MatTooltipModule,
    SharedModule,
    PagesRoutingModule,
  ],
})
export class PagesModule {}
