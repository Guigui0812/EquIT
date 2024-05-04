import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { NgIf } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [NgIf],
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit, OnDestroy {
  user: any;
  
  private userDataSubscription: Subscription = new Subscription;

  constructor(
    private readonly oidcSecurityService: OidcSecurityService, // Ensure service is provided correctly
    private router: Router
  ) {}

  ngOnInit() {
    // Subscribe to userData$ to reactively update user data
    this.userDataSubscription = this.oidcSecurityService.userData$.subscribe(userData => {
      if (userData) {
        this.user = userData.userData; // Update user data whenever it changes
      }
    });
  }

  ngOnDestroy() {
    // Unsubscribe to prevent memory leaks
    if (this.userDataSubscription) {
      this.userDataSubscription.unsubscribe();
    }
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
