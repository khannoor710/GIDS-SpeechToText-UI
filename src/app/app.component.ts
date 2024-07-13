
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

  startRecording(): void {
    this.audioRecordingService.startRecording();
  }

  stopRecording(): void {
    this.audioRecordingService.stopRecording()
      .then(audioBlob => {
        this.sendDataToApi(audioBlob);
      })
      .catch(error => {
        console.error('Error stopping recording:', error);
      });
  }

  sendDataToApi(audioBlob: Blob): void {
    const formData = new FormData();
    formData.append('audio', audioBlob, 'recorded_audio.wav'); // Adjust filename and MIME type as necessary
    console.log(formData);

    // Replace with your API endpoint
    this.http.post('http://127.0.0.1:5000/api/audio/upload', formData)
      .subscribe(
        response => {
          console.log('Upload successful:', response);
        },
        error => {
          console.error('Upload error:', error);
        }
      );
  }
}
