import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Cohort } from '../models/cohort.model';

const baseUrl = 'http://localhost:8080/api/cohort';

@Injectable({
  providedIn: 'root'
})
export class CohortService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Cohort[]> {
    return this.http.get<Cohort[]>(baseUrl);
  }

  get(id: any): Observable<Cohort> {
    return this.http.get<Cohort>(`${baseUrl}?id=${id}`);
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

  findByName(name: any): Observable<Cohort[]> {
    return this.http.get<Cohort[]>(`${baseUrl}?name=${name}`);
  }
}
