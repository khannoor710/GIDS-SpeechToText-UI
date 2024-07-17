import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-transcribe-text-display',
  templateUrl: './transcribe-text-display.component.html',
  styleUrl: './transcribe-text-display.component.css'
})
export class TranscribeTextDisplayComponent {
  @Input() transcribedText: string = '';
}
