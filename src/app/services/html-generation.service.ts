import { Injectable } from '@angular/core';
import { AnimationService } from './animation.service';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class HtmlGenerationService {
  constructor(private animationService: AnimationService) {}

  generateHtmlContent(formData: FormGroup, imageDataUrl: string): string {
    const animationType = formData.get('animation')?.value;
    const imageSize = formData.get('imageSize')?.value || 'auto';
    const containerWidth = formData.get('containerWidth')?.value || 'auto';
    const containerHeight = formData.get('containerHeight')?.value || 'auto';
    const imagePositionX = formData.get('imagePositionX')?.value || '0';
    const imagePositionY = formData.get('imagePositionY')?.value || '0';
    const useImageContainer = formData.get('useImageContainer')?.value;
    const animationStyle = this.getAnimationStyle(animationType);
    const keyframes = this.getKeyframes(animationType);

    const containerStyles = useImageContainer
      ? `
        width: ${containerWidth}px;
        height: ${containerHeight}px;
        position: relative;
        overflow: hidden;
      `
      : '';

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Generated HTML</title>
        <style>
          body {
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color: #f0f0f0;
          }

          .image-container {
           ${containerStyles}
          }

          img {
            width: ${imageSize}px;
            height: ${imageSize}px;
            position: absolute;
            top: ${imagePositionY}px;
            left: ${imagePositionX}px;
            ${animationStyle}
          }
          ${keyframes}
        </style>
      </head>
      <body>
      ${useImageContainer ? '<div class="image-container">' : ''}
        <img src="${imageDataUrl}" alt="Generated Image">
        ${useImageContainer ? '</div>' : ''}
      </body>
      </html>
    `;

    return htmlContent;
  }

  getAnimationStyle(animationType: string): string {
    return this.animationService.getAnimationStyle(animationType);
  }

  getKeyframes(animationType: string): string {
    return this.animationService.getKeyframes(animationType);
  }
}
