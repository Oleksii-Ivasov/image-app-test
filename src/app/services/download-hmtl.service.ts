import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DownloadHmtlService {

  constructor() { }

  downloadHtmlFile(content: string, fileName: string) {
    const blob = new Blob([content], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
  }
}
