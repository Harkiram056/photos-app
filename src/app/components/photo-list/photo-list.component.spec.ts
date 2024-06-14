import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PhotoListComponent } from './photo-list.component';
import { of } from 'rxjs';
import { PhotoService } from '../../services/photo.service';
import { Photo } from '../../photo.model';

describe('PhotoListComponent', () => {
  let component: PhotoListComponent;
  let fixture: ComponentFixture<PhotoListComponent>;
  let photoService: PhotoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PhotoListComponent], 
      providers: [
        { 
          provide: PhotoService, 
          useValue: {
            getPhotos: () => of([
              { albumId: 1, id: 1, title: 'test', url: 'testUrl', thumbnailUrl: 'testThumbnailUrl' } as Photo
            ])
          }
        }
      ]
    });
    fixture = TestBed.createComponent(PhotoListComponent);
    component = fixture.componentInstance;
    photoService = TestBed.inject(PhotoService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

