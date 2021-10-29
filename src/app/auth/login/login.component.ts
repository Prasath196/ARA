import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { AuthenticationDetails } from 'src/app/Model/master';
import { NavItem } from 'src/app/model/navigation';
import { AuthService } from 'src/app/service/auth.service';
import { MenuUpdataionService } from 'src/app/service/menu-update.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  authenticationDetails: AuthenticationDetails;
  MenuItems: string[];
  children: NavItem[] = [];
  isVisible:boolean=false;
  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _authService: AuthService,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private _menuUpdationService: MenuUpdataionService
  ) {
    this._authService.isLoggedin(false);
  }

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  LoginClicked(): void {
    if (this.loginForm.valid) {
      this.spinner.show();
      this._authService.login(this.loginForm.get('userName').value, this.loginForm.get('password').value).subscribe(
        (data) => {
          const dat = data as AuthenticationDetails;
          this.spinner.hide();
          this.saveUserDetails(dat);
        },
        (err) => {
          this.spinner.hide();
          console.error(err);
        }
      );
    } else {
      Object.keys(this.loginForm.controls).forEach(key => {
        const abstractControl = this.loginForm.get(key);
        abstractControl.markAsDirty();
      });
    }

  }

  saveUserDetails(data: AuthenticationDetails): void {
    localStorage.setItem('authorizationData', JSON.stringify(data));
    this.UpdateMenu();
    if (data.userRole === 'Administrator') {
      this._router.navigate(['page/home']);
    } else {
      this._router.navigate(['pages/dashboard']);
    }
    this._router.navigate(['page/home']);
  }

  // OpenChangePasswordDialog(data: AuthenticationDetails): void {
  //   const dialogConfig: MatDialogConfig = {
  //     data: null,
  //     panelClass: 'change-password-dialog'
  //   };
  //   const dialogRef = this.dialog.open(ChangePasswordDialogComponent, dialogConfig);
  //   dialogRef.afterClosed().subscribe(
  //     result => {
  //       if (result) {
  //         const changePassword = result as ChangePassword;
  //         changePassword.UserID = data.UserID;
  //         changePassword.UserName = data.UserName;
  //         this._authService.ChangePassword(changePassword).subscribe(
  //           (res) => {
  //             // console.log(res);
  //             // this.notificationSnackBarComponent.openSnackBar('Password updated successfully', SnackBarStatus.success);
  //             this.notificationSnackBarComponent.openSnackBar('Password updated successfully, please log with new password', SnackBarStatus.success);
  //             this._router.navigate(['/auth/login']);
  //           }, (err) => {
  //             this.notificationSnackBarComponent.openSnackBar(err instanceof Object ? 'Something went wrong' : err, SnackBarStatus.danger);
  //             this._router.navigate(['/auth/login']);
  //             console.error(err);
  //           }
  //         );
  //       }
  //     });
  // }

  // OpenForgetPasswordLinkDialog(): void {
  //   const dialogConfig: MatDialogConfig = {
  //     data: null,
  //     panelClass: 'forget-password-link-dialog'
  //   };
  //   const dialogRef = this.dialog.open(ForgetPasswordLinkDialogComponent, dialogConfig);
  //   dialogRef.afterClosed().subscribe(
  //     result => {
  //       if (result) {
  //         const emailModel = result as EMailModel;
  //         this.IsProgressBarVisibile = true;
  //         this._authService.SendResetLinkToMail(emailModel).subscribe(
  //           (data) => {
  //             const res = data as string;
  //             this.notificationSnackBarComponent.openSnackBar(res, SnackBarStatus.success);
  //             // this.notificationSnackBarComponent.openSnackBar(`Reset password link sent successfully to ${emailModel.EmailAddress}`, SnackBarStatus.success);
  //             // this.ResetControl();
  //             this.IsProgressBarVisibile = false;
  //             // this._router.navigate(['auth/login']);
  //           },
  //           (err) => {
  //             console.error(err);
  //             this.IsProgressBarVisibile = false;
  //             this.notificationSnackBarComponent.openSnackBar(err instanceof Object ? 'Something went wrong' : err, SnackBarStatus.danger); console.error(err);
  //           }
  //         );
  //       }
  //     });
  // }

  UpdateMenu(): void {
    const retrievedObject = localStorage.getItem('authorizationData');
    if (retrievedObject) {
      this.authenticationDetails = JSON.parse(retrievedObject) as AuthenticationDetails;
      this.MenuItems = this.authenticationDetails.menuItemNames.split(',');
      // console.log(this.MenuItems);
    }

    //main menu
    if (this.MenuItems.indexOf('Home') >= 0) {
      this.children.push(
        {
          displayName: "Home",
          icon: "assets/icons/home.svg",
          icon_active: "assets/icons/home_active.svg",
          route: "/page/home",
          type: "main"
        }
      );
    }
    if (this.MenuItems.indexOf('Models') >= 0) {
      this.children.push(
        {
          displayName: "Models",
          icon: "assets/icons/model.svg",
          route: '1',
          type: "main"
        }
      );
    }
    if (this.MenuItems.indexOf('Rental') >= 0) {
      this.children.push(
        {
          displayName: "Rental",
          icon: "assets/icons/rental.svg",
          route: '2',
          type: "main"
        }
      );
    }
    if (this.MenuItems.indexOf('Lease') >= 0) {
      this.children.push(
        {
          displayName: "Lease",
          icon: "assets/icons/lease.svg",
          icon_active: "assets/icons/lease_active.svg",
          route: '3',
          type: "main"
        }
      );
    }

    //others
    if (this.MenuItems.indexOf('AdminPanel') >= 0) {
      this.children.push(
        {
          displayName:"Admin panel",
          icon:"assets/icons/admin.svg",
          icon_active:"assets/icons/admin_active.svg",
          route:'page/user-management',
          type: "others",
          children:[
            {displayName:'App',route:'page/user-management/menu-app'},
            {displayName:'Role',route:'page/user-management/role'},
            {displayName:'User',route:'page/user-management/user'}
          ]
        }
      );
    }
    if (this.MenuItems.indexOf('Chatbot') >= 0) {
      this.children.push(
        {
          displayName:"Chatbot",
          icon:"assets/icons/chatbot.svg",
          route:'4',
          type: "others"
        }
      );
    }
    if (this.MenuItems.indexOf('Notification') >= 0) {
      this.children.push(
        {
          displayName:"Notification",
          icon:"assets/icons/notification.svg",
          route:'5',
          type: "others"
        }
      );
    }
    if (this.MenuItems.indexOf('PrivacyPolicy') >= 0) {
      this.children.push(
        {
          displayName:"Privacy policy",
          icon:"assets/icons/privacy.svg",
          route:'6',
          type: "others"
        }
      );
    }
    if (this.MenuItems.indexOf('Lease') >= 0) {
      this.children.push(
        {
          displayName:"Settings",
          icon:"assets/icons/settings.svg",
          route:'7',
          type: "others"
        }
      );
    }
    // Saving local Storage
    localStorage.setItem('menuItemsData', JSON.stringify(this.children));
    // Update the service in order to update menu
    this._menuUpdationService.PushNewMenus(this.children);
  }
}
