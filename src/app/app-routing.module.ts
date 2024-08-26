import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TextTranslationComponent } from './pages/text-translation/text-translation.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  // { path: 'live-transcription', component: RealtimeAudioTranscriptionComponent },
  { path: 'text-translation', component: TextTranslationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
