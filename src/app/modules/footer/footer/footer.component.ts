import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  public selectedTabIndex = 0;
  constructor(private readonly router: Router) {}
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
}
