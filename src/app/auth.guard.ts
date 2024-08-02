// import { Injectable } from '@angular/core';
// import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
// import { Observable, of } from 'rxjs';
// import { map, catchError } from 'rxjs/operators';
// import { BookingService } from './booking.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {

//   constructor(private auth: BookingService, private router: Router) {}

//   canActivate(
//     next: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean> {
//     return this.auth.isAuthenticated().pipe(
//       map(isAuthenticated => {
//         if (isAuthenticated) {
//           return true;
//         } else {
//           this.router.navigate(['/']);
//           return false;
//         }
//       }),
//       catchError(() => {
//         this.router.navigate(['/']);
//         return of(false); // Correctly imported 'of' from 'rxjs'
//       })
//     );
//   }
// }