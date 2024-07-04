import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-blur-progress',
  templateUrl: './blur-progress.component.html',
  styleUrl: './blur-progress.component.css'
})
export class BlurProgressComponent {
  @Input() isLoading: boolean = false;
}
