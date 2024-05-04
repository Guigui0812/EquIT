import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError, take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AdmAuthGuard implements CanActivate {
  private readonly oidcSecurityService = inject(OidcSecurityService);
  private readonly router = inject(Router);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.oidcSecurityService.isAuthenticated$.pipe(
      take(1),
      switchMap(isAuthenticated => {
        if (!isAuthenticated) {
          // Si l'utilisateur n'est pas authentifié, rediriger immédiatement
          return of(this.router.parseUrl('/riding-session-reservation'));
        }
        
        // Si authentifié, vérifier les rôles de l'utilisateur
        return this.oidcSecurityService.userData$.pipe(
          map(userData => {
            if (userData.userData.realm_access.roles.includes('ADMIN')) {
              return true;
            } else {
              // Sinon, rediriger vers une autre page
              return this.router.parseUrl('/riding-session-reservation');
            }
          }),
          catchError(err => {
            // Gestion des erreurs potentielles
            console.error('Error checking user roles', err);
            return of(this.router.parseUrl('/riding-session-reservation'));
          })
        );
      }),
      catchError(err => {
        // Gestion des erreurs lors de la vérification de l'authentification
        console.error('Error checking authentication', err);
        return of(this.router.parseUrl('/riding-session-reservation'));
      })
    );
  }
}
