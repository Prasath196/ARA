import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authservice:AuthService
        
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authservice.currentUserValue;
        if (currentUser) {
            this.authservice.isLoggedin(true);
            // logged in so return true
            return true;
        }
        
        // not logged in so redirect to login page with the return url
        this.router.navigate(['auth/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}