import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageRoutingModule } from './page-routing.module';
import { HomeComponent } from './home/home.component';
import { UserManagementModule } from './user-management/user-management.module';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatDividerModule} from '@angular/material/divider';
import { SharedModule } from '../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { ModelsModule } from './models/models.module';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    PageRoutingModule,
    UserManagementModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,
    SharedModule,
    MatIconModule,
    ModelsModule
  ]
})
export class PageModule { }
