import { Component, Input } from '@angular/core';
import { Photo } from '../../photo.model';

@Component({
  selector: 'app-photo-item',
  templateUrl: './photo-item.component.html',
  styleUrls: ['./photo-item.component.css']
})
export class PhotoItemComponent {
  @Input() photo!: Photo; 
}