import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { BookingService } from './booking.service'; 
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private bookingService: BookingService, private router: Router) {}

  canActivate(): Observable<boolean> | boolean {
    return this.bookingService.getUserInfo().pipe(
      map(user => {
        if (user) {
          return true;
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
