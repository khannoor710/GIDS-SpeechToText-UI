import { Component } from '@angular/core';
import { TextTranslateService } from '../../services/text-translate.service';

@Component({
  selector: 'app-text-translation',
  templateUrl: './text-translation.component.html',
  styleUrl: './text-translation.component.css'
})
export class TextTranslationComponent {
  translatedText = '';
  selectedFiles: File[] = [];

  constructor(private translateService: TextTranslateService) {}

  onFileSelected(event: any): void {
    const files: FileList = event.target.files;
    if (files.length > 0) {
      this.selectedFiles = Array.from(files);
    }
  }

  translateFile(): void {
    if (this.selectedFiles.length > 0) {
      const file = this.selectedFiles[0];
      const targetLanguage = 'en';

      this.translateService.translateText(file, targetLanguage).subscribe(
        response => {
          this.translatedText = response.translatedText;
        },
        error => {
          console.error('Error translating file:', error);
          alert('An error occurred while translating the file.');
        }
      );
    } else {
      alert('Please select a file first.');
    }
  }

  translateText(text: string): void {
    // Implement your translation logic here
    this.translatedText = `Translated: ${text}`;
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
