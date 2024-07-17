
// app.component.ts

import { Component, OnDestroy, OnInit } from '@angular/core';
import { MicrophoneService } from './microphone.service';
import { ApiService } from './api.service';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy{
  private audioDataSubscription!: Subscription;

  constructor(private microphoneService: MicrophoneService, private apiService: ApiService) {}

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
    
  }
}
