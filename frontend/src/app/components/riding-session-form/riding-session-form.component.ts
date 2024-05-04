import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { RidingSessionService } from '../../services/riding-session.service';
import { HttpClientModule } from '@angular/common/http';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { CommonModule } from '@angular/common';

// Définition du validateur de date future
function futureDateValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!control.value) {
      return null;  // si aucune date n'est entrée, on ne retourne pas d'erreur
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);  // retire l'heure pour comparer uniquement la date
    const selectedDate = new Date(control.value);

    return selectedDate >= today ? null : { 'futureDate': 'The date cannot be in the past' };
  };
}

@Component({
  selector: 'app-riding-session-form',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule],
  templateUrl: './riding-session-form.component.html',
  styleUrls: ['./riding-session-form.component.css']
})
export class RidingSessionFormComponent implements OnInit {

  errorMessage: string = ''; 

  ridingSessionForm: FormGroup = new FormGroup({});

  constructor(protected ridingSessionsService: RidingSessionService) {}

  private readonly oidcSecurityService = inject(OidcSecurityService);

  ngOnInit() {
    this.ridingSessionForm = new FormGroup({
      'date': new FormControl(null, [Validators.required, futureDateValidator()]),
      'duration': new FormControl(null, Validators.required),
      'lessonCapacity': new FormControl(null, Validators.required),
      'lessonLevel': new FormControl(null, Validators.required),
    });
  }

  submitForm() {

    // Add Teacher to the riding session
    this.oidcSecurityService.checkAuth().subscribe(({ isAuthenticated, userData }) => {
      if (isAuthenticated) {
        this.ridingSessionForm.addControl('teacher', new FormControl(userData.name));
      }
    });


    console.log(this.ridingSessionForm.value);

    if (this.ridingSessionForm.valid) {
      this.ridingSessionsService.addRidingSession(this.ridingSessionForm.value);
      console.log('Riding session added');
    } else {
      this.errorMessage = 'Please fill in all required fields :' + this.ridingSessionForm.errors;
    }
  }
}
