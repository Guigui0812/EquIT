import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, ValidatorFn, AbstractControl } from '@angular/forms';
import { HorseService } from '../../services/horse.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

// Validateur pour la date de naissance
function dateOfBirthValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const today = new Date();
    const twentyYearsAgo = new Date(today.getFullYear() - 20, today.getMonth(), today.getDate());
    const selectedDate = new Date(control.value);
    return (selectedDate <= today && selectedDate >= twentyYearsAgo) ? null : { 'dateOfBirth': 'Date of birth should be at least 20 years ago' };
  };
}

// Validateur pour la hauteur
function heightValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    const valid = value >= 50 && value <= 200;
    return valid ? null : { 'height': 'Height should be between 50 cm and 200 cm' };
  };
}

// validateur pour le poids
function weightValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    const valid = value >= 20 && value <= 1000;
    return valid ? null : { 'weight': 'Weight should be between 20 kg and 1000 kg' };
  };
}

@Component({
  selector: 'app-horse-form',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule],
  templateUrl: './horse-form.component.html',
  styleUrls: ['./horse-form.component.css']
})
export class HorseFormComponent implements OnInit {
  horseForm: FormGroup;
  errorMessage: string = '';

  constructor(protected horseService: HorseService) {
    this.horseForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'breed': new FormControl(null, Validators.required),
      'height': new FormControl(null, [Validators.required, heightValidator()]),
      'weight': new FormControl(null, [Validators.required, weightValidator()]),
      'color': new FormControl(null, Validators.required),
      'dateOfBirth': new FormControl(null, [Validators.required, dateOfBirthValidator()]),
      'placeOfBirth': new FormControl(null, Validators.required),
      'sireNumber': new FormControl(null, Validators.required),
      'gender': new FormControl(null, Validators.required)
    });
  }

  ngOnInit() {}

  submitForm() {
    if (this.horseForm.valid) {
      this.horseService.addHorse(this.horseForm.value);
      console.log('Horse created');
    } else {
      this.errorMessage = 'Please fill in all required fields :' + this.horseForm.errors;
    }
  }
}
