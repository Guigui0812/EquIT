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

        console.log('Check begin');

        console.log(this.ridingSessionsService.getAllRidingSessions());

        this.ridingSession.riders.push(rider);
      
        console.log(this.ridingSessionsService.getAllRidingSessions());

        console.log('Check end');

      this.ridingSessionsService.updateRidingSession(this.ridingSession);
  
    }
    else {
      console.log('Riding session not updated: invalid form');
      console.error(this.ridingSessionForm.errors);
    }
    } else {
      console.log('Riding session is full or no horses available are available');
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
