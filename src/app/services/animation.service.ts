import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {

  constructor() { }

  getAnimationStyle(animationType: string): string {
    switch (animationType) {
      case 'slide-in-from-top':
        return 'animation: slideInFromTop 1s ease-in-out';
      case 'zoom-in-from-bottom':
        return 'animation: zoomInFromBottom 1s ease-in-out';
      default:
        return '';
    }
  }

   getKeyframes(animationType: string): string {
    switch (animationType) {
      case 'slide-in-from-top':
        return `
          @keyframes slideInFromTop {
            0% {
              transform: translateY(-100%);
            }
            100% {
              transform: translateY(0);
            }
          }
        `;
      case 'zoom-in-from-bottom':
        return `
          @keyframes zoomInFromBottom {
            0% {
              transform: scale(0.5) translateY(100%);
            }
            100% {
              transform: scale(1) translateY(0);
            }
          }
        `;
      default:
        return '';
    }
  }
}
