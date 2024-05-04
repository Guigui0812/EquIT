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

  @Input()
  ridingSession: any;

  ngOnInit() {
  
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


      this.oidcSecurityService.checkAuth().subscribe(({ isAuthenticated, userData }) => {
        console.log(userData.preferred_username);

        console.log(this.riderService.getAllRiders());


        console.log(this.riderService.getRiderByPseudo(userData.preferred_username));

        var rider = this.riderService.getRiderByPseudo(userData.preferred_username);

        this.ridingSession.riders.push(rider);
      
        console.log(this.ridingSession);

      });
      
      
      
      console.log(this.ridingSession);
      this.ridingSessionsService.updateRidingSession(this.ridingSession);
      console.log('Riding session updated');
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
}
