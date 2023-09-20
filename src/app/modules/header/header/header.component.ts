import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { QnaService } from 'src/app/core/services/qna.service';
import { UserRegistrationService } from 'src/app/core/services/user-registration.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public selectedTabIndex = 0;
  showUserIconContainer = false;
  userInfo$ = this.userService.currentUser$;
  constructor(
    public readonly router: Router,
    private readonly userService: UserRegistrationService,
    private readonly qnaService: QnaService
  ) {}
  routeToSolicitor(): void {
    this.selectedTabIndex = 1;
    this.router.navigate(['solicitor']);
  }

  routeToSearch(): void {
    this.selectedTabIndex = 0;
    this.router.navigate(['search']);
  }

  routeToQNA(): void {
    this.selectedTabIndex = 2;
    this.router.navigate(['qna']);
  }

  routeToQnaSaved(): void {
    this.qnaService.showSavedQnaFortheUser('saved');
    this.routeToQNA();
  }

  routeToLogin(): void {
    this.selectedTabIndex = -1;
    this.showUserIconContainer = false;
    this.router.navigate(['login']);
  }

  logout(): void {
    this.selectedTabIndex = -1;
    this.userService.setCurrentUser(undefined);
    this.showUserIconContainer = false;
    this.router.navigate(['login']);
  }
}
