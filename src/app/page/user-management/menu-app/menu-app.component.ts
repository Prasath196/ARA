import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MenuApp, AuthenticationDetails } from 'src/app/Model/master';
import { SnackBarStatus } from 'src/app/model/notification-snackbar-status-enum';
import { MasterService } from 'src/app/service/master.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'menu-app',
  templateUrl: './menu-app.component.html',
  styleUrls: ['./menu-app.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class MenuAppComponent implements OnInit {
  menuItems: string[];
  selectedMenuApp: MenuApp;
  selectID: number;
  menuAppMainFormGroup: FormGroup;
  searchText = '';
  AllMenuApps: MenuApp[] = [];
  constructor(
    private _masterService: MasterService,
    private _formBuilder: FormBuilder,
    private spinner:NgxSpinnerService) {
    this.selectedMenuApp = new MenuApp();
  }

  ngOnInit(): void {
    this.menuAppMainFormGroup = this._formBuilder.group({
      appName: ['', Validators.required]
    });
    this.GetAllMenuApps();
  }
  ResetControl(): void {
    this.selectedMenuApp = new MenuApp();
    this.selectID = 0;
    this.menuAppMainFormGroup.reset();
    Object.keys(this.menuAppMainFormGroup.controls).forEach(key => {
      this.menuAppMainFormGroup.get(key).markAsUntouched();
    });
  }
  GetAllMenuApps(): void {
    this.spinner.show();
    this._masterService.GetAllMenuApp().subscribe(
      (data) => {
        this.spinner.hide();
        this.AllMenuApps = <MenuApp[]>data;
        if (this.AllMenuApps && this.AllMenuApps.length) {
          this.loadSelectedMenuApp(this.AllMenuApps[0]);
        }
      },
      (err) => {
        console.error(err);
        this.spinner.hide();
      }
    );
  }

  loadSelectedMenuApp(selectedMenuApp: MenuApp): void {
    this.selectID = selectedMenuApp.appID;
    this.selectedMenuApp = selectedMenuApp;
    this.SetMenuAppValues();
  }

  SetMenuAppValues(): void {
    this.menuAppMainFormGroup.get('appName').patchValue(this.selectedMenuApp.appName);
  }

  GetMenuAppValues(): void {
    this.selectedMenuApp.appName = this.menuAppMainFormGroup.get('appName').value;
  }

  CreateMenuApp(): void {
    this.GetMenuAppValues();
    this.spinner.show();
    this._masterService.CreateMenuApp(this.selectedMenuApp).subscribe(
      (data) => {
        // console.log(data);
        this.ResetControl();
        this.spinner.hide();
        this.GetAllMenuApps();
      },
      (err) => {
        console.error(err);
        this.spinner.hide();
      }
    );

  }

  UpdateMenuApp(): void {
    this.GetMenuAppValues();
    this.spinner.show();
    this._masterService.UpdateMenuApp(this.selectedMenuApp).subscribe(
      (data) => {
        this.ResetControl();
        this.spinner.hide();
        this.GetAllMenuApps();
      },
      (err) => {
        console.error(err);
        this.spinner.hide();
      }
    );
  }

  DeleteMenuApp(): void {
    this.GetMenuAppValues();
    this.spinner.show();
    this._masterService.DeleteMenuApp(this.selectedMenuApp).subscribe(
      (data) => {
        // console.log(data);
        this.ResetControl();
        this.spinner.hide();
        this.GetAllMenuApps();
      },
      (err) => {
        console.error(err);
        this.spinner.hide();
      }
    );
  }

  ShowValidationErrors(): void {
    Object.keys(this.menuAppMainFormGroup.controls).forEach(key => {
      this.menuAppMainFormGroup.get(key).markAsTouched();
      this.menuAppMainFormGroup.get(key).markAsDirty();
    });

  }

  SaveClicked(): void {
    if (this.menuAppMainFormGroup.valid) {
      // const file: File = this.fileToUpload;
      if (this.selectedMenuApp.appID) {
        this.UpdateMenuApp();
      } else {
        this.CreateMenuApp();
      }
    } else {
      this.ShowValidationErrors();
    }
  }

  DeleteClicked(): void {
    if (this.menuAppMainFormGroup.valid) {
      if (this.selectedMenuApp.appID) {
        this.DeleteMenuApp();
      }
    } else {
      this.ShowValidationErrors();
    }
  }
}

