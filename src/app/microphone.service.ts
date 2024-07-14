import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MicrophoneService {
  private mediaStream: MediaStream | null = null;
  private audioContext: AudioContext | null = null;
  private bufferSize = 2048;
  private sampleRate: number;
  audioDataSubject: Subject<Blob> = new Subject<Blob>(); // Define audioDataSubject

  constructor() {
    this.sampleRate = 44100; // Adjust as needed
  }

  startListening(): void {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream: MediaStream) => {
        this.mediaStream = stream;
        this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const microphone = this.audioContext.createMediaStreamSource(stream);
        const processor = this.audioContext.createScriptProcessor(this.bufferSize, 1, 1);

        processor.onaudioprocess = (event: AudioProcessingEvent) => {
          const inputData = event.inputBuffer.getChannelData(0);
          const buffer = new Float32Array(this.bufferSize);
          buffer.set(inputData);
          const blob = new Blob([buffer], { type: 'audio/wav' });
          this.audioDataSubject.next(blob); // Emit audio data to subscribers
        };

        microphone.connect(processor);
        processor.connect(this.audioContext.destination);
      })
      .catch((error) => {
        console.error('Error accessing microphone:', error);
      });
  }

  stopListening(): void {
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(track => track.stop());
      if (this.audioContext) {
        this.audioContext.close().then(() => {
          this.audioContext = null;
        });
      }
    }
  }
}