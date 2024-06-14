import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PhotoService } from './photo.service';

describe('PhotoService', () => {
  let service: PhotoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PhotoService]
    });
    service = TestBed.inject(PhotoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch photos from API', () => {
    const mockPhotos = [
      { albumId: 1, id: 1, title: 'test', url: 'testUrl', thumbnailUrl: 'testThumbnailUrl' }
    ];
    const page = 1;
    const pageSize = 10;

    service.getPhotos(page, pageSize).subscribe(photos => {
      expect(photos.length).toBe(1);
      expect(photos).toEqual(mockPhotos);
    });

    const req = httpMock.expectOne(req => req.url === 'https://jsonplaceholder.typicode.com/photos' && 
      req.params.get('start') === '0' && // Check start parameter
      req.params.get('limit') === '10'); // Check limit parameter

    expect(req.request.method).toBe('GET');
    req.flush(mockPhotos);
  });
});

