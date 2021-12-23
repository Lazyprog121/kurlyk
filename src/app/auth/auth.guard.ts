import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { AuthorizationService } from '../services/authorization.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthorizationService,
    private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.userIsAuthorized().pipe(map(res => {
        if (res) {
            return true;
        }
        this.router.navigate(['/signin']);
        return false;
    }), catchError((error) => {
        this.router.navigate(['/signin']);
        return of(false);
    }));
}
  
}
