import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranscribeService } from '../services/transcribe.service';
import { saveAs } from 'file-saver';
import { PDFDocument, rgb } from 'pdf-lib';
import { BlobWriter, TextReader, ZipWriter } from '@zip.js/zip.js';
import JSZip from 'jszip';

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
  selectedFormat = 'txt';
  transcribedText = '';
  password = 'yourpassword'; // Define your password here

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
      next: (response) => { this.message = response.message; this.isLoading = false; },
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

  async downloadTranscribedText() {
      this.isLoading = true;
      const body = { transcribedText:this.transcribedText};
      // Replace 'your-audio-file.mp3' with the actual file
      this.http.post('http://localhost:8080/api/download', body, {
        responseType: 'blob', // Important for file downloads
      }).subscribe((response: Blob) => {
        saveAs(response, 'protected_transcript.zip');
        this.isLoading = false;
      }, error => {
        console.error('Error downloading file', error);
      });
  }

  async generatePasswordProtectedZip(text: string, mimeType: string, password: string): Promise<Blob> {
    const writer = new BlobWriter("application/zip");
    const zipWriter = new ZipWriter(writer, { password });
    const fileName = this.selectedFile?.name || 'document.txt';

    await zipWriter.add(fileName, new TextReader(text));
    await zipWriter.close();
    return writer.getData();
  }

  async generatePasswordProtectedPdf(text: string, password: string): Promise<Blob> {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 400]);
    page.drawText(text, {
      x: 50,
      y: 350,
      size: 30,
      color: rgb(0, 0, 0),
    });

    const pdfBytes = await pdfDoc.save();
    const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });

    return pdfBlob;
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

  async createZip(fileName: string, content: string): Promise<Blob> {
    const zip = new JSZip();
    
    // Add the text file to the zip
    zip.file(fileName, content);
    
    // Generate the zip as a Blob
    const zipBlob = await zip.generateAsync({ type: 'blob', compression: 'DEFLATE' });
    
    return zipBlob;
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