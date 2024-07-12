import { Component } from '@angular/core';
import { AudioService } from './services/audio.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'whisper-ui';
  constructor(private audioService: AudioService) { }

  async startRecordingAndTranscribe(): Promise<void> {
    try {
      const transcription = await this.audioService.recordAndSendToAPI();
      console.log('Transcription:', transcription);
      // Handle transcription result as needed
    } catch (error) {
      console.error('Error recording and transcribing:', error);
      // Handle error
    }
  }
}
