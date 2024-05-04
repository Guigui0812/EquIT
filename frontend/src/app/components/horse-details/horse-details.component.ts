import { Component, Input } from '@angular/core';
import { HorseService } from '../../services/horse.service';
import { NgClass, NgStyle } from '@angular/common';

@Component({
  selector: 'app-horse-details',
  standalone: true,
  imports: [NgClass, NgStyle],
  templateUrl: './horse-details.component.html',
  styleUrl: './horse-details.component.css'
})
export class HorseDetailsComponent {

  @Input("horseToView")
  horse: any;

  constructor(protected horseService: HorseService) {}
}
