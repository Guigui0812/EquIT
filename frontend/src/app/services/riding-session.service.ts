import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RidingSession } from '../models/riding-session.model';
import { take } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RidingSessionService {
  private ridingSessionsArray: any = [];

  constructor(private httpClient: HttpClient) {
    this.refreshRidingSessions();
  }

  refreshRidingSessions() {
    this.httpClient.get('/api/riding-sessions').subscribe((riderSession: any) => {
      this.ridingSessionsArray = riderSession;
    });
  }

  getAllRidingSessions() {
    return this.ridingSessionsArray;
  }

  addRidingSession(riderSessionData: any) {
    let ridingSession = {
      date: riderSessionData.date,
      duration: riderSessionData.duration,
      lessonCapacity: riderSessionData.lessonCapacity,
      lessonLevel: riderSessionData.lessonLevel,
      teacher: riderSessionData.teacher
    };

    console.log(ridingSession);

    this.httpClient.post('/api/riding-sessions', ridingSession).subscribe(() => {
      this.refreshRidingSessions();
    });
  }

  updateRidingSession(riderSession: RidingSession) {

    console.log(riderSession);
    this.httpClient.put(`/api/riding-sessions/${riderSession.id}`, riderSession).subscribe(() => {
      this.refreshRidingSessions();
    });
  }

  removeRidingSession(id: number) {
    this.httpClient.delete(`/api/riding-sessions/${id}`).subscribe(() => {
      this.refreshRidingSessions();
    });
  }

  getAvailableHorsesForRidingSession(sessionId: number): Observable<any[]> {
    return this.httpClient.get<any[]>(`/api/riding-sessions/${sessionId}/horses`);
  }

  getAvailableSessionForRider(riderName: string){

    // Get all riding sessions where the rider is not already booked and where the number of riders is less than the capacity
    return this.ridingSessionsArray.filter((ridingSession: any) => {
      return ridingSession.riders.filter((rider: any) => rider.name === riderName).length === 0 && ridingSession.riders.length < ridingSession.lessonCapacity;
    });
  }

}
