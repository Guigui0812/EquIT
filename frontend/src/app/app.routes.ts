import { Routes } from '@angular/router';
import { HorseFormComponent } from './components/horse-form/horse-form.component';
import { RiderFormComponent } from './components/rider-form/rider-form.component';
import { HorsesOverviewComponent } from './components/horses-overview/horses-overview.component';
import { RidersOverviewComponent } from './components/riders-overview/riders-overview.component';
import { RidingSessionFormComponent } from './components/riding-session-form/riding-session-form.component';
import { RidingSessionsOverviewComponent } from './components/riding-sessions-overview/riding-sessions-overview.component';
import { RidingSessionReservationComponent } from './components/riding-session-reservation/riding-session-reservation.component';
import { AdmAuthGuard } from './services/adm-auth-guard.service';
import { UserAuthGuard } from './services/user-auth-guard.service';
import { MainPageComponent } from './components/main-page/main-page.component';


export const routes: Routes = [
  {path: "horse-registration", component: HorseFormComponent, canActivate: [AdmAuthGuard]},
  {path: "rider-registration", component: RiderFormComponent, canActivate: [AdmAuthGuard]},
  {path: "horses-overview", component: HorsesOverviewComponent, canActivate: [AdmAuthGuard]},
  {path: "riders-overview", component: RidersOverviewComponent, canActivate: [AdmAuthGuard]},
  {path: "riding-session-form", component: RidingSessionFormComponent, canActivate: [AdmAuthGuard]},
  {path: "riding-sessions-overview", component: RidingSessionsOverviewComponent, canActivate: [AdmAuthGuard]},
  {path: "riding-session-reservation", component: RidingSessionReservationComponent, canActivate: [UserAuthGuard]},
  {path: "main-page", component: MainPageComponent},
  {path: "**", redirectTo: "/main-page"}
];
