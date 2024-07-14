// api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://127.0.0.1:5000/api/audio/upload';

  constructor(private http: HttpClient) {}

  sendSpeechToAPI(speech: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/transcribe`, { speech });
  }
}

