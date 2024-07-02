import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranscribeService } from '../services/transcribe.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {
  selectedFile: File | null = null;
  message: string | null = null;

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

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    if (this.selectedFile) {
      this.transcribeService.transcribeAudio(this.selectedFile).subscribe({
        next: (response) => console.log(response),
        error: (error) => console.error(error)
      });
    } else {
      console.log('No file selected');
    }
  }

  transcribeAudio() {
    if (this.selectedFile) {
      this.transcribeService.transcribeAudio(this.selectedFile).subscribe({
        next: (response) => console.log(response),
        error: (error) => console.error(error)
      });
    } else {
      console.log('No file selected');
    }
  }

  switchModel(modelName: string) {
    this.transcribeService.selectModel(modelName).subscribe({
      next: (response) => console.log(response),
      error: (error) => console.error(error)
    });
  }

  getCurrentModel() {
    this.transcribeService.getCurrentModel().subscribe({
      next: (response) => console.log(response),
      error: (error) => console.error(error)
    });
  }

  testApi() {
    this.transcribeService.testApi().subscribe({
      next: (response) => console.log(response),
      error: (error) => console.error(error)
    });
  }
}