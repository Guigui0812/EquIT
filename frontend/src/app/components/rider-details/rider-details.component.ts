import { Component, Input } from '@angular/core';
import { RiderService } from '../../services/rider.service';
import { NgClass, NgStyle } from '@angular/common';

@Component({
  selector: 'app-rider-details',
  standalone: true,
  imports: [NgClass, NgStyle],
  templateUrl: './rider-details.component.html',
  styleUrl: './rider-details.component.css'
})
export class RiderDetailsComponent {
  @Input("riderToView")
  rider: any;

  constructor(protected riderService: RiderService) {}
}
