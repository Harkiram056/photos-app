import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PhotoService } from './services/photo.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let photoService: PhotoService; 

  beforeEach(() => {
    const mockPhotoService = {
      getPhotos: () => of([
        { albumId: 1, id: 1, title: 'test', url: 'testUrl', thumbnailUrl: 'testThumbnailUrl' }
      ]) 
    };
    TestBed.configureTestingModule({
      imports: [AppComponent, HttpClientTestingModule], 
      providers: [
        { provide: PhotoService, useValue: mockPhotoService }
      ]
    });
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    photoService = TestBed.inject(PhotoService);
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have a PhotoListComponent', () => {
    const photoListComponent = fixture.debugElement.nativeElement.querySelector('app-photo-list');
    expect(photoListComponent).toBeTruthy();
  });
});
