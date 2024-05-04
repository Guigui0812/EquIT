import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RiderService } from '../../services/rider.service';
import { Rider } from '../../models/rider.model';
import { NgForOf } from '@angular/common';
import { RiderFormComponent } from '../rider-form/rider-form.component';
import { RiderDetailsComponent } from '../rider-details/rider-details.component';

@Component({
  selector: 'app-riders-overview',
  standalone: true,
  imports: [CommonModule, RouterModule, NgForOf, RiderFormComponent, RiderDetailsComponent],
  templateUrl: './riders-overview.component.html',
  styleUrl: './riders-overview.component.css'
})
export class RidersOverviewComponent {

  showForm = false;
  showDetails = false;
  riderId: number = 0;
  riderToView: any;
  selectedRiderId: number = 0;

  showRiderRegistrationForm() {

    if (this.showForm) {
      this.showForm = false;
      return;
    }

    this.showForm = true;
  }

  showRiderDetails() {

    if (this.showDetails) {
      this.showDetails = false;
    }
    else {
      this.showDetails = true;
    }
  }

  checkRiderToDisplay(id: number) {
    return this.selectedRiderId === id; 
  }

  constructor(protected riderService: RiderService) {}

  riders: Rider[] = [];

  viewRider(id: number) {
    this.riderId = id;
  }

  editRider(id: number) {
    console.log("Editing rider", id);
  }

}
