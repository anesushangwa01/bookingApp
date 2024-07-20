import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
// http://localhost:3000 https://bookingback-01.onrender.com
export class BookingService {
  private baseUrl = 'https://bookingback-01.onrender.com';

  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  getAllBooking(): Observable<any> {
    return this.http.get(`${this.baseUrl}/booking`, { withCredentials: true })
      .pipe(
        catchError(this.handleError)
      );
  }

  addBooking(jobData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/booking`, jobData, { withCredentials: true })
      .pipe(
        catchError(this.handleError)
      );
  }

  applyHotel(applicationData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/apply`, applicationData, { withCredentials: true })
      .pipe(
        catchError(this.handleError)
      );
  }

  getBookingById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/booking/${id}`, { withCredentials: true }).pipe(
      catchError(this.handleError)
    );
  }

  login() {
    const redirectUri = encodeURIComponent('https://bookingapk.netlify.app');
    window.location.href = `${this.baseUrl}/auth/google?redirect_uri=${redirectUri}`;
  }

 // Handles logout
 logout() {
  this.http.get(`${this.baseUrl}/auth/logout`, { withCredentials: true }).subscribe(() => {
    this.userSubject.next(null);
    localStorage.removeItem('user');
    this.router.navigate(['/']); // Redirect to home or login page
  });
}

getBookings(): Observable<any> {
  return this.http.get(`${this.baseUrl}/apply`, { withCredentials: true })
    .pipe(
      catchError(this.handleError)
    );
}

// getBookings(): Observable<any> {
//   return this.http.get<any>(`${this.baseUrl}`);
// }
isAuthenticated(): Observable<boolean> {
  return this.http.get<{ isAuthenticated: boolean, user: any }>(`${this.baseUrl}/auth/status`, { withCredentials: true })
    .pipe(
      tap(response => {
        if (response.isAuthenticated) {
          this.userSubject.next(response.user);
          localStorage.setItem('user', JSON.stringify(response.user));
        } else {
          this.userSubject.next(null);
          localStorage.removeItem('user');
        }
      }),
      map(response => response.isAuthenticated),
      catchError(() => {
        return throwError('Not authenticated');
      })
    );
}
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}