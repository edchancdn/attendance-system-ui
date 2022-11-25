import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8080/api/session';

@Injectable({
  providedIn: 'root'
})
export class SessionStudentService {

  constructor(private http: HttpClient) { }

  addStudents(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}/student`, data);
  }

  delete(id: any, data: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}/student`, {
      body: data
    }
    );
  }
}