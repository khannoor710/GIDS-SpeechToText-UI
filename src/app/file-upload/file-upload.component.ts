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
  downloadUrl: string | null = null;
  isLoading = false;
  selectedModel="base";
  textAreaContent = ""

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
    formData.append('file', this.selectedFile);

    this.transcribeService.transcribeAudio(this.selectedFile).subscribe({
      next: (response) => {
        console.log(response);
        const transcribedText = response.transcribed_text;
        const blob = new Blob([transcribedText], { type: 'text/plain' });
        const originalFileName = this.selectedFile?.name;
        const fileNameWithoutExtension = originalFileName?.substring(0, originalFileName.lastIndexOf('.')) || originalFileName;
        const newFileName = `${fileNameWithoutExtension}.txt`;
        this.downloadBlob(blob, newFileName);
        this.message = 'File transcribed successfully and downloaded.';
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.message = 'Transcription failed';
      }
    });
  }

  onModelChange(event:any):void{
    const selectedModel = event.target.value;
    this.isLoading = true; // Show loading indicator
    this.transcribeService.selectModel(selectedModel).subscribe({
      next: (response) => {this.message = response.message; this.isLoading = false;},
      error: (error) => {
        console.error(error);
        this.message = 'Failed to switch model';
      }
    });
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