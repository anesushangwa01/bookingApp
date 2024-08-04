import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse,  HttpHeaders  } from '@angular/common/http';
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

  register(user: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, user);
  }

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, credentials);
  }

  getProtectedData(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization',  `Bearer ${token}`);
    return this.http.get(`${this.baseUrl}/protected`, { headers });
  }

  logout(): void {
    localStorage.removeItem('token');
  }
  getUserInfo(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.baseUrl}/user`, { headers });
  }










  getAllBooking(): Observable<any> {
    return this.http.get(`${this.baseUrl}/booking`, ) // { withCredentials: true }
      .pipe(
        catchError(this.handleError)
      );
  }

  addBooking(jobData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/booking`, jobData, )
      .pipe(
        catchError(this.handleError)
      );
  }

  applyHotel(applicationData: any): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      // Handle the case where the token is not available
      return throwError('Token not found');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`${this.baseUrl}/apply`, applicationData, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }



  getBookingById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/booking/${id}`, ).pipe(
      catchError(this.handleError)
    );
  }


// }

getBookings(): Observable<any> {
  return this.http.get(`${this.baseUrl}/apply`)
    .pipe(
      catchError(this.handleError)
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