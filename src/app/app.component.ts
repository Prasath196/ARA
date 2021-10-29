import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Compiler, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDrawer, MatDrawerContent } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthenticationDetails } from './Model/master';
import { NavItem } from './model/navigation';
import { AuthService } from './service/auth.service';
import { MenuUpdataionService } from './service/menu-update.service';
import { NavService } from './service/nav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        width: '200px'
      })),
      state('closed', style({
        width: '72px'
      })),
      transition('open => closed', [
        animate('.2s')
      ]),
      transition('closed => open', [
        animate('.2s')
      ]),
    ]),
    trigger('marginAlign', [
      state('open', style({
        marginLeft: '200px'
      })),
      state('closed', style({
        marginLeft: '74px'
      })),
      state('login', style({
        marginLeft: '0px'
      })),
      transition('open => closed', [
        animate('.2s')
      ]),
      transition('closed => open', [
        animate('.2s')
      ]),
    ])
  ],
  encapsulation:ViewEncapsulation.None
})
export class AppComponent implements AfterViewInit, OnInit {
  title = 'ARA';
  isFolded: boolean = false;
  isLoggedin: boolean = false;
  navItems1: NavItem[] = [];
  navItems2: NavItem[] = [];
  currentUser: AuthenticationDetails;

  @ViewChild("araDrawer") appDrawer: ElementRef;

  constructor(
    private _navService: NavService,
    private _menuUpdationService: MenuUpdataionService,
    private authservice: AuthService,
    private router: Router,
    private _compiler: Compiler
  ) {
    this.authservice.currentUser.subscribe(x => this.currentUser = x);
    this.authservice.changeEmitted$.subscribe(
      value => {
        this.isLoggedin = value;
      });
  }

  ngAfterViewInit() {
    this._navService.appDrawer = this.appDrawer;
  }

  ngOnInit() {
    const menuItems = localStorage.getItem('menuItemsData');
    if (menuItems) {
      this.navItems1=[];this.navItems2=[];
      var navItems = JSON.parse(menuItems);
      navItems.forEach((item: NavItem) => {
        if (item.type == "main") {
          this.navItems1.push(item);
        }
        else if (item.type == "others") {
          this.navItems2.push(item);
        }
      });
    }
    // Update the menu items on First time after log in
    this._menuUpdationService.GetAndUpdateMenus().subscribe(
      data => {
        this.navItems1=[];this.navItems2=[];
        var navItems = data;
        navItems.forEach((item: NavItem) => {
          if (item.type == "main") {
            this.navItems1.push(item);
          }
          else if (item.type == "others") {
            this.navItems2.push(item);
          }
        });
      }
    );
  }

  toggleSideMenu() {
    this.isFolded = !this.isFolded;
  }

  logout() {
    this.authservice.SignOut(this.currentUser.userID).subscribe(
      (data) => {
        localStorage.clear();
        this._compiler.clearCache();
        this.router.navigate(['auth/login']);
      },
      (err) => {
        console.error(err);
        this.router.navigate(['auth/login']);
      }
    );
  }
}
