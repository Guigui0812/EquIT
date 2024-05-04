import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HorseFormComponent } from './components/horse-form/horse-form.component';
import { RiderFormComponent } from './components/rider-form/rider-form.component';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, HorseFormComponent, RiderFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  
  private readonly oidcSecurityService = inject(OidcSecurityService);
  constructor(private router: Router) {}  

  title = 'frontend';

  ngOnInit() {
    this.oidcSecurityService.checkAuth().subscribe(({ isAuthenticated, userData, accessToken }) => {
      console.log('Auth Status:', isAuthenticated);
      console.log('User Data:', userData);
      console.log('Access Token:', accessToken);

      var token = this.oidcSecurityService.getAccessToken()

      if (!isAuthenticated) this.login();

      if (isAuthenticated) {
        this.router.navigate(['/main-page']);
      } 
    });
  }

  login() {
    this.oidcSecurityService.authorize();
  }

  logout() {
    this.oidcSecurityService.logoff().subscribe((result) => console.log(result));
  }
}