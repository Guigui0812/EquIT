import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HorseService } from '../../services/horse.service';
import { Horse } from '../../models/horse.model';
import { NgForOf } from '@angular/common';
import { HorseFormComponent } from '../horse-form/horse-form.component';
import { HorseDetailsComponent } from '../horse-details/horse-details.component';

@Component({
  selector: 'app-horses-overview',
  standalone: true,
  imports: [CommonModule, RouterModule, NgForOf, HorseFormComponent, HorseDetailsComponent],
  templateUrl: './horses-overview.component.html',
  styleUrl: './horses-overview.component.css'
})
export class HorsesOverviewComponent {

  showForm = false;
  showDetails = false;
  horseId: number = 0;
  horseToView: any;
  selectedHorseId: number = 0;

  showHorseRegistrationForm() {

    if (this.showForm) {
      this.showForm = false;
      return;
    }

    this.showForm = true;
  }

  showHorseDetails() {

    if (this.showDetails) {
      this.showDetails = false;
    }
    else {
      this.showDetails = true;
    }
  }

  checkHorseToDisplay(id: number) {
    return this.selectedHorseId === id; 
  }

  constructor(protected horseService: HorseService) {}

  horses: Horse[] = [];

  viewHorse(id: number) {
    this.horseId = id;
  }

  editHorse(id: number) {
    console.log("Editing horse", id);
  }

}
