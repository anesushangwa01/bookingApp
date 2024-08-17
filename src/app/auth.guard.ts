import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { BookingService } from './booking.service'; 
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private bookingService: BookingService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | boolean {
    const requiresAdmin = route.data['requiresAdmin'] || false;

    return this.bookingService.getUserInfo().pipe(
      map(user => {
        if (user) {
          if (requiresAdmin && user.email !== 'kingshangwa01@gmaail.com') {
            // User is not an admin, redirect to a forbidden or home page
            this.router.navigate(['/forbidden']);
            return false;
          }
          return true; // User is either an admin or a regular user
        } else {
          this.router.navigate(['/login'], { queryParams: { notify: true } });
          return false;
        }
      }),
      catchError((error) => {
        this.router.navigate(['/login'], { queryParams: { notify: true } });
        return new Observable<boolean>(observer => observer.next(false));
      })
    );
  }
}
