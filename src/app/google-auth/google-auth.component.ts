import { Component, Input } from '@angular/core';
import { BookingService } from '../booking.service';
import { CommonModule } from '@angular/common';
import { NgbDropdown,  NgbDropdownModule , NgbCollapseModule} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-google-auth',
  standalone: true,
  imports: [CommonModule,  NgbDropdown,  NgbDropdownModule , NgbCollapseModule],
  templateUrl: './google-auth.component.html',
  styleUrl: './google-auth.component.css'
})
export class GoogleAuthComponent {
  constructor(private auth:  BookingService) { }

  
  @Input() auths!: any;

  user: any;

   
  ngOnInit() {
    this.auth.user$.subscribe(user => {
      this.user = user;
    });
    this.auth.isAuthenticated().subscribe();
  }
  login() {
    this.auth.login();

  }

  logout() {
    this.auth.logout();
  }

}
