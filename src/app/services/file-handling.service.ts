import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileHandlingService {

  constructor() { }

  readFileAsDataUrl(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        resolve(reader.result as string);
      };

      reader.onerror = () => {
        reject(new Error('Error reading the file.'));
      };

      if (file) {
        reader.readAsDataURL(file);
      } else {
        reject(new Error('No file provided.'));
      }
    });
  }
}
