import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import {BookingDetailsComponent} from './booking-details/booking-details.component'
import { BookingCategoriesComponent} from './booking-categories/booking-categories.component'
import { BookingViewDetailsComponent } from './booking-view-details/booking-view-details.component';
import { AddBookingsComponent } from './add-bookings/add-bookings.component';
import { AuthGuard } from './auth.guard';
import {GoogleAuthComponent} from './google-auth/google-auth.component'
import { BookingInfoComponent } from './booking-info/booking-info.component';

export const routes: Routes = [
{path:'header', component: HeaderComponent},
{path:'', component: HomeComponent},
{path: 'booking', component: BookingDetailsComponent},
{path:'categories', component: BookingCategoriesComponent  }
,  { path: 'viewdetails/:id', component: BookingViewDetailsComponent,  },
{path:'addbookings', component: AddBookingsComponent},
{path:'googleauth', component: GoogleAuthComponent},
{path:'bookinginfo', component: BookingInfoComponent}


// , canActivate:[AuthGuard]

];
