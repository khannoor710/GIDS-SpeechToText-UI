
// app.component.ts

import { Component, OnDestroy, OnInit } from '@angular/core';
import { MicrophoneService } from './microphone.service';
import { ApiService } from './api.service';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy{
  private audioDataSubscription!: Subscription;

  constructor(private microphoneService: MicrophoneService, private apiService: ApiService) {}

  ngOnInit(): void {
    this.microphoneService.startListening();
    this.audioDataSubscription = this.microphoneService.audioDataSubject.subscribe(
      (audioData: Blob) => {
        this.transcribeAudio(audioData);
      }
    );
  }

  ngOnDestroy(): void {
    this.microphoneService.stopListening();
    this.audioDataSubscription.unsubscribe();
  }

  transcribeAudio(audioData: Blob): void {
    this.apiService.transcribeAudio(audioData).subscribe(
      (response) => {
        console.log('Transcription:', response);
        // Handle transcribed text (response) here
      },
      (error) => {
        console.error('Transcription error:', error);
        // Handle error
      }
    );
  }
}
