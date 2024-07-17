import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AudioRecordingService } from "../audio-recording.service";
import { DomSanitizer } from "@angular/platform-browser";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-audio-recorder',
  templateUrl: './audio-recorder.component.html',
  styleUrl: './audio-recorder.component.css'
})
export class AudioRecorderComponent implements OnInit, OnDestroy  {
  @Output() transcriptionComplete: EventEmitter<string> = new EventEmitter();
  private transcribedTextSub: Subscription = new Subscription();
  transcribedText: string = '';
  isRecording = false;
  recordedTime: any;
  blobUrl : any;
  teste : any;

  constructor(
    private audioRecordingService: AudioRecordingService,
    private sanitizer: DomSanitizer
  ) {
    this.audioRecordingService
      .recordingFailed()
      .subscribe(() => (this.isRecording = false));
    this.audioRecordingService
      .getRecordedTime()
      .subscribe(time => (this.recordedTime = time));
    this.audioRecordingService.getRecordedBlob().subscribe(data => {
      this.teste = data;
      this.blobUrl = this.sanitizer.bypassSecurityTrustUrl(
        URL.createObjectURL(data.blob)
      );
    });
  }

  ngOnInit() {
    this.transcribedTextSub = this.audioRecordingService.getTranscribedTextObservable().subscribe({
      next: (text) => {
        this.transcribedText = text; // Update your component's view/model
        this.transcriptionComplete.emit(this.transcribedText);
      },
      error: (error) => console.error(error),
    });
  }

  ngOnDestroy() {
    this.transcribedTextSub.unsubscribe();
    this.abortRecording();
  }

  startRecording() {
    if (!this.isRecording) {
      this.isRecording = true;
      this.audioRecordingService.startRecording();
    }
  }

  abortRecording() {
    if (this.isRecording) {
      this.isRecording = false;
      this.audioRecordingService.abortRecording();
    }
  }

  stopRecording() {
    if (this.isRecording) {
      this.audioRecordingService.stopRecording();
      this.isRecording = false;
    }
  }

  clearRecordedData() {
    this.blobUrl = null;
  }

  download(): void {
    const url = window.URL.createObjectURL(this.teste.blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = this.teste.title;
    link.click();
  }
}
