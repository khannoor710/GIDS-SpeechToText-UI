import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranscribeService {
  private baseUrl = 'http://127.0.0.1:8080/api'; // Adjust if your API is hosted elsewhere

  constructor(private http: HttpClient) { }

  // Method to transcribe a single audio file
  transcribeAudio(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('audio', file); // Ensure 'audio' matches the key your Flask API expects
    return this.http.post<any>(`${this.baseUrl}/transcription`, formData);
  }

  // Method to transcribe multiple audio files
  transcribeMultipleAudios(files: FormData): Observable<{ transcriptions: { file_name: string, transcribed_text: string }[] }> {
    return this.http.post<{ transcriptions: { file_name: string, transcribed_text: string }[] }>(`${this.baseUrl}/transcriptions`, files);
  }

  // Method to switch models
  selectModel(modelName: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.baseUrl}/model`, { model_name: modelName });
  }

  // Method to get the current model
  getCurrentModel(): Observable<{ current_model: string }> {
    return this.http.get<{ current_model: string }>(`${this.baseUrl}/model`);
  }

  // Method to test if the API is working
  testApi(): Observable<{ message: string }> {
    return this.http.get<{ message: string }>(`${this.baseUrl}/test`);
  }

  // Method for live audio transcription
  transcribeLive(audioData: Blob): Observable<{ transcribed_text: string }> {
    const formData = new FormData();
    formData.append('audio', audioData, 'audio.wav'); // Adjust filename and type as needed
    return this.http.post<{ transcribed_text: string }>(`${this.baseUrl}/transcribe-live`, formData); // Ensure endpoint is correct
  }

  // Method to download the transcribed text
  downloadTranscript(transcribedText: string, fileType: string): Observable<Blob> {
    const body = { transcribedText: transcribedText, fileType: fileType };
    return this.http.post<Blob>(`${this.baseUrl}/download`, body, {
      responseType: 'blob' as 'json', // Important for file downloads
    });
  }
}