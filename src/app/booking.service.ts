import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


// import {BookingCategoriesComponent} from './booking-categories/booking-categories.component';

@Injectable({
  providedIn: 'root'
})
export class BookingService {


  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getAllBooking(): Observable<any> {
    return this.http.get(`${this.baseUrl}/booking`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // getBookingByid(jobId: string): Observable<any> {
  //   return this.http.get(`${this.baseUrl}/booking/${bookingId}`)
  //     .pipe(
  //       catchError(this.handleError)
  //     );
  // }

 

  addBooking(jobData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/booking`, jobData)
      .pipe(
        catchError(this.handleError)
      );
  }

  applyHotel(applicationData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/apply`, applicationData)
      .pipe(
        catchError(this.handleError)
      );
  }
  getBookingById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/booking/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

// getAllHousingLocations(): booking[] {
//     return this.booking;
//   }
//   getHousingLocationById(id: number): booking | undefined {
//     return this.booking.find((housingLocation) => housingLocation.id === id);
//   }


//   readonly baseUrl = 'https://cdn.pixabay.com/photo/2016/06/24/10/47/house-1477041_1280.jpg'
//   booking: booking[] = [
//     {
//       id: 0,
//       name: 'Acme Fresh Start Housing',
//       city: 'Chicago',
//       state: 'IL',
//       photo: `${this.baseUrl}`,
//       availableUnits: 4,
//       wifi: true,
//       laundry: true,
//       amount: 150,
//       discription: 'hello welcone to my hotel',
//     },
//     {
//       id: 1,
//       name: 'A113 Transitional Housing',
//       city: 'Santa Monica',
//       state: 'CA',
//       photo: `${this.baseUrl}`,
//       availableUnits: 0,
//       wifi: false,
//       laundry: true,
//       amount: 150,
//       discription: 'hello welcone to my hotel',
//     },
//     {
//       id: 2,
//       name: 'Warm Beds Housing Support',
//       city: 'Juneau',
//       state: 'AK',
//       photo: `${this.baseUrl}`,
//       availableUnits: 1,
//       wifi: false,
//       laundry: false,
//       amount: 150,
//       discription: 'hello welcone to my hotel',
//     },
//     {
//       id: 3,
//       name: 'Homesteady Housing',
//       city: 'Chicago',
//       state: 'IL',
//       photo: `${this.baseUrl}`,
//       availableUnits: 1,
//       wifi: true,
//       laundry: false,
//       amount: 150,
//       discription: 'hello welcone to my hotel',
//     },
//     {
//       id: 4,
//       name: 'Happy Homes Group',
//       city: 'Gary',
//       state: 'IN',
//       photo: `${this.baseUrl}`,
//       availableUnits: 1,
//       wifi: true,
//       laundry: false,
//       amount: 150,
//       discription: 'hello welcone to my hotel',
//     },
//     {
//       id: 5,
//       name: 'Hopeful Apartment Group',
//       city: 'Oakland',
//       state: 'CA',
//       photo: `${this.baseUrl}`,
//       availableUnits: 2,
//       wifi: true,
//       laundry: true,
//       amount: 150,
//       discription: 'hello welcone to my hotel',
//     },
//     {
//       id: 6,
//       name: 'Seriously Safe Towns',
//       city: 'Oakland',
//       state: 'CA',
//       photo: `${this.baseUrl}`,
//       availableUnits: 5,
//       wifi: true,
//       laundry: true,
//       amount: 150,
//       discription: 'hello welcone to my hotel',
//     },
//     {
//       id: 7,
//       name: 'Hopeful Housing Solutions',
//       city: 'Oakland',
//       state: 'CA',
//       photo: `${this.baseUrl}`,
//       availableUnits: 2,
//       wifi: true,
//       laundry: true,
//       amount: 150,
//       discription: 'hello welcone to my hotel',
//     },
//     {
//       id: 8,
//       name: 'Seriously Safe Towns',
//       city: 'Oakland',
//       state: 'CA',
//       photo: `${this.baseUrl}`,
//       availableUnits: 10,
//       wifi: false,
//       laundry: false,
//       amount: 150,
//       discription: 'hello welcone to my hotel',
//     },
//     {
//       id: 9,
//       name: 'Capital Safe Towns',
//       city: 'Portland',
//       state: 'OR',
//       photo: `${this.baseUrl}`,
//       availableUnits: 6,
//       wifi: true,
//       laundry: true,
//       amount: 150,
//       discription: 'hello welcone to my hotel  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem consequatur perferendis quis quibusdam totam dolorum eum impedit deleniti, suscipit corporis molestias fugit exercitationem id inventore ab? Nam dolorum maiores aliquam.',
//     },
//   ];

}
