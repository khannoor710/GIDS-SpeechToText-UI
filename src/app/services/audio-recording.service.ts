import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioRecordingService {

  private mediaRecorder!: MediaRecorder;
  private chunks: Blob[] = [];

  constructor() { }

  async startRecording(): Promise<void> {
    console.log("Inside implementation of start Recording");
    debugger;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(stream);
      
      this.mediaRecorder.ondataavailable = (event) => {
        this.chunks.push(event.data);
      };
      this.mediaRecorder.start();
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  }

  stopRecording(): Promise<Blob> {
    console.log("Inside implementation of stop Recording");
    debugger;
    return new Promise((resolve) => {
      this.mediaRecorder.onstop = () => {
        const blob = new Blob(this.chunks, { type: 'audio/wav' });
        this.chunks = [];
        resolve(blob);
      };

      this.mediaRecorder.stop();
    });
  }
}