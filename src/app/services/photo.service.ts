import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Photo } from '../photo.model';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/photos';

  constructor(private http: HttpClient) {}

  getPhotos(page: number, pageSize: number): Observable<Photo[]> {
    const params = new HttpParams()
      .set('start', (page - 1) * pageSize)
      .set('limit', pageSize);
    return this.http.get<Photo[]>(this.apiUrl, { params });
  }
}
