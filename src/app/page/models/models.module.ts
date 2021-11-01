import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModelsRoutingModule } from './models-routing.module';
import { HomepageComponent } from './homepage/homepage.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SiteTreeComponent } from '../site-tree/site-tree.component';
import { OverComponent } from './over/over.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    HomepageComponent,
    SiteTreeComponent,
    OverComponent
  ],
  imports: [
    CommonModule,
    ModelsRoutingModule,
    SharedModule,
    NgApexchartsModule,
    MatIconModule,
    FlexLayoutModule,HttpClientModule,MatSnackBarModule,
  ],
  exports:[SiteTreeComponent]
})
export class ModelsModule { }
