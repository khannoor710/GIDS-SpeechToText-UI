
// app.component.ts

import { Component } from '@angular/core';
import { MicrophoneService } from './microphone.service';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  transcription: string = '';

  constructor(private micService: MicrophoneService, private apiService: ApiService) {}

  startListening() {
    this.micService.startListening().subscribe(
      (speech: string) => {
        this.transcription = speech;
        this.sendSpeechToAPI(speech);
      },
      (error: any) => {
        console.error('Error in speech recognition', error);
      }
    );
  }

  stopListening() {
    this.micService.stopListening();
  }

  sendSpeechToAPI(speech: string) {
    this.apiService.sendSpeechToAPI(speech).subscribe(
      response => {
        console.log('API Response:', response);
        // Handle response as needed
      },
      error => {
        console.error('Error sending speech to API', error);
      }
    );
  }  
}
