import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TextTranslateService {
  private apiUrl = 'http://localhost:5000/upload';  // URL of the Flask API

  constructor(private http: HttpClient) { }

  // Method to upload PDF to Flask API
  uploadPdf(file: File): Observable<Blob> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    // Make the POST request to upload the PDF file
    return this.http.post(this.apiUrl, formData, {
      responseType: 'blob',  // Expecting a Blob (PDF) in response
      observe: 'response'    // Observe the full response, not just the body
    }).pipe(
      map((res: HttpResponse<Blob>) => {
        return res.body as Blob;  // Return the file blob from the response
      }),
      catchError(this.handleError)  // Handle errors
    );
  }

  // Error handling
  private handleError(error: any): Observable<never> {
    console.error(`Error: ${error.message}`);
    return throwError('An error occurred during the upload. Please try again.');
  }
}
