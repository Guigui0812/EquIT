import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RiderService } from '../../services/rider.service';
import { HttpClientModule } from '@angular/common/http';
import { HorseService } from '../../services/horse.service';
import { Horse } from '../../models/horse.model';
import { CommonModule, NgFor, NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-rider-form',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, FormsModule, NgForOf, NgIf, CommonModule],
  templateUrl: './rider-form.component.html',
  styleUrl: './rider-form.component.css'
})
export class RiderFormComponent implements OnInit {

  riderForm: FormGroup = new FormGroup({});
  selectedHorses: string[] = [];
  horses: any[] = [];
  availableHorses: any[] = [];
  errorMessage: string = '';

  ngOnInit() {
    this.riderForm = new FormGroup({
        'firstName': new FormControl(null, Validators.required),
        'lastName': new FormControl(null, Validators.required),
        'pseudo': new FormControl(null, Validators.required),
        'level': new FormControl(null, Validators.required)
    });
  }

  constructor(protected riderService: RiderService, protected horseService: HorseService) {
  }

  submitForm() {
    if (this.riderForm.valid) {
      this.riderService.addRider(this.riderForm.value);
      console.log('Rider created');
    }
    else {
      this.errorMessage = 'Please fill in all required fields :' + this.riderForm.errors;
    }
  }
}