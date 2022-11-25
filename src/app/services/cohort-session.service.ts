import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8080/api/cohort';

@Injectable({
  providedIn: 'root'
})
export class CohortSessionService {

  constructor(private http: HttpClient) { }

  addSessions(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}/session`, data);
  }

  delete(id: any, data: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}/session`, {
      body: data
    }
    );
  }

}
