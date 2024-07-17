import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranscribeService {
  private baseUrl = 'http://localhost:8080/api'; // Adjust if your API is hosted elsewhere

  constructor(private http: HttpClient) { }

  transcribeAudio(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('audio', file); // Ensure 'file' matches the key your Flask API expects

    return this.http.post(`${this.baseUrl}/transcription`, formData);
  }

  // Method to switch models
  selectModel(modelName: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/model`, { model_name: modelName });
  }

  // Method to get the current model
  getCurrentModel(): Observable<any> {
    return this.http.get(`${this.baseUrl}/model`);
  }

  // Method to test if the API is working
  testApi(): Observable<any> {
    return this.http.get(`${this.baseUrl}/test`);
  }

  private apiUrl = 'http://127.0.0.1:8000';

  transcribeLive(audioData: Blob): Observable<any> {
    const formData = new FormData();
    formData.append('audio', audioData, 'audio.wav'); // Adjust filename and type as needed

    const headers = new HttpHeaders();
    // headers.append('Authorization', 'Bearer your_token'); // Add authorization headers if required

    return this.http.post(`${this.apiUrl}/transcribe`, formData, { headers });
  }
}