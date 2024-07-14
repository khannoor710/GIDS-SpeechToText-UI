// src/app/speech-button/speech-button.component.ts

import { Component } from '@angular/core';
import { MicrophoneService } from '../microphone.service';

@Component({
  selector: 'app-speech-button',
  templateUrl: './speech-button.component.html',
  styleUrls: ['./speech-button.component.css']
})
export class SpeechButtonComponent {
  isListening: boolean = false;

  constructor(private micService: MicrophoneService) {}

  toggleListening() {
    if (this.isListening) {
      this.micService.stopListening();
    } else {
      this.micService.startListening();
    }
    this.isListening = !this.isListening;
  }
}
