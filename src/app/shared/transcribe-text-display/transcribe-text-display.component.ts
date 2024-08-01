import { Component, Input } from '@angular/core';
import { TranscribeService } from '../../services/transcribe.service';
import saveAs from 'file-saver';

@Component({
  selector: 'app-transcribe-text-display',
  templateUrl: './transcribe-text-display.component.html',
  styleUrl: './transcribe-text-display.component.css'
})
export class TranscribeTextDisplayComponent {
  @Input() transcribedText: string = '';
  selectedFormat = 'txt';

  constructor(private transcribeService: TranscribeService) {}

  async downloadTranscribedText() {
    this.transcribeService.downloadTranscript(this.transcribedText, this.selectedFormat).subscribe((response: Blob) => {
      saveAs(response, 'protected_transcript.zip');
    }, error => {
      console.error('Error downloading file', error);
    });
  }
}
