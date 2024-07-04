import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import {BookingDetailsComponent} from './booking-details/booking-details.component'
import { BookingCategoriesComponent} from './booking-categories/booking-categories.component'
import { BookingViewDetailsComponent } from './booking-view-details/booking-view-details.component';

export const routes: Routes = [
{path:'header', component: HeaderComponent},
{path:'', component: HomeComponent},
{path: 'booking', component: BookingDetailsComponent},
{path:'categories', component: BookingCategoriesComponent}
,{path:'viewdetails/:id', component: BookingViewDetailsComponent}




];
