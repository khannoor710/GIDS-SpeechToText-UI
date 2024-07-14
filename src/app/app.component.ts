
// app.component.ts

import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { AudioRecordingService } from './services/audio-recording.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(private http: HttpClient, private audioRecordingService: AudioRecordingService) {}

  async startRecording(): Promise<void> {
    try {
      console.log("Inside start Recording");
      debugger;
      await this.audioRecordingService.startRecording();
      console.log('Recording started.');
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  }

  async stopRecording(): Promise<void> {
    try {
      console.log("Inside stop Recording");
      debugger;
      const audioBlob = await this.audioRecordingService.stopRecording();
      console.log('Recording stopped. Uploading audio...');

      const formData = new FormData();
      formData.append('audio', audioBlob, 'recorded_audio.wav');

      // Replace with your actual API endpoint
      const apiUrl = 'http://127.0.0.1:5000/api/audio/upload';
      this.http.post(apiUrl, formData)
        .subscribe(
          response => {
            console.log('Upload successful:', response);
            // Handle transcription response as needed
          },
          error => {
            console.error('Upload error:', error);
            // Handle error as needed
          }
        );
    } catch (error) {
      console.error('Error stopping recording:', error);
    }
  }
}
