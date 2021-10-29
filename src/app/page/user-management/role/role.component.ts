import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RoleWithApp, AuthenticationDetails, MenuApp } from 'src/app/Model/master';
import { SnackBarStatus } from 'src/app/model/notification-snackbar-status-enum';
import { MasterService } from 'src/app/service/master.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class RoleComponent implements OnInit {
  menuItems: string[];
  selectedRole: RoleWithApp;
  selectID: any;
  searchText = '';
  roleMainFormGroup: FormGroup;
  AllMenuApps: MenuApp[] = [];
  AllRoles: RoleWithApp[] = [];
  AppIDListAllID: number;

  constructor(
    private _masterService: MasterService,
    private _formBuilder: FormBuilder,
    private spinner:NgxSpinnerService) {
    this.selectedRole = new RoleWithApp();
    this.AppIDListAllID = 0;
  }

  ngOnInit(): void {
    this.roleMainFormGroup = this._formBuilder.group({
      roleName: ['', Validators.required],
      appIDList: [[], Validators.required]
    });
    this.GetAllMenuApps();
    this.GetAllRoles();
  }

  ResetControl(): void {
    this.selectedRole = new RoleWithApp();
    this.roleMainFormGroup.reset();
    Object.keys(this.roleMainFormGroup.controls).forEach(key => {
      this.roleMainFormGroup.get(key).markAsUntouched();
    });
  }

  GetAllMenuApps(): void {
    this._masterService.GetAllMenuApp().subscribe(
      (data) => {
        this.AllMenuApps = <MenuApp[]>data;
        if (this.AllMenuApps && this.AllMenuApps.length > 0) {
          const xy = this.AllMenuApps.filter(x => x.appName === 'All')[0];
          if (xy) {
            this.AppIDListAllID = xy.appID;
          }
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  GetAllRoles(): void {
    this.spinner.show();
    this._masterService.GetAllRoles().subscribe(
      (data) => {
        this.spinner.hide();
        this.AllRoles = <RoleWithApp[]>data;
        if (this.AllRoles && this.AllRoles.length) {
          this.loadSelectedRole(this.AllRoles[0]);
        }
      },
      (err) => {
        console.error(err);
        this.spinner.hide();
      }
    );
  }

  OnAppNameChanged(): void {
    const SelectedValues = this.roleMainFormGroup.get('appIDList').value as number[];
    if (SelectedValues.includes(this.AppIDListAllID)) {
      this.roleMainFormGroup.get('appIDList').patchValue([this.AppIDListAllID]);

    }
  }

  loadSelectedRole(selectedRole: RoleWithApp): void {
    this.selectID = selectedRole.roleID;
    this.selectedRole = selectedRole;
    this.SetRoleValues();
  }

  SetRoleValues(): void {
    this.roleMainFormGroup.get('roleName').patchValue(this.selectedRole.roleName);
    this.roleMainFormGroup.get('appIDList').patchValue(this.selectedRole.appIDList);
  }

  GetRoleValues(): void {
    this.selectedRole.roleName = this.roleMainFormGroup.get('roleName').value;
    this.selectedRole.appIDList = <number[]>this.roleMainFormGroup.get('appIDList').value;
  }

  CreateRole(): void {
    this.GetRoleValues();
    this.spinner.show();
    this._masterService.CreateRole(this.selectedRole).subscribe(
      (data) => {
        // console.log(data);
        this.ResetControl();
        this.spinner.hide();
        this.GetAllRoles();
      },
      (err) => {
        console.error(err);
        this.spinner.hide();
      }
    );

  }

  UpdateRole(): void {
    this.GetRoleValues();
    this.spinner.show();
    this._masterService.UpdateRole(this.selectedRole).subscribe(
      (data) => {
        this.ResetControl();
        this.spinner.hide();
        this.GetAllRoles();
      },
      (err) => {
        console.error(err);
        this.spinner.hide();
      }
    );
  }

  DeleteRole(): void {
    this.GetRoleValues();
    this.spinner.show();
    this._masterService.DeleteRole(this.selectedRole).subscribe(
      (data) => {
        this.ResetControl();
        this.spinner.hide();
        this.GetAllRoles();
      },
      (err) => {
        console.error(err);
        this.spinner.hide();
      }
    );
  }

  ShowValidationErrors(): void {
    Object.keys(this.roleMainFormGroup.controls).forEach(key => {
      this.roleMainFormGroup.get(key).markAsTouched();
      this.roleMainFormGroup.get(key).markAsDirty();
    });

  }

  SaveClicked(): void {
    if (this.roleMainFormGroup.valid) {
      // const file: File = this.fileToUpload;
      if (this.selectedRole.roleID) {
        this.UpdateRole();
      } else {
        this.CreateRole();
      }
    } else {
      this.ShowValidationErrors();
    }
  }

  DeleteClicked(): void {
    if (this.roleMainFormGroup.valid) {
      if (this.selectedRole.roleID) {
        this.DeleteRole();
      }
    } else {
      this.ShowValidationErrors();
    }
  }
}

