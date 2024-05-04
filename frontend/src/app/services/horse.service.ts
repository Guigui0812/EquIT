import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HorseService {
  private horseArray: any[] = [];

  constructor(private httpClient: HttpClient) {
    this.refreshHorses();
  }

  // Fonction pour récupérer tous les chevaux depuis le backend
  refreshHorses() {
    this.httpClient.get('/api/horses').subscribe((horses: any) => {
      this.horseArray = horses;
    });
  }

  // Retourne la liste des chevaux
  getAllHorses() {
    return this.horseArray;
  }

  // Ajoute un nouveau cheval en utilisant les informations du formulaire
  addHorse(horseData: any) {
    let horse = {
      name: horseData.name,
      sireNumber: horseData.sireNumber,
      dateOfBirth: horseData.dateOfBirth,
      placeOfBirth: horseData.placeOfBirth,
      breed: horseData.breed,
      color: horseData.color,
      height: horseData.height,
      weight: horseData.weight,
      gender: horseData.gender,
      riders: [horseData.riders]
    };

    this.httpClient.post('/api/horses', horse).subscribe(() => {
      this.refreshHorses();
    });
  }

  removeHorse(id: number) {
    this.httpClient.delete(`/api/horses/${id}`).subscribe(() => {
      this.refreshHorses();
    });
  }

  getHorse(id: number) {
    return this.horseArray.find(horse => horse.id === id);
  }
}
