import { Component, OnInit } from '@angular/core';
import { User } from './core/models/user.model';
import { UserRegistrationService } from './core/services/user-registration.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'legal-advisor';
  constructor(private readonly userService: UserRegistrationService) {
    console.log('on app component');
  }

  ngOnInit(): void {
    const currentUser = sessionStorage.getItem('currentUser');
    if (currentUser) {
      this.userService.setCurrentUser(JSON.parse(currentUser) as User);
    }
  }
}
