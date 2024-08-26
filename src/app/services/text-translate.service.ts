import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TextTranslateService {
  private baseUrl: string = 'http://127.0.0.1:8080/api';

  constructor(private http: HttpClient) {}

  // Method to translate text from a file
  translateText(file: File, targetLanguage: string): Observable<{ translatedText: string }> {
    const formData = new FormData();
    formData.append('file', file); // Ensure 'file' matches the key your API expects
    formData.append('targetLanguage', targetLanguage);
    return this.http.post<{ translatedText: string }>(`${this.baseUrl}/translate`, formData);
  }
}
