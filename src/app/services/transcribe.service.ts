import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranscribeService {
  private baseUrl = 'http://127.0.0.1:8080/api'; // Adjust if your API is hosted elsewhere

  constructor(private http: HttpClient) { }

  // Method to transcribe audio files (e.g., file uploads)
  transcribeAudio(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('audio', file); // Ensure 'audio' matches the key your Flask API expects

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

  // Method for live audio transcription
  transcribeLive(audioData: Blob): Observable<any> {
    const formData = new FormData();
    formData.append('audio', audioData, 'audio.wav'); // Adjust filename and type as needed
    return this.http.post(`${this.baseUrl}/transcribe-live`, formData); // Ensure endpoint is correct
  }
}