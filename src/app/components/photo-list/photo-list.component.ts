import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { NgFor } from '@angular/common'; // Import NgFor directive
import { PhotoService } from '../../services/photo.service';
import { Photo } from '../../photo.model';

@Component({
  standalone: true,
  selector: 'app-photo-list',
  imports: [CommonModule, NgFor],
  template: `
    <div class="container">
      <h1>Photo Gallery</h1>
      <div class="photo-grid">
        <div *ngFor="let photo of photos" class="photo-item">
          <img [src]="photo.thumbnailUrl" [alt]="photo.title">
          <p class="photo-title">{{ photo.title }}</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container {
      max-width: 960px;
      margin: 20px auto;
      padding: 0 20px;
    }

    h1 {
      text-align: center;
      margin-bottom: 20px;
    }

    .photo-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      grid-gap: 20px;
    }

    .photo-item {
      border: 1px solid #ddd;
      padding: 10px;
      border-radius: 5px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      transition: transform 0.2s, box-shadow 0.2s; /* Add transitions */
    }

    .photo-item:hover {
      transform: scale(1.05);       /* Zoom on hover */
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Increased shadow */
    }

    img {
      width: 100%;
      height: 200px;
      object-fit: cover;
      border-radius: 5px;
    }

    .photo-title {
      margin-top: 10px;
      font-size: 14px;
      opacity: 0.7;          /* Initial opacity */
      transition: opacity 0.2s; /* Add transition for opacity */
    }

    .photo-item:hover .photo-title {
      opacity: 1;            /* Full opacity on hover */
    }

    .loading-indicator {
      text-align: center;
      margin-top: 20px;
    }
  `]
})

export class PhotoListComponent implements OnInit {
  photos: Photo[] = [];
  currentPage = 1;
  pageSize = 20; 
  loading = false;

  constructor(private photoService: PhotoService) {}

  ngOnInit(): void {
   this.loadPhotos();
  }

  loadPhotos() {
    this.loading = true;
    this.photoService.getPhotos(this.currentPage, this.pageSize)
      .subscribe(photos => {
        this.photos = this.photos.concat(photos); 
        this.loading = false;
      });
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && !this.loading) {
      this.currentPage++;
      this.loadPhotos();
    }
  }
}

