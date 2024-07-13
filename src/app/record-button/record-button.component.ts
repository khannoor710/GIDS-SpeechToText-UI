// record-button.component.ts

import { Component, Inject } from '@angular/core';
import { AudioRecordingService } from '../services/audio-recording.service';

@Component({
  selector: 'app-record-button',
  templateUrl: './record-button.component.html',
  styleUrls: ['./record-button.component.css']
})
export class RecordButtonComponent {

  constructor(@Inject(AudioRecordingService) private audioRecordingService: AudioRecordingService) { }

  startRecording(): void {
    this.audioRecordingService.startRecording()
      .then(() => {
        console.log('Recording started');
      })
      .catch(err => {
        console.error('Error starting recording:', err);
      });
  }

  stopRecording(): void {
    this.audioRecordingService.stopRecording();
  }
}

