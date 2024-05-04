import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { LogLevel, provideAuth, AuthInterceptor } from "angular-auth-oidc-client";

import { routes } from './app.routes';
import {HttpClientModule, provideHttpClient} from "@angular/common/http";
import {HTTP_INTERCEPTORS} from "@angular/common/http";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
  importProvidersFrom(HttpClientModule),
  provideAuth({
    config: {
      authority: "http://localhost:8888/realms/hipporp-realm",
      clientId: "hipporp-frontend",
      scope: "openid profile offline_access roles",
      redirectUrl: "http://localhost:4200",
      responseType: "id_token token",
      silentRenew: true,
      useRefreshToken: true,
      logLevel: LogLevel.Debug,
      secureRoutes: ["/api"],
    },
  }),
{
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
}],
};
