// microphone.service.ts

import { Injectable } from '@angular/core';
import annyang from 'annyang';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MicrophoneService {
  private isListening: boolean = false;
  private transcriptionSubject: Subject<string>;

  constructor() {
    this.transcriptionSubject = new Subject<string>();
  }

  startListening(): Observable<string> {
    if (!this.isListening) {
      annyang.start();
      annyang.addCallback('result', (phrases: string[]) => {
        const speechToText = phrases[0];
        this.transcriptionSubject.next(speechToText);
      });
      this.isListening = true;
    }
    return this.transcriptionSubject.asObservable();
  }

  stopListening() {
    if (this.isListening) {
      annyang.abort();
      this.isListening = false;
    }
  }
}