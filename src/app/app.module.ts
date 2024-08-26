import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Corrected import statement

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { BlurProgressComponent } from './shared/blur-progress/blur-progress.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SpeechButtonComponent } from './speech-button/speech-button.component';
import { AudioRecorderComponent } from './audio-recorder/audio-recorder.component';
import { TranscribeTextDisplayComponent } from './shared/transcribe-text-display/transcribe-text-display.component';
import { HomeComponent } from './pages/home/home.component';
import { TextTranslationComponent } from './pages/text-translation/text-translation.component';

@NgModule({
  declarations: [
    AppComponent,
    FileUploadComponent,
    HeaderComponent,
    FooterComponent,
    BlurProgressComponent,
    SpeechButtonComponent,
    AudioRecorderComponent,
    TranscribeTextDisplayComponent,
    HomeComponent,
    TextTranslationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, // Updated import statement
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    MatProgressBarModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
