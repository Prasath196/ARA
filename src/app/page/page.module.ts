import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageRoutingModule } from './page-routing.module';
import { HomeComponent } from './home/home.component';
import { UserManagementModule } from './user-management/user-management.module';
import { SiteTreeComponent } from './site-tree/site-tree.component';
import {MatButtonModule} from '@angular/material/button';
import {MatTreeModule} from '@angular/material/tree';
import {MatMenuModule} from '@angular/material/menu';
import {MatDividerModule} from '@angular/material/divider';
import { SharedModule } from '../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    HomeComponent,
    SiteTreeComponent
  ],
  imports: [
    CommonModule,
    PageRoutingModule,
    UserManagementModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,
    SharedModule,
    MatIconModule
  ]
})
export class PageModule { }
