import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RidingSession } from '../../models/riding-session.model';
import { RidingSessionService } from '../../services/riding-session.service';
import { NgForOf } from '@angular/common';
import { RidingSessionFormComponent } from '../riding-session-form/riding-session-form.component';
import { RidingSessionDetailsComponent } from '../riding-sessions-details/riding-sessions-details.component';

@Component({
  selector: 'app-riding-sessions-overview',
  standalone: true,
  imports: [CommonModule, RouterModule, NgForOf, RidingSessionFormComponent, RidingSessionDetailsComponent],
  templateUrl: './riding-sessions-overview.component.html',
  styleUrl: './riding-sessions-overview.component.css'
})
export class RidingSessionsOverviewComponent {

  showForm = false;
  showDetails = false;
  ridingSessionId: number = 0;
  ridingSessionToView: any;
  selectedRidingSessionId: number = 0;

  showRidingSessionRegistrationForm() {

    if (this.showForm) {
      this.showForm = false;
      return;
    }

    this.showForm = true;
  }

  showRidingSessionDetails() {

    if (this.showDetails) {
      this.showDetails = false;
    }
    else {
      this.showDetails = true;
    }
  }

  checkRidingSessionToDisplay(id: number) {
    return this.selectedRidingSessionId === id; 
  }

  constructor(protected ridingSessionService: RidingSessionService) {}

  riders: RidingSession[] = [];

  viewRidingSession(id: number) {
    this.ridingSessionId = id;
  }

  editRidingSession(id: number) {
    console.log("Editing rider", id);
  }

}
