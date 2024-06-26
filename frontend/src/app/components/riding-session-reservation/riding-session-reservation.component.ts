import { Component, OnInit, inject } from '@angular/core';
import { RidingSessionService } from '../../services/riding-session.service';
import { RidingSession } from '../../models/riding-session.model';
import { Horse } from '../../models/horse.model';
import { CommonModule } from '@angular/common';
import { RidingSessionReservationFormComponent } from '../riding-session-reservation-form/riding-session-reservation-form.component';

@Component({
  selector: 'app-riding-session-reservation',
  standalone: true,
  imports: [CommonModule, RidingSessionReservationFormComponent],
  templateUrl: './riding-session-reservation.component.html',
  styleUrls: ['./riding-session-reservation.component.css']
})
export class RidingSessionReservationComponent {
 
  constructor(protected ridingSessionService: RidingSessionService) { 

  }

}
