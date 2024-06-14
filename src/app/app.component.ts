import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoListComponent } from './components/photo-list/photo-list.component';
import { PhotoService } from './services/photo.service';

@Component({
  standalone: true,
  selector: 'app-root', 
  template: `<app-photo-list></app-photo-list>`,
  imports: [CommonModule, PhotoListComponent],
  providers: [PhotoService],
})
export class AppComponent {
  constructor() {}
}
