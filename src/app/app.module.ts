import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SharedModule } from './shared/shared.module';
import { LayoutModule } from './layout/layout.module';
import { MatListModule } from '@angular/material/list';
import { PageModule } from './page/page.module';
import { NgxSpinnerModule } from "ngx-spinner";
import { AuthService } from './service/auth.service';
import { LoaderComponent } from './loader/loader.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MenuUpdataionService } from './service/menu-update.service';
import { AuthInterceptorService } from './service/auth-interceptor.service';
import { NavService } from './service/nav.service';

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    SharedModule,
    LayoutModule,
    MatListModule,
    PageModule,
    NgxSpinnerModule,
    HttpClientModule,
    MatSnackBarModule
  ],
  providers: [
    AuthService,
    MenuUpdataionService,
    NavService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
