import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppHeaderComponent } from './app-header/app-header.component';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { MatListModule } from '@angular/material/list';
import { SharedModule } from '../shared/shared.module';
import {MatToolbarModule} from '@angular/material/toolbar';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';


@NgModule({
  declarations: [
    AppHeaderComponent,
    MenuItemComponent,
    SplashScreenComponent
  ],
  imports: [
    CommonModule,
    MatListModule,
    MatToolbarModule,
    SharedModule
  ],
  exports:[
    AppHeaderComponent,
    MenuItemComponent,
    SplashScreenComponent
  ]
})
export class LayoutModule { }
