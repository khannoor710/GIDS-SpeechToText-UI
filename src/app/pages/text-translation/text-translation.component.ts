import { Component } from '@angular/core';
import { TextTranslateService } from '../../services/text-translate.service';

@Component({
  selector: 'app-text-translation',
  templateUrl: './text-translation.component.html',
  styleUrl: './text-translation.component.css'
})
export class TextTranslationComponent {
  selectedFiles: File[] | null = [];
  isLoading: boolean = false;
  downloadLink: string | null = null;
  errorMessage: string = '';

  constructor(private translateService: TextTranslateService) {}

  onFileSelected(event: any): void {
    const files: FileList = event.target.files;
    if (files.length > 0) {
      this.selectedFiles = Array.from(files);
    }
  }

 // Method to upload and translate PDF
 translateFile(): void {
  if (this.selectedFiles) {
    this.isLoading = true;
    let fileName = this.selectedFiles[0]!.name;
    this.translateService.uploadPdf(this.selectedFiles[0]).subscribe(
      (blob: Blob | null) => {
        this.isLoading = false;
        if (blob) {
          this.downloadFile(blob, fileName); 
        }
      },
      error => {
        this.isLoading = false;
        this.errorMessage = 'An error occurred during the translation.';
        console.error('Upload error:', error);
      }
    );
  } else {
    this.errorMessage = 'Please select a file before uploading.';
  }
}
  // Method to automatically trigger download of the translated PDF with modified file name
  private downloadFile(blob: Blob, originalFileName: string): void {
    const link = document.createElement('a');
    const url = window.URL.createObjectURL(blob);

    // Extract the original file name without extension and append "_english"
    const fileNameWithoutExt = originalFileName.substring(0, originalFileName.lastIndexOf('.'));
    const newFileName = `${fileNameWithoutExt}_english.pdf`;  // Append "_english" and retain ".pdf" extension

    link.href = url;
    link.download = newFileName;  // Set the dynamically generated file name
    link.click();  // Automatically trigger the download

    // Clean up after download
    setTimeout(() => {
      window.URL.revokeObjectURL(url);
    }, 100);
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
      this.selectedFiles = Array.from(event.dataTransfer.files);
    }
  }
}
