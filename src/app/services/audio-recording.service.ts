import { Injectable } from "@angular/core";
import * as RecordRTC from "recordrtc";
import moment from "moment";
import { Observable, Subject } from "rxjs";
import { TranscribeService } from "./transcribe.service";

interface RecordedAudioOutput {
  blob: Blob;
  title: string;
}

@Injectable({
  providedIn: 'root'
})

export class AudioRecordingService {
  private _transcribedText = new Subject<string>();
  private stream: any;
  private recorder: any;
  private interval : any;
  private startTime : any;
  private _recorded = new Subject<RecordedAudioOutput>();
  private _recordingTime = new Subject<string>();
  private _recordingFailed = new Subject<string>();

  constructor(private transcribeService: TranscribeService) {}

  getRecordedBlob(): Observable<RecordedAudioOutput> {
    return this._recorded.asObservable();
  }

  getRecordedTime(): Observable<string> {
    return this._recordingTime.asObservable();
  }

  recordingFailed(): Observable<string> {
    return this._recordingFailed.asObservable();
  }

  startRecording() {
    if (this.recorder) {
      // It means recording is already started or it is already recording something
      return;
    }

    this._recordingTime.next("00:00");
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(s => {
        this.stream = s;
        this.record();
      })
      .catch(error => {
        this._recordingFailed.next('');
      });
  }

  abortRecording() {
    this.stopMedia();
  }

  private record() {
    this.recorder = new RecordRTC.StereoAudioRecorder(this.stream, {
      type: "audio",
      mimeType: "audio/webm"
    });

    this.recorder.record();
    this.startTime = moment();
    this.interval = setInterval(() => {
      const currentTime = moment();
      const diffTime = moment.duration(currentTime.diff(this.startTime));
      const time =
        this.toString(diffTime.minutes()) +
        ":" +
        this.toString(diffTime.seconds());
      this._recordingTime.next(time);
    }, 1000);
  }

  private toString(value:any) {
    let val = value;
    if (!value) val = "00";
    if (value < 10) val = "0" + value;
    return val;
  }

  stopRecording() {
    if (this.recorder) {
      this.recorder.stop(
        (blob: any) => {
          if (this.startTime) {
            const mp3Name = encodeURIComponent(
              "audio_" + new Date().getTime() + ".wav"
            );
            this.stopMedia();
            this._recorded.next({ blob: blob, title: mp3Name });

            // Convert blob to file or FormData as required by the API
            const formData = new FormData();
            formData.append('file', blob, mp3Name);

            // Replace 'your_whisper_api_endpoint' with the actual endpoint
            // and adjust the method and body as per your API requirements
            this.transcribeService.transcribeLive(blob).subscribe({
              next: (response) => {
                console.log('Whisper API response:', response);
                this._transcribedText.next(response.transcribed_text);
              },
              error: (error) => {
                console.error('Whisper API error:', error);
                // Handle the error as needed
              },
            });
          }
        },
        () => {
          this.stopMedia();
          this._recordingFailed.next('');
        }
      );
    }
  }

  getTranscribedTextObservable() {
    return this._transcribedText.asObservable();
  }

  private stopMedia() {
    if (this.recorder) {
      this.recorder = null;
      clearInterval(this.interval);
      this.startTime = null;
      if (this.stream) {
        this.stream.getAudioTracks().forEach((track: { stop: () => any; }) => track.stop());
        this.stream = null;
      }
    }
  }
}
