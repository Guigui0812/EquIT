import { Component, Input } from '@angular/core';
import { RidingSessionService } from '../../services/riding-session.service';
import { NgClass, NgStyle, NgFor } from '@angular/common';

@Component({
  selector: 'app-riding-session-details',
  standalone: true,
  imports: [NgClass, NgStyle, NgFor],
  templateUrl: './riding-sessions-details.component.html',
  styleUrl: './riding-sessions-details.component.css'
})
export class RidingSessionDetailsComponent {

  @Input("ridingSessionToView")
  ridingSession: any;

  constructor(protected ridingSessionService: RidingSessionService) {}
}
