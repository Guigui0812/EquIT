import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RiderService {
  private riderArray: any[] = [];

  constructor(private httpClient: HttpClient) {
    this.refreshRiders();
  }

  refreshRiders() {
    this.httpClient.get('/api/riders').subscribe((riders: any) => {
      this.riderArray = riders;
    });
  }

  getAllRiders() {
    return this.riderArray;
  }

  addRider(riderData: any) {
    let rider = {
      firstName: riderData.firstName,
      lastName: riderData.lastName,
      pseudo: riderData.pseudo,
      level: riderData.level
    };

    this.httpClient.post('/api/riders', rider).subscribe(() => {
      this.refreshRiders();
    });
  }

  removeRider(id: number) {
    this.httpClient.delete(`/api/riders/${id}`).subscribe(() => {
      this.refreshRiders();
    });
  }

  getRiderByPseudo(pseudo: string) {
    return this.riderArray.find(rider => rider.pseudo === pseudo);
  }
}
