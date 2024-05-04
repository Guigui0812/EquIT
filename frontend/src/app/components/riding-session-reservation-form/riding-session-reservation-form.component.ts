import { Component, Input, OnInit, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { RidingSessionService } from '../../services/riding-session.service';
import { NgForOf } from '@angular/common';
import { CommonModule } from '@angular/common';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { RiderService } from '../../services/rider.service';

@Component({
  selector: 'app-riding-session-reservation-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgForOf, CommonModule],
  templateUrl: './riding-session-reservation-form.component.html',
  styleUrl: './riding-session-reservation-form.component.css'
})
export class RidingSessionReservationFormComponent implements OnInit {

  private readonly oidcSecurityService = inject(OidcSecurityService);

  ridingSessionForm: FormGroup = new FormGroup({});
  showAvailableHorses: boolean = false;
  availableHorses: any = [];
  protected user: any;
  errorMessage: string = '';  // Stocker les messages d'erreur

  @Input()
  ridingSession: any;

  ngOnInit() {

    this.oidcSecurityService.checkAuth().subscribe(({ isAuthenticated, userData }) => {

      if (isAuthenticated) {
        this.user = userData;
      }
    }
    );

    console.log(this.ridingSessionsService.getAllRidingSessions());
  
    this.ridingSessionsService.getAvailableHorsesForRidingSession(this.ridingSession.id).subscribe(horses => {
      this.availableHorses = horses;
      console.log(this.availableHorses);
    });
    this.ridingSessionForm = new FormGroup({
      'horse': new FormControl(null, Validators.required)
    });
  }

  constructor(protected ridingSessionsService: RidingSessionService, protected riderService: RiderService) {}

  submitForm() {
    if (this.availableHorses.length > 0 && this.ridingSession.lessonCapacity > this.ridingSession.riders.length) {
      

      if (this.ridingSessionForm.valid) {

      this.availableHorses.forEach((horse: any) => {
        if (horse.id == this.ridingSessionForm.value.horse) {
          this.ridingSession.horses.push(horse);
        }
      });

        var rider = this.riderService.getRiderByPseudo(this.user.preferred_username);

        this.ridingSession.riders.push(rider);

      this.ridingSessionsService.updateRidingSession(this.ridingSession);
  
    }
    else {
      this.errorMessage = this.ridingSessionForm.errors ? this.ridingSessionForm.errors.toString() : 'Error in form submission';
      console.error(this.ridingSessionForm.errors);
    }
    } else {
      this.errorMessage = 'No available horses or no more space in the riding session';
    }
  }

  toggleAvailableHorsesDisplay() {
    if (this.showAvailableHorses) {
      this.showAvailableHorses = false;
    }
    else {
      this.showAvailableHorses = true;
    }
  }

  checkUserIncludeInRidingSession() {
    if (this.ridingSession.riders.some((rider:any) => rider.pseudo == this.user.preferred_username)) {
      return true;
    }
    else {
      return false;
    }
  }
}
