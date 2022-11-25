import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Session } from '../models/session.model';

const baseUrl = 'http://localhost:8080/api/session';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Session[]> {
    return this.http.get<Session[]>(baseUrl);
  }

  get(id: any): Observable<Session> {
    return this.http.get<Session>(`${baseUrl}?id=${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(baseUrl, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  findByDate(sessionDate: any): Observable<Session[]> {
    return this.http.get<Session[]>(`${baseUrl}?sessionDate=${sessionDate}`);
  }
}
