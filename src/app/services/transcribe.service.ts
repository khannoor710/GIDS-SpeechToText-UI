import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranscribeService {
  private baseUrl = 'http://localhost:8080'; // Adjust if your API is hosted elsewhere

  constructor(private http: HttpClient) { }

  transcribeAudio(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('audio', file); // Ensure 'file' matches the key your Flask API expects

    return this.http.post(`${this.baseUrl}/transcribe`, formData);
  }

  // Method to switch models
  selectModel(modelName: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/select_model`, { model_name: modelName });
  }

  // Method to get the current model
  getCurrentModel(): Observable<any> {
    return this.http.get(`${this.baseUrl}/get_model`);
  }

  // Method to test if the API is working
  testApi(): Observable<any> {
    return this.http.get(`${this.baseUrl}/test`);
  }
}