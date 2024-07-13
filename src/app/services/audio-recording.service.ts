// audio-recording.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioRecordingService {
  private mediaRecorder!: MediaRecorder;
  private recordedChunks: Blob[] = [];

  constructor() {}

  startRecording(): Promise<void> {
    return new Promise((resolve, reject) => {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          this.recordedChunks = [];
          this.mediaRecorder = new MediaRecorder(stream);
          this.mediaRecorder.ondataavailable = (e: BlobEvent) => {
            if (e.data.size > 0) {
              this.recordedChunks.push(e.data);
            }
          };
          this.mediaRecorder.onstop = () => {
            const blob = new Blob(this.recordedChunks, { type: 'audio/wav' });
            this.recordedChunks = [];
            const audioUrl = URL.createObjectURL(blob);
            console.log('Recording stopped. Blob URL:', audioUrl);
          };
          this.mediaRecorder.start();
          resolve(); // Resolve the promise when recording starts
        })
        .catch(err => {
          console.error('Error accessing microphone:', err);
          reject(err); // Reject the promise if there's an error
        });
    });
  }

  stopRecording(): Promise<Blob> {
    return new Promise((resolve, reject) => {
      if (this.mediaRecorder && this.mediaRecorder.state === 'recording') {
        this.mediaRecorder.onstop = () => {
          const blob = new Blob(this.recordedChunks, { type: 'audio/wav' }); // Adjust the MIME type as needed
          resolve(blob);
        };

        this.mediaRecorder.stop();
      } else {
        reject(new Error('No recording in progress.'));
      }
    });
  }
}