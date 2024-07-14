// api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient) {}

  transcribeAudio(audioData: Blob): Observable<any> {
    debugger;
    const formData = new FormData();
    formData.append('audio', audioData, 'audio.wav'); // Adjust filename and type as needed

    const headers = new HttpHeaders();
    // headers.append('Authorization', 'Bearer your_token'); // Add authorization headers if required

    return this.http.post(`${this.apiUrl}/api/audio/upload`, formData, { headers });
  }
}

