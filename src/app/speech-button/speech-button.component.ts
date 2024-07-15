import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import Recorder from 'recorder-js';

@Component({
  selector: 'app-speech-button',
  templateUrl: './speech-button.component.html',
  styleUrls: ['./speech-button.component.css']
})
export class SpeechButtonComponent implements OnInit, OnDestroy {
  private recorder!: Recorder; // Definite assignment assertion
  recording = false;
  transcript: string | null = null;
  errorMessage: string | null = null;
  private audioContext: AudioContext | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    this.recorder = new Recorder(this.audioContext);
  }

  ngOnDestroy(): void {
    if (this.audioContext) {
      this.audioContext.close();
    }
  }

  toggleRecording(): void {
    if (this.recording) {
      this.stopRecording();
    } else {
      this.startRecording();
    }
  }

  startRecording(): void {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        this.recorder.init(stream);
        this.recorder.start();
        this.recording = true;
      })
      .catch(err => {
        this.errorMessage = 'Could not start recording: ' + err.message;
      });
  }

  stopRecording(): void {
    this.recorder.stop()
      .then(({ blob }: { blob: Blob }) => {
        this.recording = false;
        this.sendAudio(blob);
      })
      .catch(err => {
        this.errorMessage = 'Could not stop recording: ' + err.message;
      });
  }

  sendAudio(blob: Blob): void {
    const formData = new FormData();
    formData.append('audio', blob, 'audio.wav');
    formData.append('language', 'en'); // You can change this or make it dynamic

    this.http.post<{ transcript: string }>('http://127.0.0.1:5000/transcribe', formData)
      .subscribe(
        response => {
          this.transcript = response.transcript;
          this.errorMessage = null;
        },
        (error: HttpErrorResponse) => {
          this.errorMessage = 'Error transcribing audio: ' + (error.message || error.statusText);
        }
      );
  }
}