import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { HttpClient, HttpErrorResponse,  HttpHeaders  } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
// http://localhost:3000 https://bookingback-01.onrender.com
export class BookingService {
  private baseUrl = ' https://bookingback-01.onrender.com';

  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  getUserIdFromToken(): string | null {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }
  
    const payloadBase64 = token.split('.')[1]; // Get the payload part
    try {
      const payload = atob(payloadBase64); // Decode from base64
      const decodedPayload = JSON.parse(payload);
      return decodedPayload.userId; // Adjust based on your token structure
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
  
  

  register(user: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, user);
  }

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, credentials);
  }
  resetPassword(resetData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register/reset-password`, resetData);
  }

  requestResetCode(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register/request-reset-password`, data);
  }
  
  getProtectedData(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization',  `Bearer ${token}`);
    return this.http.get(`${this.baseUrl}/protected`, { headers });
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  getAccountAmount(): Observable<{ amount: number }> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming token is stored in localStorage
    });
    return this.http.get<{ amount: number }>(`${this.baseUrl}/account`, { headers });
  }

  getUserInfo(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.baseUrl}/user`, { headers }).pipe(
      catchError(this.handleError)
    );
  }






  deleteBooking(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      // Handle the case where the token is not available
      return throwError('Token not found');
    }
  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.baseUrl}/booking/${id}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }
  
  updateBooking(id: string, booking: any): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      // Handle the case where the token is not available
      return throwError('Token not found');
    }
  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<any>(`${this.baseUrl}/booking/${id}`, booking, { headers }).pipe(
      catchError(this.handleError)
    );
  }
  

  getAllBooking(): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      // Handle the case where the token is not available
      return throwError('Token not found');
    }
  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.baseUrl}/booking`, { headers })
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

 // Admin: Add a new taxi (driver, car type, and hotel partner)
 addTaxi(taxiData: any): Observable<any> {
  // Assuming you are retrieving the token from localStorage or another storage mechanism
  const token = localStorage.getItem('token');

  // Setting the Authorization header with the Bearer token
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });

  // Include the headers in the POST request
  return this.http.post(`${this.baseUrl}/taxi/addTaxi`, taxiData, { headers });
}


// Fetch available taxis (unbooked)
getAvailableTaxis(): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/taxi/availableTaxis`);
}

getAllTaxis(): Observable<any[]> {
  const token = localStorage.getItem('token');
  if (!token) {
    // Handle the case where the token is not available
    return throwError('Token not found');
  }
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.get<any[]>(`${this.baseUrl}/taxi/all`, { headers });
  
    
  
}


getAllbooked(): Observable<any[]> {
  const token = localStorage.getItem('token');
  if (!token) {
    // Handle the case where the token is not available
    return throwError('Token not found');
  }
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.get<any[]>(`${this.baseUrl}/taxi/booked`, { headers });
  
    
  
}

// User: Book a taxi
bookTaxi(bookingData: any): Observable<any> {
  const token = localStorage.getItem('token');
  if (!token) {
    // Handle the case where the token is not available
    return throwError('Token not found');
  }

  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.post<any>(`${this.baseUrl}/taxi/bookTaxi`, bookingData, { headers })
    .pipe(
      catchError(this.handleError)  // Use catchError to handle potential errors
    );
}




getBookings(): Observable<any> {
  const token = localStorage.getItem('token');
  if (!token) {
    // Handle the case where the token is not available
    return throwError('Token not found');
  }

  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.get(`${this.baseUrl}/apply`, { headers })
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