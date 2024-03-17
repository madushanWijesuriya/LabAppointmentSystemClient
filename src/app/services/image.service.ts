import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(private http: HttpClient) {}

  saveImage(imageUrl: string): void {
    this.http.get(imageUrl, { responseType: 'blob' }).subscribe((blob) => {
      const a = document.createElement('a');
      const objectUrl = URL.createObjectURL(blob);
      a.href = objectUrl;
      a.download = 'image.jpg';
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(objectUrl);
      document.body.removeChild(a);
    });
  }
}
