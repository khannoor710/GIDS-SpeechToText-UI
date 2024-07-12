import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  constructor(private http: HttpClient) { }

  recordAndSendToAPI(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(mediaStream => {
          const mediaRecorder = new MediaRecorder(mediaStream);
          const audioChunks: Blob[] = [];

          mediaRecorder.addEventListener('dataavailable', event => {
            audioChunks.push(event.data);
          });

          mediaRecorder.addEventListener('stop', async () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
            const formData = new FormData();
            formData.append('audio', audioBlob, '~/src/assets/harvard.wav');

            try {
              const apiUrl = 'http://127.0.0.1:5000/api/audio/upload';
              const response = await this.http.post<string>(apiUrl, formData).toPromise();
              if (response) {
                resolve(response); // Resolve with the transcription result
              } else {
                reject('Empty response received'); // Reject if response is empty
              }
            } catch (error) {
              if (error instanceof HttpErrorResponse) {
                console.error('HTTP error occurred:', error.status, error.statusText);
              } else {
                console.error('Error occurred:', error);
              }
              reject(error); // Reject with the error if HTTP request fails
            }
          });

          mediaRecorder.start();
          setTimeout(() => mediaRecorder.stop(), 5000); // Stop recording after 5 seconds (adjust as needed)

        })
        .catch(error => {
          console.error('Error capturing audio:', error);
          reject(error); // Reject promise if getUserMedia fails
        });
    });
  }

}