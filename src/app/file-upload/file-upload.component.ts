import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranscribeService } from '../services/transcribe.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {
  @Output() transcriptionComplete: EventEmitter<string> = new EventEmitter();
  selectedFile: File | null = null;
  message: string | null = null;
  downloadUrl: string | null = null;
  isLoading = false;
  selectedModel = "base";
  textAreaContent = "";
  transcribedText = '';
  password = 'yourpassword'; // Define your password here
  voiceType = 'Medium Voice'; // Default voice type
  recording = false; // Track recording status

  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];

  constructor(private http: HttpClient, private transcribeService: TranscribeService) {}

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onUpload(): void {
    if (!this.selectedFile) {
      this.message = 'No file selected';
      return;
    }

    this.isLoading = true;
    const formData = new FormData();
    formData.append('audio', this.selectedFile);

    this.transcribeService.transcribeAudio(this.selectedFile).subscribe({
      next: (response) => {
        console.log(response);
        const transcribedText = response.transcribed_text;
        this.transcribedText = transcribedText;
        this.transcriptionComplete.emit(this.transcribedText);

        this.message = `File transcribed successfully.`;
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.message = 'Transcription failed';
      }
    });
  }

  onModelChange(event: any): void {
    const selectedModel = event.target.value;
    this.isLoading = true; // Show loading indicator
    this.transcribeService.selectModel(selectedModel).subscribe({
      next: (response) => { 
        this.message = response.message;
        this.isLoading = false;
        this.updateVoiceType(selectedModel); // Update voice type based on selected model
      },
      error: (error) => {
        console.error(error);
        this.message = 'Failed to switch model';
      }
    });
  }

  updateVoiceType(modelName: string): void {
    switch (modelName) {
      case 'tiny':
        this.voiceType = 'Voice easy to understand';
        break;
      case 'base':
        this.voiceType = 'Little tough to understand';
        break;
      case 'small':
        this.voiceType = 'Having an unusually harsh sound';
        break;
      case 'medium':
        this.voiceType = 'Very tough to understand';
        break;
      default:
        this.voiceType = 'Unknown Voice';
        break;
    }
  }

  private downloadBlob(blob: Blob, filename: string): void {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a); // Append the anchor to body
    a.click(); // Simulate click on the anchor
    document.body.removeChild(a); // Clean up
    window.URL.revokeObjectURL(url); // Release blob URL
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    const target = event.target as HTMLElement;
    target.classList.add('drag-over');
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    const target = event.target as HTMLElement;
    target.classList.remove('drag-over');
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    const target = event.target as HTMLElement;
    target.classList.remove('drag-over');

    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      this.selectedFile = event.dataTransfer.files[0];
    }
  }
}